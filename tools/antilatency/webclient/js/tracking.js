/* UI + Verarbeitung der Tracking-Daten
############################################################################ */

export function startTracking({ THREE, scene, listEl, statusEl,
  seasonImageLeftEl, seasonImageRightEl,
  mapping, getImageForPosition }) {
  const trackers = {};
  let latestTimestamp = null;
  const splitEl = document.getElementById('split');
  const metaBarEl = document.getElementById('meta-bar');

  const metaDateLeftEl = document.getElementById('meta-date-left');
  const metaTimeLeftEl = document.getElementById('meta-time-left');
  const metaDateRightEl = document.getElementById('meta-date-right');
  const metaTimeRightEl = document.getElementById('meta-time-right');

  let lastImageLeft = null;
  let lastImageRight = null;

  let leftCamId = null;
  let rightCamId = null;


  const camLastSeen = {};

  function updateLayout() {
    const now = Date.now();
    // inaktive cams aus camLastSeen entfernen
    for (const [id, t] of Object.entries(camLastSeen)) {
      if (now - t > 1500) delete camLastSeen[id];
    }

    const activeCams = Object.entries(camLastSeen)
      .filter(([, t]) => now - t < 1500)
      .map(([id]) => id);

    const isSplit = activeCams.length >= 2;

    if (!isSplit) {
      splitEl.classList.add('single');
      metaBarEl.classList.add('single');
      const rightCol = document.querySelector('.meta-col.right');
      if (rightCol) rightCol.classList.remove('inactive');


      const only = activeCams[0] ?? leftCamId ?? rightCamId;
      if (only) leftCamId = only;
      rightCamId = null;
    } else {
      splitEl.classList.remove('single');
      metaBarEl.classList.remove('single');

      if (!leftCamId) leftCamId = activeCams[0];
      if (!rightCamId) rightCamId = activeCams.find(id => id !== leftCamId) ?? activeCams[1];
    }
  }

  function updateMetaVisibility(img, side) {
    const isSingle = splitEl.classList.contains('single');
    const leftCol = document.querySelector('.meta-col.left');
    const rightCol = document.querySelector('.meta-col.right');

    if (isSingle) {
      metaBarEl.style.display = (img === mapping.title) ? 'none' : '';

      leftCol?.classList.remove('inactive');
      rightCol?.classList.remove('inactive');
      return;
    }

    metaBarEl.style.display = '';

    if (side === 'left') leftCol?.classList.toggle('inactive', img === mapping.title);
    if (side === 'right') rightCol?.classList.toggle('inactive', img === mapping.title);
  }


  function setMetaFromImageUrl(url, side) {
    const m = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\.jpg$/);
    if (!m) return;

    const yyyy = m[1];
    const mm = m[2];
    const hh = m[3];

    const dateText = `01.${mm}.${yyyy}`;
    const timeText = `${hh}:00`;

    if (side === 'left') {
      metaDateLeftEl.textContent = dateText;
      metaTimeLeftEl.textContent = timeText;
    } else {
      metaDateRightEl.textContent = dateText;
      metaTimeRightEl.textContent = timeText;
    }
  }


  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs((hash * 137.5) % 360) / 360;
    return new THREE.Color().setHSL(h, 0.75, 0.5);
  }

  function createTrackerMesh(idString) {
    const group = new THREE.Group();
    const color = stringToColor(idString);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.03, 0.1),
      new THREE.MeshStandardMaterial({ color: color })
    );
    group.add(box);

    const nose = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.02, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    nose.position.z = -0.06;
    group.add(nose);

    scene.add(group);
    return { mesh: group, color: color.getHexString() };
  }

  const socket = io();
  socket.on('connect', () => {
    statusEl.innerText = "Connected";
    statusEl.style.color = "#00ff00";
  });

  socket.on('disconnect', () => {
    statusEl.innerText = "Disconnected";
    statusEl.style.color = "#ff0000";
  });

  socket.on('tracking_data', (msg) => {
    try {
      const data = JSON.parse(msg);
      const id = data.id;

      camLastSeen[id] = Date.now();

      if (leftCamId === null) leftCamId = id;
      else if (rightCamId === null && id !== leftCamId) rightCamId = id;

      updateLayout();

      const side = (id === leftCamId) ? 'left' : (id === rightCamId ? 'right' : null);



      if (!trackers[id]) {
        console.log(`New tracker found: ${id}`);
        const { mesh, color } = createTrackerMesh(id);

        trackers[id] = {
          mesh,
          color,
          lastSeen: Date.now()
        };

        const div = document.createElement('div');
        div.id = `ui-${id}`;
        div.className = 'tracker-row';
        div.style.borderColor = '#' + color;
        div.innerText = `Node ${id}`;
        listEl.appendChild(div);
      }

      const t = trackers[id];
      t.lastSeen = Date.now();

      t.mesh.position.set(
        data.pose.position.x,
        data.pose.position.y,
        data.pose.position.z
      );

      const ui = document.getElementById(`ui-${id}`);
      if (ui) {
        ui.innerText = `Node ${id}: [${data.pose.position.x.toFixed(2)}, ${data.pose.position.z.toFixed(2)}, ${data.pose.position.y.toFixed(2)}]`;
      }

      const x = data.pose.position.x;
      const y = data.pose.position.z;
      const z = data.pose.position.y;

      const img = getImageForPosition(mapping, x, y, z);
      if (!img || !side) return;

      if (side === 'left') {
        // updateMetaVisibility IMMER, auch wenn Bild gleich bleibt
        updateMetaVisibility(img, 'left');

        if (img !== lastImageLeft) {
          seasonImageLeftEl.src = img;
          seasonImageLeftEl.classList.toggle('is-title', img === mapping.title);

          if (img !== mapping.title) {
            setMetaFromImageUrl(img, 'left');
          }

          lastImageLeft = img;
        }
      }
      else if (side === 'right') {
        updateMetaVisibility(img, 'right');

        if (img !== lastImageRight) {
          seasonImageRightEl.src = img;
          seasonImageRightEl.classList.toggle('is-title', img === mapping.title);

          if (img !== mapping.title) {
            setMetaFromImageUrl(img, 'right');
          }

          lastImageRight = img;
        }
      }


      if (data.timestamp) {
        latestTimestamp = data.timestamp;
      }

    } catch (e) {
      console.error("Parse Error", e);
    }
  });


  setInterval(() => {
    const now = Date.now();
    for (const [id, t] of Object.entries(trackers)) {
      if (now - t.lastSeen > 1500) {
        scene.remove(t.mesh);
        const ui = document.getElementById(`ui-${id}`);
        if (ui) ui.remove();
        delete trackers[id];
        console.log(`Removed inactive tracker: ${id}`);
      }
    }
  }, 1000);

  setInterval(updateLayout, 250);

  function consumeLatestTimestamp() {
    const ts = latestTimestamp;
    latestTimestamp = null;
    return ts;
  }

  return { socket, trackers, getLatestTimestamp: consumeLatestTimestamp };

}

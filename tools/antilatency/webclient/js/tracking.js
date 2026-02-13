//nur Socket + Tracker + UI + Bildwechsel

export function startTracking({ THREE, scene, listEl, statusEl,
  seasonImageLeftEl, seasonImageRightEl,
  mapping, getImageForPosition }) {
  const trackers = {};
  const metaDateLeftEl = document.getElementById('meta-date-left');
  const metaTimeLeftEl = document.getElementById('meta-time-left');
  const metaDateRightEl = document.getElementById('meta-date-right');
  const metaTimeRightEl = document.getElementById('meta-time-right');


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

  const socket = io(); // connect to localhost:3000

  socket.on('connect', () => {
    statusEl.innerText = "Connected";
    statusEl.style.color = "#00ff00";
  });

  socket.on('disconnect', () => {
    statusEl.innerText = "Disconnected";
    statusEl.style.color = "#ff0000";
  });

  let lastImageLeft = null;
  let lastImageRight = null;

  // Zuordnung: welche cam steuert links/rechts
  let leftCamId = null;
  let rightCamId = null;


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



  socket.on('tracking_data', (msg) => {
    try {
      const data = JSON.parse(msg);
      const id = data.id;

      // Automatische Slot-Zuordnung (erste cam = links, zweite cam = rechts)
      if (leftCamId === null) leftCamId = id;
      else if (rightCamId === null && id !== leftCamId) rightCamId = id;

      // Nur zwei Kameras berücksichtigen
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

      t.mesh.quaternion.set(
        data.pose.rotation.x,
        data.pose.rotation.y,
        data.pose.rotation.z,
        data.pose.rotation.w
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
        if (img !== lastImageLeft) {
          seasonImageLeftEl.src = img;
          setMetaFromImageUrl(img, 'left');
          lastImageLeft = img;
        }
      } else if (side === 'right') {
        if (img !== lastImageRight) {
          seasonImageRightEl.src = img;
          setMetaFromImageUrl(img, 'right');
          lastImageRight = img;
        }
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

  return { socket, trackers };
}

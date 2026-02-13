//nur Socket + Tracker + UI + Bildwechsel

export function startTracking({ THREE, scene, listEl, statusEl, seasonImageEl, mapping, getImageForPosition }) {
  const trackers = {};

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

  let lastImage = null;

  socket.on('tracking_data', (msg) => {
    try {
      const data = JSON.parse(msg);
      const id = data.id;

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

      // Koordinaten-Mapping: x, z -> Fläche; y -> Höhe
      const x = data.pose.position.x;
      const y = data.pose.position.z;
      const z = data.pose.position.y;

      const img = getImageForPosition(mapping, x, y, z);
      if (img && img !== lastImage) {
        seasonImageEl.src = img;
        lastImage = img;
      }

    } catch (e) {
      console.error("Parse Error", e);
    }
  });

  // Inaktive Tracker entfernen
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

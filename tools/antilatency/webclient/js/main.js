//Orchestrierung

import { loadMapping } from './mapping.js';
import { getImageForPosition } from './interaction.js';
import { setupScene } from './threeScene.js';
import { startTracking } from './tracking.js';

const seasonImageLeftEl = document.getElementById('season-image-left');
const seasonImageRightEl = document.getElementById('season-image-right');
const listEl = document.getElementById('tracker-list');
const statusEl = document.getElementById('status');

// Mapping laden (top-level await)
const mapping = await loadMapping();

// Three.js Szene aufsetzen + Renderloop starten
const { THREE, scene, animate } = setupScene();
animate();

// Tracking starten
startTracking({
  THREE,
  scene,
  listEl,
  statusEl,
  seasonImageLeftEl,
  seasonImageRightEl,
  mapping,
  getImageForPosition
});


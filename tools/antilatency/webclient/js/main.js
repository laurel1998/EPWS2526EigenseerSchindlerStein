//Orchestrierung

import { loadMapping } from './mapping.js';
import { getImageForPosition } from './interaction.js';
import { setupScene } from './threeScene.js';
import { startTracking } from './tracking.js';

const seasonImageEl = document.getElementById('season-image');
const listEl = document.getElementById('tracker-list');
const statusEl = document.getElementById('status');

// Mapping laden (top-level await)
const mapping = await loadMapping();

// Three.js Szene aufsetzen + Renderloop starten
const { THREE, scene, animate } = setupScene(seasonImageEl);
animate();

// Tracking starten
startTracking({
  THREE,
  scene,
  listEl,
  statusEl,
  seasonImageEl,
  mapping,
  getImageForPosition
});

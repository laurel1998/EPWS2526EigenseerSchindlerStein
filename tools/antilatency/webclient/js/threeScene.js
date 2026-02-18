/* nur Rendering/Scene Setup
############################################################################ */

import * as THREE from 'three';

export function setupScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202020);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );
  camera.position.set(0, 3, 3);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); 

  // Canvas und Bild aus Galerie laden
  document.body.appendChild(renderer.domElement);
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.zIndex = "-1";
  renderer.domElement.style.pointerEvents = "none";


  scene.background = new THREE.Color(0x202020);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 5, 2);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  return { THREE, scene, camera, renderer, animate };
}

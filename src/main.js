import * as THREE from 'three'
import CameraControls from 'camera-controls';
import controller from './controller'
import { renderProportionalMap } from './functions/map';
import { addBackgroundSound } from './functions/sound';
import { boundaryLimits, WINDOW_HEIGHT, WINDOW_WIDTH } from './constants/three'

let scene, camera, renderer, listener, clock, plane
/** @type {CameraControls} */
let controls;

document.addEventListener('DOMContentLoaded', () => {
  init()
  animate()
})

function init() {
  CameraControls.install( { THREE: THREE } );

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -90, 593)

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  plane = renderProportionalMap(scene)

  // addBackgroundSound(camera, { path: 'sounds/rain.mp3', loop: true, volume: .09 });
  document.querySelector("#app")?.appendChild(renderer.domElement)

  controls = new CameraControls(camera, renderer.domElement);
  controls.dollyToCursor = true;
  controls.dollySpeed = .2
  controls.azimuthRotateSpeed = 0
  controls.polarRotateSpeed = 0
  controls.draggingDampingFactor = 0.1
  controls.maxDistance = 600
  controls.minDistance = 200
  controls.setBoundary(boundaryLimits)
  controls.boundaryFriction = 0
}

function animate() {
  const delta = clock.getDelta();
	const elapsed = clock.getElapsedTime();
	const updated = controls.update(delta);

	window.requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.getTarget( plane.position );
};

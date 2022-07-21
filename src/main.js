// @ts-check
import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants/three'
import controller from './controller'

let scene, camera, renderer, listener
/** @type {MapControls} */
let controls;

document.addEventListener('DOMContentLoaded', () => {
  init()
  animate()
})

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x7C6A56)
  listener = new THREE.AudioListener()
  camera = new THREE.PerspectiveCamera(
    86,
    WINDOW_WIDTH / WINDOW_HEIGHT,
    1,
    1000
  )
  listener = new THREE.AudioListener();
  camera = new THREE.PerspectiveCamera(79, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 1000);
  camera.add(listener)
  camera.position.set(0, 0, 6)

  const texture = new THREE.TextureLoader().load('./textures/map4.jpg');

  const geometry = new THREE.BoxGeometry(19, 9, 0);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)
  document.querySelector("#app")?.appendChild(renderer.domElement)

  controls = controller(geometry, camera, renderer, 1)
  addSound(listener, { path: 'sounds/rain.mp3', loop: true, volume: 0.08 })
}

function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
}

function addSound(listener, { path, loop, volume }) {
  const sound = new THREE.Audio( listener );
  //const sound = new THREE.PositionalAudio( listener );

  const audioLoader = new THREE.AudioLoader();
  
  audioLoader.load(path, function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(loop);
    sound.setVolume(volume);
    sound.play();
  });
}

function setMapControls(geometry) {
  const controlState = {
    positionX: 0,
    positionY: 0,
    phi: 0,
    theta: 0,
  }
  const { positionX, positionY, phi, theta } = controlState

  controls = new MapControls(camera, renderer.domElement);

  controls.screenSpacePanning = true;
  controls.minDistance = 1;
  controls.maxDistance = 4;
  controls.enableRotate = false
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2;
  
  var box = new THREE.Box3();
  box.setFromObject(controls.object);

  const minPan = new THREE.Vector3(-2, -2, -2);
  const maxPan = new THREE.Vector3(2, 2, 2);
  const _v = new THREE.Vector3();
  
  controls.addEventListener('change', evt => {
    _v.copy(controls.target);
    controls.target.clamp(minPan, maxPan);
    _v.sub(controls.target);
    camera.position.sub(_v);
  })
}

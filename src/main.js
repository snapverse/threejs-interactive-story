import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js';
import CameraControls from 'camera-controls'
import MouseMeshInteraction from '@danielblagy/three-mmi'
import controller from './controller'
import { renderProportionalMap } from './functions/map'
import { addBGMusic } from './functions/sound'
import { addPointer } from './functions/points'
import { boundaryLimits, WINDOW_HEIGHT, WINDOW_WIDTH } from './constants/three'

let scene, camera, renderer, listener, clock, plane, mmi, mesh

/** @type {CameraControls} */
let controls

document.addEventListener('DOMContentLoaded', () => {
  init()
  animate()
})

function init() {
  CameraControls.install({ THREE: THREE })

  camera = new THREE.PerspectiveCamera(
    75,
    WINDOW_WIDTH / WINDOW_HEIGHT,
    0.1,
    1000
  )
  camera.position.set(0, -90, 593)

  clock = new THREE.Clock()
  scene = new THREE.Scene()
  mmi = new MouseMeshInteraction(scene, camera)
  renderer = new THREE.WebGLRenderer()
  controls = controller(camera, renderer)
  
  scene.background = new THREE.Color(0x7c6a56)  
  renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)
  
  plane = renderProportionalMap(scene)
  
  addPointer(scene, mmi, controls, 'pueblo',{ x: 50, y: 5, z: 10 })
  addPointer(scene, mmi, controls, 'bosque', { x: 200, y: 5, z: 10 })

  // addBGMusic(camera, { path: 'sounds/rain.mp3', loop: true, volume: .09 });
  document.querySelector('#app')?.appendChild(renderer.domElement)
}

function animate() {
  const delta = clock.getDelta()
  const elapsed = clock.getElapsedTime()
  const updated = controls.update(delta)

  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.getTarget(plane.position)
  mmi.update()
}

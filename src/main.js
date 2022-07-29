import CameraControls from 'camera-controls'
import MouseMeshInteraction from '@danielblagy/three-mmi'
import controller from './controller'
import { renderProportionalMap } from './functions/map'
import { addBackgroundSound } from './functions/sound'
import { boundaryLimits, WINDOW_HEIGHT, WINDOW_WIDTH } from './constants/three'
import { addPointsToMap } from './functions/points'
import * as TWEEN from '@tweenjs/tween.js';

let scene, camera, renderer, listener, clock, plane, mmi, mesh

/** @type {CameraControls} */
let controls

document.addEventListener('DOMContentLoaded', () => {
  init()
  animate()
})

async function init() {
  CameraControls.install({ THREE: THREE })

  clock = new THREE.Clock()
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x7c6a56)
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, -90, 593)

  mmi = new MouseMeshInteraction(scene, camera)
  await addPointsToMap(scene, mmi, 'pueblo', { x: 50, y: 5, z: 10 }, () => {
      document
      .querySelector('#app > x-story')
      .shadowRoot.querySelector('#text').classList.toggle("show")  
  })
  await addPointsToMap(scene, mmi, 'bosque', { x: 200, y: 5, z: 10 }, () => {
    console.log('hola1')
  })

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  plane = renderProportionalMap(scene)

  // addBackgroundSound(camera, { path: 'sounds/rain.mp3', loop: true, volume: .09 });
  document.querySelector('#app')?.appendChild(renderer.domElement)

  controls = new CameraControls(camera, renderer.domElement)
  controls.dollyToCursor = true
  controls.dollySpeed = 0.2
  controls.azimuthRotateSpeed = 0
  controls.polarRotateSpeed = 0
  controls.draggingDampingFactor = 0.1
  controls.maxDistance = 600
  controls.minDistance = 200
  controls.setBoundary(boundaryLimits)
  controls.boundaryFriction = 0
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

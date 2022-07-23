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
  camera.add(listener)
  camera.position.set(0, 0, 6)

  const texture = new THREE.TextureLoader().load('./textures/map.webp')

  const geometry = new THREE.BoxGeometry(17, 10, 0)
  const material = new THREE.MeshBasicMaterial({ map: texture })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

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
  const sound = new THREE.Audio(listener)

  const audioLoader = new THREE.AudioLoader()
  audioLoader.load(path, function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(loop)
    sound.setVolume(volume)
    sound.play()
  })
}

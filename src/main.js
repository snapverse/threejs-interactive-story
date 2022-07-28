import * as THREE from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants/three'
import MouseMeshInteraction from '@danielblagy/three-mmi'
import controller from './controller'
import { addPointsToMap } from './functions/points'
import * as TWEEN from '@tweenjs/tween.js';

let scene, camera, renderer, listener, mmi, mesh
/** @type {MapControls} */
let controls

document.addEventListener('DOMContentLoaded', () => {
  init()
  animate()
})

async function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x7c6a56)
  listener = new THREE.AudioListener()
  listener = new THREE.AudioListener()
  camera = new THREE.PerspectiveCamera(
    70,
    WINDOW_WIDTH / WINDOW_HEIGHT,
    0.1,
    1000
  )
  camera.add(listener)
  camera.position.set(0, -500, 5000)

  mmi = new MouseMeshInteraction(scene, camera)
  const pointer1 = await addPointsToMap(scene, mmi, 'pueblo', { x: 50, y: 5, z: 10 }, () => {
      document
      .querySelector('#app > x-story')
      .shadowRoot.querySelector('#text').classList.toggle("show")  
  })
  const pointer2 = await addPointsToMap(scene, mmi, 'bosque', { x: 200, y: 5, z: 10 }, () => {
    console.log('hola1')
  })

  /* const animate = (t) => {
    TWEEN.update(t);
    window.requestAnimationFrame(animate);
  };
  animate();
  
    const tween = new TWEEN.Tween({ x: 0, y: 0, xRotation: 0 })
       .to({ x: 20, y: 20, xRotation: Math.PI / 2 }, 2000)
       .onUpdate((coords) => {
        pointer1.position.y = coords.y;
       })
       .easing(TWEEN.Easing.Exponential.InOut)
       .repeat(Infinity)
       .delay(500);
     tween.start(); */

  const getImageRatioPlane = async () => {
    const texture = await new THREE.TextureLoader().loadAsync(
      './textures/map4.jpg'
    )
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const geometry = new THREE.PlaneGeometry(
      texture.image.width,
      texture.image.height
    )
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    return geometry
  }

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer();

  }
  //addSound(listener, { path: 'sounds/rain.mp3', loop: true, volume: 0.09 })
  setMapControls(getImageRatioPlane())
  document.querySelector('#app')?.appendChild(renderer.domElement)
}

function animate() {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
  mmi.update()
}

function addSound(listener, { path, loop, volume }) {
  const sound = new THREE.Audio(listener)
  //const sound = new THREE.PositionalAudio( listener );

  const audioLoader = new THREE.AudioLoader()

  audioLoader.load(path, function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(loop)
    sound.setVolume(volume)
    sound.play()
  })
}

function setMapControls(geometry) {
  const controlState = {
    positionX: 0,
    positionY: 0,
    phi: 0,
    theta: 0
  }
  const { positionX, positionY, phi, theta } = controlState

  controls = new MapControls(camera, renderer.domElement)

  controls.screenSpacePanning = true
  controls.minDistance = 1
  controls.maxDistance = 600
  controls.enableRotate = false
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  //controls.maxPolarAngle = Math.PI / 2;

  var box = new THREE.Box3()
  box.setFromObject(controls.object)

  const minPan = new THREE.Vector3(-200, -140, 0)
  const maxPan = new THREE.Vector3(200, 85, 0)
  const _v = new THREE.Vector3(2000, 2000, 1000)

  controls.addEventListener('change', (evt) => {
    _v.copy(controls.target)
    controls.target.clamp(minPan, maxPan)
    _v.sub(controls.target)
    camera.position.sub(_v)
    //console.log(controls.object.position)
  })
}

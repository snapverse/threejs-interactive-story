import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js';
import CameraControls from 'camera-controls'
import MouseMeshInteraction from '@danielblagy/three-mmi'
import controller from './controller'
import { renderProportionalMap } from './functions/map'
import { addBGMusic, soundsCircle } from './functions/sound'
import { addPointer} from './functions/points'
import { boundaryLimits } from './constants/three'
import { getElementFromShadow } from './helpers/getElementFromShadow';

let WINDOW_WIDTH = window.innerWidth
let WINDOW_HEIGHT = window.innerHeight

/** @type {THREE.Scene} */
let scene, camera, renderer, listener, clock, plane, mmi, mesh
/** @type {CameraControls} */
let controls

let counter = 0;

document.addEventListener('DOMContentLoaded', () => {
  init()
  animate()
  particlesJS.load('particles', './js/particlesjs-config.json')
  window.addEventListener('resize', handleWindowResize, false)
})

async function init() {
  CameraControls.install({ THREE: THREE })

  camera = new THREE.PerspectiveCamera(
    75,
    WINDOW_WIDTH / WINDOW_HEIGHT,
    1,
    1000
  )
  camera.position.set(0, -90, 593)

  clock = new THREE.Clock()
  scene = new THREE.Scene()
  mmi = new MouseMeshInteraction(scene, camera)
  renderer = new THREE.WebGLRenderer()
    
  scene.background = new THREE.Color(0x7c6a56)
  renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)
  
  plane = renderProportionalMap(scene)

  setTimeout(() => {
    const listener = new THREE.AudioListener();
    camera.add( listener );

    const sound = new THREE.Audio( listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/sonidointro.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.2 );
    sound.play();
    });  
  }, 0);

  setTimeout(() => {
     soundsCircle(camera,scene,{ path: 'sounds/tala.mp3',  loop: true, volume:300  ,distance:0.005, one: 360, two: 120, three: 0.1,play:0},-400,120,-5, 300,150,0);
     soundsCircle(camera,scene,{ path: 'sounds/tala2.mp3', loop: true, volume:300 , distance:0.005, one: 360, two: 120, three: 0.1,play:1},-400,120,-5, 300,150,0);
     soundsCircle(camera,scene,{ path: 'sounds/tala2.mp3', loop: true, volume:300, distance:0.005, one: 360, two: 120, three: 0.1,play:5},-400,120,-5, 300,150,0);
     soundsCircle(camera,scene,{ path: 'sounds/tala2.mp3', loop: true, volume:300, distance:0.005, one: 360, two: 120, three: 0.1,play:10},-400,120,-5, 300,150,0);
     soundsCircle(camera,scene,{ path: 'sounds/tala3.mp3', loop: true, volume:300, distance:0.005, one: 360, two: 120, three: 0.1,play:8},-400,120,-5, 300,150,0);
     soundsCircle(camera,scene,{ path: 'sounds/tala4.mp3', loop: true, volume:300, distance:0.005, one: 360, two: 120, three: 0.1,play:12},-400,120,-5, 300,150,0);
  }, 120000);

  setTimeout(() => {
     soundsCircle(camera,scene,{ path: 'sounds/bosque.mp3',         loop: true, volume: 50 ,distance:0.1, one: 360, two: 220, three: 0.1,play:3}, 20,170,-5, 200,100,0);
     soundsCircle(camera,scene,{ path: 'sounds/bosque2.mp3',        loop: true, volume: 50 ,distance:0.1, one: 360, two: 220, three: 0.1,play:3}, 20,170,-5, 200,100,0);
    soundsCircle(camera,scene,{ path: 'sounds/bosque3.mp3',        loop: true, volume: 50 ,distance:0.1, one: 360, two: 220, three: 0.1,play:3}, 20,170,-5, 200,100,0);
     soundsCircle(camera,scene,{ path: 'sounds/sonidopajaroas.mp3', loop: true, volume: 50 ,distance:0.1, one: 360, two: 220, three: 0.1,play:3}, 20,170,-5, 200,100,0);
    soundsCircle(camera,scene,{ path: 'sounds/alrededores.mp3', loop: true, volume: 20 ,distance:0.1, one: 0, two: 360, three: 0.1}, 60,170,-5, 300,150,0);
  }, 110000);

  setTimeout(() => {
    soundsCircle(camera,scene,{ path: 'sounds/alrededores.mp3', loop: true, volume: 20 ,distance:0.1, one:360, two: 360, three: 0.1}, 300,300,0, 100,100,0);
  }, 950000);
  

  setTimeout(() => {
    soundsCircle(camera,scene,{ path: 'sounds/aldea.mp3', loop: true, volume: 35 ,distance:0.1, one: 360, two: 120, three: 0.1}, -10,-40,-5, 150,100,0);
    soundsCircle(camera,scene,{ path: 'sounds/fogata.mp3', loop: true, volume: 70 ,distance:0.3, one: 120, two: 70, three: 0.1}, -40,-20,-5, 10,5,0);
  }, 100000);

  setTimeout(() => {
    soundsCircle(camera,scene,{ path: 'sounds/mar.mp3', loop: true, volume: 25 ,distance:0.6, one: 0, two: 360, three: 0.4}, 700,-400,0, 10,5,0);
    soundsCircle(camera,scene,{ path: 'sounds/mar.mp3', loop: true, volume: 10 ,distance:0.3, one: 0, two: 360, three: 0.1}, -800,150,0, 10,5,0);
  }, 90000);

  setTimeout(() => {
    soundsCircle(camera,scene,{ path: 'sounds/viento.mp3', loop: true, volume: 12,distance:0.1, one: 360, two: 260, three: 0.6}, 0,10,700, 300,70,30);
  }, 85000);

  //addBackgroundSound(camera, { path: 'sounds/musiquita.mp3', loop: true, volume: .03 });
   
  setTimeout(() => {
  musicPlane(camera, { path: 'sounds/musiquita.mp3', loop: true, volume: 11 ,distance:1, one: 0, two: 360, three: 0.2}, 0,0,700);
  }, 1000);

  document.querySelector('#app')?.appendChild(renderer.domElement)

  controls = controller(camera, renderer)

  const { point: point1, pointer: pointer1 } = await addPointer(mmi, controls, 'opy', { x: 70, y: 3, z: 10, radius: 50 })
  const { point: point2, pointer: pointer2 } = await addPointer(mmi, controls, 'montaña', {  x: 175, y: 100, z: 10, zpointer:20, radius:70 })
  const { point: point3, pointer: pointer3 } = await addPointer(mmi, controls, 'opy', { x: 70, y: 3, z: 10, radius: 50 })
  const { point: point4, pointer: pointer4 } = await addPointer(mmi, controls, 'aldea', {  x: -20, y: -10, z: 10, radius:120})
  const { point: point5, pointer: pointer5 } = await addPointer(mmi, controls, 'selva', {  x: -2, y: 140, z: 10, zpointer:30, radius:150})
  const { point: point6, pointer: pointer6 } = await addPointer(mmi, controls, 'cerros', {  x: -130, y: -300, z: 10, radius:100})

  scene.add(point1, pointer1)
  getElementFromShadow('story', '#close-button-story').addEventListener('click', evt => {
    evt.preventDefault()
    evt.stopPropagation()
    counter += 1

    switch (counter) {
      case 1:
        scene.remove(point1, pointer1)
        scene.add(point2, pointer2)
        break;
      case 2:
        scene.remove(point2, pointer2)
        scene.add(point3, pointer3)
        break;
      case 3:
        scene.remove(point3, pointer3)
        scene.add(point4, pointer4)
        break;
      case 4:
        scene.remove(point4, pointer4)
        scene.add(point5, pointer5)
        break;
      case 5:
        scene.remove(point5, pointer5)
        scene.add(point6, pointer6)
        break;
      case 6:
        scene.remove(point6, pointer6)
        const music = document.createElement('audio')
        music.src = "/sounds/outro.mp3"
        music.volume = .2
        music.play()
        break;
    }
  })
}

function animate() {
  const delta = clock.getDelta()
  const elapsed = clock.getElapsedTime()
  const updated = controls.update(delta)

  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
  mmi.update()
}

const handleWindowResize = () => {
  WINDOW_WIDTH = window.innerWidth
  WINDOW_HEIGHT = window.innerHeight

  camera.aspect = WINDOW_WIDTH / WINDOW_HEIGHT
  camera.updateProjectionMatrix()

  renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT)
}

function musicPlane(camera, { path, loop, volume,distance,play = 0, one,two,three},transx = 0,transy= 0,transz= 0){
  const listener = new THREE.AudioListener()
  camera.add(listener)
  const sound = new THREE.PositionalAudio( listener );
  const audioLoader = new THREE.AudioLoader()
  audioLoader.load(path, function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(loop)
    sound.setVolume(volume)
    sound.setRefDistance (distance) 
    sound.setDirectionalCone( one, two,three );
    sound.play(play)
  })
  let whidth = 1700,height = 800
  const geometry = new THREE.PlaneGeometry( whidth, height);
  const material = new THREE.MeshBasicMaterial({ opacity:1 })
  material.transparent = true
  const circleSound = new THREE.Mesh(geometry, material)
  circleSound.add(sound)
  
  circleSound.translateX(transx)
  circleSound.translateY(transy)
  circleSound.translateZ(transz)
  scene.add(circleSound)
}

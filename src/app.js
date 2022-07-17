import * as THREE from './assets/three'

const initState = {
  WINDOW_HEIGHT: window.innerHeight,
  WINDOW_WIDTH: window.innerWidth
}

const { WINDOW_HEIGHT, WINDOW_WIDTH } = initState;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, .1, 1000)

const renderer = new THREE.WebGLRenderer(WINDOW_WIDTH, WINDOW_HEIGHT)
document.body.appendChild(renderer.domElement);

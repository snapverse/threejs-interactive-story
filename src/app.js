import * as THREE from 'three'

const initState = {
  WINDOW_HEIGHT: window.innerHeight,
  WINDOW_WIDTH: window.innerWidth
}

const { WINDOW_HEIGHT, WINDOW_WIDTH } = initState;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, .1, 1000)

const renderer = new THREE.WebGLRenderer(WINDOW_WIDTH, WINDOW_HEIGHT)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 5);
const material = new THREE.MeshBasicMaterial({ color: "#fff" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

animate();

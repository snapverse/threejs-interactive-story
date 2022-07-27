//@ts-check
import { Box3, Vector3 } from 'three'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'

const controlState = {
  positionX: 0,
  positionY: 0,
  phi: 0,
  theta: 0
}

/** @type {(geometry, camera, renderer, clamp) => MapControls} */
export default function controller(geometry, camera, renderer, clamp) {
  const { positionX, positionY, phi, theta } = controlState
  const controls = new MapControls(camera, renderer.domElement)

  controls.screenSpacePanning = true
  controls.minDistance = 2
  controls.maxDistance = 5.2
  controls.enableRotate = false
  controls.enableDamping = true
  controls.dampingFactor = 0.08

  controls.enableZoom = true
  controls.rotateSpeed = 1.0
  controls.zoomSpeed = 1.2
  controls.panSpeed = 0.8

  controls.maxPolarAngle = Math.PI / 2
  controls.enablePan = true

  const box = new Box3()
  box.setFromObject(controls.object)

  const minPan = new Vector3(-clamp, -clamp, -clamp)
  const maxPan = new Vector3(clamp, clamp, clamp)
  const _v = new Vector3()

  controls.addEventListener('change', (evt) => {
    _v.copy(controls.target)
    controls.target.clamp(minPan, maxPan)
    _v.sub(controls.target)
    camera.position.sub(_v)
  })

  return controls
}

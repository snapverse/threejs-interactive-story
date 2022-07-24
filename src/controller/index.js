//@ts-check
import { Box3, Vector3 } from 'three'
import CameraControls from 'camera-controls';

/** @type {(camera, renderer) => CameraControls} */
export default function controller (camera, renderer) {
  const controls = new CameraControls(camera, renderer.domElement);
  
  // controls.screenSpacePanning = true
  controls.minDistance = 200;
  controls.maxDistance = 600;
  // controls.enableRotate = false
  // controls.enableDamping = true
  controls.dampingFactor = 0.05

  // controls.enableZoom = true;
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.8;
  
  // controls.enablePan = true

  // const minPan = new Vector3(-200, -140, 0);
  // const maxPan = new Vector3(200, 85, 0);
  // const _v = new Vector3(2000,2000,1000);

  // controls.addEventListener('change', (evt) => {
  //   _v.copy(controls.target)
  //   controls.target.clamp(minPan, maxPan)
  //   _v.sub(controls.target)
  //   camera.position.sub(_v)
  // })

  return controls
}

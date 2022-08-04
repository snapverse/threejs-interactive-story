import CameraControls from "camera-controls";
import { Box3, Vector3 } from "three";
import { boundaryLimits } from "../constants/three";

const boundaryLimitsState = {
    left: -160,
    bottom: -100,
    rigth: 100,
    top: -5
}

let { left, bottom, rigth, top } = boundaryLimitsState

/** @type {(camera, renderer) => CameraControls} */
export default function controller(camera, renderer) { 
    const controls = new CameraControls(camera, renderer.domElement)

    // controls.dollyToCursor = true
    controls.dollySpeed = 0.2
    controls.azimuthRotateSpeed = 0
    controls.polarRotateSpeed = 0
    controls.draggingDampingFactor = 0.1
    controls.maxDistance = 600
    controls.minDistance = 200
    // controls.boundaryEnclosesCamera = true
    //controls.setBoundary(boundaryLimits)
    controls.boundaryFriction = 0

    // controls.addEventListener('update', evt => {
    //     evt.target.setBoundary(new Box3(
    //         new Vector3(left+=20, bottom+=20, 0),
    //         new Vector3(rigth+=20, top+=20, 0)
    //       ))
    // })

    return controls
}

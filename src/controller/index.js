import CameraControls from "camera-controls";
import { boundaryLimits } from "../constants/three";

/** @type {(camera, renderer) => CameraControls} */
export default function controller(camera, renderer) { 
    const controls = new CameraControls(camera, renderer.domElement)

    controls.dollyToCursor = true
    controls.dollySpeed = 0.2
    controls.azimuthRotateSpeed = 0
    controls.polarRotateSpeed = 0
    controls.draggingDampingFactor = 0.1
    controls.maxDistance = 600
    controls.minDistance = 200
    controls.setBoundary(boundaryLimits)
    controls.boundaryFriction = 0

    return controls
}

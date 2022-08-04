import { Box3, Vector3 } from "three";

export const WINDOW_WIDTH = window.innerWidth
export const WINDOW_HEIGHT = window.innerHeight

const boundaryLimitsState = {
  left: -160,
  bottom: -100,
  rigth: 100,
  top: -5
}

const { left, bottom, rigth, top } = boundaryLimitsState

export const boundaryLimits = new Box3(
  new Vector3(left, bottom, 0),
  new Vector3(rigth, top, 0)
);

import { Camera, CircleGeometry, MathUtils, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader, Clock, Scene } from 'three'
import * as TWEEN from '@tweenjs/tween.js';
import MouseMeshInteraction from '@danielblagy/three-mmi'
import CameraControls from 'camera-controls';
import { getElementFromShadow } from '../helpers/getElementFromShadow';

/** @type {(scene: Scene, mmi: MouseMeshInteraction, controls: CameraControls, name: string, { x, y, z }: { x: number, y: number, z: number }) => void} */
export function addPointer(scene, mmi, controls, name, { x, y, z }) {
  const pointer = async () => {
    const texture = await new TextureLoader().loadAsync('./textures/point.png')

    const material = new MeshBasicMaterial({ map: texture });
    const geometry = new PlaneGeometry(texture.image.width/4, texture.image.height/4);

    material.transparent = true 
    material.needsUpdate = true

    const pointer = new Mesh(geometry, material);
    pointer.translateX(x)
    pointer.translateY(y+40)
    pointer.translateZ(11)
    
    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);
    };
    animate();

    const tween1 = new TWEEN.Tween({ y: 60 })
      .to({y: 70}, 2000)
      .onUpdate((coords) => {
        pointer.position.y = coords.y;
      })
      .easing(TWEEN.Easing.Quadratic.In)
      .delay(0);
    const tween2 = new TWEEN.Tween({ y: 70 })
      .to({ x: 0, y: 60, xRotation: 0 }, 2000)
      .onUpdate((coords) => {
        pointer.position.y = coords.y;
      })
      .easing(TWEEN.Easing.Quadratic.In)
      .delay(0);
    tween1.chain(tween2);
    tween2.chain(tween1);
    tween1.start();

    scene.add(pointer);
  }

  const circleState = {
    segmentCount: 32,
    radius: 30
  } 

  const geometry = new CircleGeometry(circleState.radius, circleState.segmentCount)
  const material = new MeshBasicMaterial({ color: 0xffffff })
  const point = new Mesh(geometry, material)

  point.translateX(x)
  point.translateY(y)
  point.translateZ(z)

  point.name = name
  scene.add(point)

  mmi.addHandler(name, 'click', () => {
    controls.fitToBox(point, true, { paddingRight: 300 })
    document
      .querySelector('#app > x-story')
      .shadowRoot.querySelector('#text').classList.toggle("show")  
  })

  getElementFromShadow('story', '#text').addEventListener('click', () => controls.setLookAt(0, -90, 593, 0, 0, 0, true))

  pointer()
}

import { CircleGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader} from 'three'
import * as TWEEN from '@tweenjs/tween.js';
import MouseMeshInteraction from '@danielblagy/three-mmi'
import CameraControls from 'camera-controls';
import { getElementFromShadow } from '../helpers/getElementFromShadow';

/** @type {(mmi: MouseMeshInteraction, controls: CameraControls, name: string, { x, y, z, zpointer, radius}: { x: number, y: number, z: number, zpointer?: number, radius?: number }) => Promise<any>} */
export async function addPointer(mmi, controls, name, { x, y, z , zpointer = 11, radius=30}) {
  const pointer = async () => {
    const texture = await new TextureLoader().loadAsync('./textures/point1.png')

      const material = new MeshBasicMaterial({ map: texture });
      const geometry = new PlaneGeometry(texture.image.width/4, texture.image.height/4);
  
      material.transparent = true 
      material.needsUpdate = true
  
      const pointer = new Mesh(geometry, material);
      pointer.translateX(x)
      pointer.translateY(y+40)
      pointer.translateZ(zpointer)
      
      const animate = (t) => {
        TWEEN.update(t);
        window.requestAnimationFrame(animate);
      };
      animate();
  
      const tween1 = new TWEEN.Tween({ y: y+70 })
        .to({y: y+60}, 2000)
        .onUpdate((coords) => {
          pointer.position.y = coords.y;
        })
        .easing(TWEEN.Easing.Quadratic.In)
        .delay(0);
      const tween2 = new TWEEN.Tween({ y: y+60 })
        .to({ y: y+70 }, 2000)
        .onUpdate((coords) => {
          pointer.position.y = coords.y;
        })
        .easing(TWEEN.Easing.Quadratic.In)
        .delay(0);
      tween1.chain(tween2);
      tween2.chain(tween1);
      tween1.start();
  
      return pointer
  }

  const circleState = {
    segmentCount: 32,
    radius
  } 

  const geometry = new CircleGeometry(circleState.radius, circleState.segmentCount)
  const material = new MeshBasicMaterial({ opacity:0  })
  material.transparent = true
  const point = new Mesh(geometry, material)

  point.translateX(x)
  point.translateY(y)
  point.translateZ(z)

  point.name = name

  mmi.addHandler(name, 'click', () => {
    controls.fitToBox(point, true, { paddingRight: 200 })
    document
      .querySelector('#app > x-story')
      .shadowRoot.querySelector('#text').classList.toggle("show")  
  })

  getElementFromShadow('story', '#close-button-story').addEventListener('click', evt => {
    evt.preventDefault()
    evt.stopPropagation()
    controls.setLookAt(0, -90, 593, 0, 0, 0, true)
  })

  return {
    pointer: await pointer(),
    point
  }
}

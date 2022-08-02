import { Camera, CircleGeometry, MathUtils, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader, Clock, MeshLambertMaterial, SphereGeometry } from 'three'
import MouseMeshInteraction from '@danielblagy/three-mmi'
import * as TWEEN from '@tweenjs/tween.js';

export function addPointsToMap(scene, mmi, name, { x, y, z , zpointer = 11, radius=30}, callback) {
  let segmentCount = 32
  const geometry = new CircleGeometry(radius, segmentCount)
  const material = new MeshBasicMaterial({ opacity:0 })
  material.transparent = true
  const point = new Mesh(geometry, material)
  
  point.translateX(x)
  point.translateY(y)
  point.translateZ(z)

  point.name = name
  scene.add(point)

  mmi.addHandler(name, 'click', callback)

  const pointer = async () => {
    const texture = await new TextureLoader().loadAsync('./textures/point1.png');
    const material = new MeshBasicMaterial({ map: texture });
    material.transparent = true
    material.needsUpdate = true
    const geometry = new PlaneGeometry(texture.image.width/4, texture.image.height/4);

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

    scene.add(pointer);
  }

  pointer();
}

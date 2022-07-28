import MouseMeshInteraction from '@danielblagy/three-mmi'
import { Camera, CircleGeometry, MathUtils, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three'
import { Clock } from 'three'; 
import * as TWEEN from '@tweenjs/tween.js';

export function addPointsToMap(scene, mmi, name, { x, y, z }, callback) {
  let segmentCount = 32,
    radius = 30
  const geometry = new CircleGeometry(radius, segmentCount)
  const material = new MeshBasicMaterial({ color: 0xffffff })
  const point = new Mesh(geometry, material)

  point.translateX(x)
  point.translateY(y)
  point.translateZ(z)

  point.name = name
  scene.add(point)

  mmi.addHandler(name, 'click', callback)

  const Pointer = async () => {
    const texture = await new TextureLoader().loadAsync('./textures/point.png');
    const material = new MeshBasicMaterial({ map: texture });
    material.transparent = true
    material.needsUpdate = true
    const geometry = new PlaneGeometry(texture.image.width/4, texture.image.height/4);

    const pointer = new Mesh(geometry, material);
    pointer.translateX(x)
    pointer.translateY(y+40)
    pointer.translateZ(11)
    
    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);
    };
    animate();
    
      /* const tween = new TWEEN.Tween({ x: 0, y: 0, xRotation: 0 })
         .to({ x: 20, y: 20, xRotation: Math.PI / 2 }, 2000)
         .onUpdate((coords) => {
          pointer.position.y = coords.y;
         })
         .easing(TWEEN.Easing.Exponential.InOut)
         .repeat(Infinity)
         .delay(500);
       tween.start(); */





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

    return pointer;
  }

  return Pointer();


}

import MouseMeshInteraction from '@danielblagy/three-mmi'
import { CircleGeometry, Mesh, MeshBasicMaterial } from 'three'

export function addPointsToMap(scene, mmi, { x, y, z }) {
  let segmentCount = 32,
    radius = 30
  const geometry = new CircleGeometry(radius, segmentCount)
  const material = new MeshBasicMaterial({ color: 0xffffff })
  const point = new Mesh(geometry, material)

  point.translateX(x)
  point.translateY(y)
  point.translateZ(z)

  point.name = 'point'
  scene.add(point)

  mmi.addHandler('point', 'click', function (Mesh) {
    console.log('jfbj')
  })
}

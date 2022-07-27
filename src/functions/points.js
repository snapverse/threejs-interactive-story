import MouseMeshInteraction from '@danielblagy/three-mmi'
import { CircleGeometry, Mesh, MeshBasicMaterial } from 'three'

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
}

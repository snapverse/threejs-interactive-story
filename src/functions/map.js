import { TextureLoader, MeshBasicMaterial, PlaneGeometry, Mesh } from 'three'

export async function renderProportionalMap(scene) {
  const texture = await new TextureLoader().loadAsync('./textures/map4.jpg')
  const material = new MeshBasicMaterial({ map: texture })
  const geometry = new PlaneGeometry(texture.image.width, texture.image.height)
  const plane = new Mesh(geometry, material)

  scene.add(plane)
  return plane
}

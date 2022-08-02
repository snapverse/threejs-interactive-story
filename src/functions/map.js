import { TextureLoader, MeshBasicMaterial, PlaneGeometry, Mesh } from "three";

export async function renderProportionalMap(scene) {
  const texture = await new TextureLoader().loadAsync('./textures/map.jpg')
  const material = new MeshBasicMaterial({ map: texture })
  const geometry = new PlaneGeometry(texture.image.width/4.3, texture.image.height/4.3)
  const plane = new Mesh(geometry, material)

  scene.add(plane)
  return plane
}

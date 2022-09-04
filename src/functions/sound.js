import { Audio, AudioLoader, AudioListener, PositionalAudio, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export function addBGMusic(camera, { path, loop, volume }) {
  const listener = new AudioListener()
  camera.add(listener)
  const sound = new Audio(listener)

  const audioLoader = new AudioLoader()
  audioLoader.load(path, (buffer) => {
    sound.setBuffer(buffer)
    sound.setLoop(loop)
    sound.setVolume(volume)
    sound.play()
  })
}

export function soundsCircle(camera, scene, { path, loop, volume,distance,play = 0, one,two,three},transx = 0,transy= 0,transz= 0, sphereradius=50,sphereWidh=32,sphereheight=32){
    
  const listener = new AudioListener()
  camera.add(listener)
  //const sound = new Audio(listener)
  const sound = new PositionalAudio( listener );
  
  const audioLoader = new AudioLoader()
  
  audioLoader.load(path, function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(loop)
    sound.setVolume(volume)
    sound.setRefDistance (distance) 
    sound.setDirectionalCone( one, two,three );
    sound.autoplay = true
    sound.play(play)
    sound.context.resume()
  })
  let segmentCount = 32,radius = 100
  const geometry = new BoxGeometry( sphereradius, sphereWidh,sphereheight);
  const material = new MeshBasicMaterial({ opacity:0 })
  //material.visible = false;
  material.transparent = true
  const circleSound = new Mesh(geometry, material)
  circleSound.add(sound)
  
  circleSound.translateX(transx)
  circleSound.translateY(transy)
  circleSound.translateZ(transz)
  scene.add(circleSound)
  
}
import { Audio, AudioLoader, AudioListener } from "three";

export function addBackgroundSound(camera, { path, loop, volume }) {
  const listener = new AudioListener()
  camera.add(listener)
  const sound = new Audio(listener)
  //const sound = new THREE.PositionalAudio( listener );

  const audioLoader = new AudioLoader()

  audioLoader.load(path, function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(loop)
    sound.setVolume(volume)
    sound.play()
  })

}

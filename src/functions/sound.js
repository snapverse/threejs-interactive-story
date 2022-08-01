import { Audio, AudioLoader, AudioListener } from "three";

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

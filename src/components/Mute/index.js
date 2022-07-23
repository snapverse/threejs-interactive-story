import { css, html, LitElement, svg } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { styles } from './index.styles'

export default customElements.define('x-mute', class extends LitElement {
  static properties = {
    title: {},
    muted: {}
  }

  constructor() {
    super()
    this.title = 'Silenciar'
    this.muted = false
  }

  static styles = [styles]

  #svg = svg`<svg
    id="wave"
    viewBox="0 0 659.2 153"
  >
    <path
      d="M2845.2,290.85c-41.21,0-41.21-140-82.41-140s-41.2,140-82.4,140-41.2-140-82.4-140-41.2,140-82.4,140-41.2-140-82.4-140-41.2,140-82.4,140-41.2-140-82.4-140-41.2,140-82.4,140"
      transform="translate(-2185.99 -144.35)"
    />
  </svg>`

  muteElements(element) {
    element.muted = true
    element.pause()
  }

  unMuteElements(element) {
    element.muted = false
    element.play()
  }

  #muteWindow(evt) {
    this.muted = !this.muted
    const waveElement = this.renderRoot.querySelector("#wave")
    const allSoundElements = document.querySelectorAll("video, audio")
    
    if (this.muted) {
      this.title = "Activar sonido"
      waveElement.classList.add("mute")
      allSoundElements.forEach(element => this.unMuteElements(element))
    } else {
      this.title = "Silenciar"
      waveElement.classList.remove("mute")
      allSoundElements.forEach(element => this.muteElements(element))
    }
    // allSoundElements
  }

  render() {
    return html`<div id="circle" title="${this.title}" @click="${this.#muteWindow}">
      ${this.#svg}
    </div>`
  }
})

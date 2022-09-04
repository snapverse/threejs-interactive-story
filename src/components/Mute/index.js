import { css, html, LitElement, svg } from 'lit'
import { pause, play } from '../../helpers/audio'
import { styles } from './index.styles'

export default customElements.define(
  'x-mute',
  class extends LitElement {
    static properties = {
      title: {},
      muted: {},
      talkingFinished: {},
    }

    constructor() {
      super()
      this.title = 'Silenciar'
      this.muted = true
      this.talkingFinished = false
      this.talking = null
      this.music = null
    }

    static styles = [styles]

    #svg = svg`<svg
      id="wave"
      class="mute"
      viewBox="0 0 659.2 153"
    >
      <path
        d="M2845.2,290.85c-41.21,0-41.21-140-82.41-140s-41.2,140-82.4,140-41.2-140-82.4-140-41.2,140-82.4,140-41.2-140-82.4-140-41.2,140-82.4,140-41.2-140-82.4-140-41.2,140-82.4,140"
        transform="translate(-2185.99 -144.35)"
      />
    </svg>`

    firstUpdated() {      
      this.talking = new Audio('sounds/sonidointro.mp3')
      this.talking.volume = 0.75

      this.music = new Audio('sounds/musiquita.mp3')
      this.music.volume = 0.018
      this.music.loop = true

      this.talking.addEventListener('ended', () => this.talkingFinished = true);
    }

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
      const waveElement = this.renderRoot.querySelector('#wave')
      const allSoundElements = document.querySelectorAll('video, audio')

      if (!this.muted) {
        this.title = 'Activar sonido'
        waveElement.classList.remove('mute')
        allSoundElements.forEach((element) => this.unMuteElements(element))
        play(this.music)
        if (!this.talkingFinished) play(this.talking)
      } else {
        this.title = 'Silenciar'
        waveElement.classList.add('mute')
        allSoundElements.forEach((element) => this.muteElements(element))
        pause(this.music)
        pause(this.talking)
      }
    }

    render() {
      return html`<div
        id="circle"
        title="${this.title}"
        @click="${this.#muteWindow}"
      >
        ${this.#svg}
      </div>`
    }
  }
)

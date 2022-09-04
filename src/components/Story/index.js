import { css, html, LitElement } from 'lit'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import story from '../../assets/story.json'
import { WINDOW_WIDTH } from '../../constants/three'
import { fromShadow } from '../../helpers/fromShadow'
import { styles } from './index.styles'

const SoundResolver = {
  kochi: 'kochi',
  'ñande ru mirî': 'nande-ru-miri',
  'apyka verâ': 'apyka-vera',
  opygua: 'opygua',
  mbya: 'mbya',
  opy: 'opy',
  'ka\'api': 'ka\'api',
  jaguarete: 'yaguarete'
}

export default customElements.define(
  'x-story',
  class extends LitElement {
    constructor() {
      super()
      this.storyCounter = 1
      this.currentSound = ""

      this.progressiveCounter = -1
      this.alertCounter = 0
      this.objective = "Reviví conmigo la ceremonia secreta de los mbya visitando ahora la Casa de rezos (Opy)"
    }

    static styles = [styles]

    static properties = {
      storyCounter: {},
      objective: {},
      extraCounter: {},
      currentSound: {}
    }

    updated() {
      /** @type {HTMLAudioElement} */
      const audio = this.renderRoot.querySelector('#audio')

      this.renderRoot.querySelectorAll('.sound').forEach(element=>{
        element.addEventListener('click', evt => {
          // @ts-ignore
          const selected = evt.path[3].childNodes[0].textContent.toLowerCase()
          this.currentSound = SoundResolver[selected]
          audio.volume = 0.45
          audio.load();
          audio.play();
        })  
      });
    }

    #toggleOpen() {
      if (this.storyCounter < story.length) {  
        this.progressiveCounter++
        this.alertCounter++
        
        setTimeout(() => {
          this.storyCounter++
          this.renderRoot.querySelector(".paragraphs-wrapper").scrollTo(0, 0)
        }, 1000)
      }
      
      this.renderRoot.querySelector("#text").classList.toggle("show")
      const currCircleWidth = fromShadow('progressive-bar', `.curr-${this.progressiveCounter}`)?.getBoundingClientRect().x ?? WINDOW_WIDTH
      
      this.objective = story[this.alertCounter]?.alert
      fromShadow('progressive-bar', '#current-progress').style.width = `${currCircleWidth}px`
    }

    render() {
      return html`
        <section class="alert">
          <div class="objective">
            <!-- <label class="container">
              <input type="checkbox" disabled ?checked="${false}">
              <span class="checkmark"></span>
            </label> -->
            <p>${this.objective}</p>
          </div>
        </section>
        <div id="text" class="blur">
          <div class="modal">
            <button class="btn-cerrar" id="close-button-story" @click="${this.#toggleOpen}">   
              <img class="cerrar" src="./textures/cerrar.png"/>
            </button>
              <div class="paragraphs-wrapper">
                ${story[this.storyCounter]?.paragraphs.map(paragraph => (
                  html`<p class="paragraphs">${unsafeHTML(paragraph)}</p>`
                ))}
              </div>
          </div>
        </div>

        <audio id="audio">
          <source src="https://github.com/simmxns/interactive-webgl-story/blob/4bbed21b696f6c3b92d19f1c0b6582f52ff137c5/public/translations/${this.currentSound}.ogg?raw=true" type="audio/ogg">
        </audio>
      `
    }
  }
)

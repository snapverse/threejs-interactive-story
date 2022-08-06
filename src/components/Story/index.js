import { css, html, LitElement } from 'lit'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import story from '../../assets/story.json'
import { WINDOW_WIDTH } from '../../constants/three'
import { getElementFromShadow } from '../../helpers/getElementFromShadow'
import { styles } from './index.styles'

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

    firstUpdated() {
      const audio = this.renderRoot.querySelector('#audio')
      this.renderRoot.querySelectorAll('.sound').forEach(element=>{
        element.addEventListener('click',(evt)=>{
          this.currentSound = evt.path[3].childNodes[0].textContent.toLowerCase()
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
      const currCircleWidth = getElementFromShadow('progressive-bar', `.curr-${this.progressiveCounter}`)?.getBoundingClientRect().x ?? WINDOW_WIDTH
      
      this.objective = story[this.alertCounter]?.alert
      getElementFromShadow('progressive-bar', '#current-progress').style.width = `${currCircleWidth}px`
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

        <audio  id="audio">
          <source src="https://github.com/simmxns/interactive-webgl-story/blob/287fadafb3b454e7f7611f4d0da230efa36b94b1/public/translations/${this.currentSound}.ogg?raw=true" type="audio/ogg">
        </audio>
      `
    }
  }
)

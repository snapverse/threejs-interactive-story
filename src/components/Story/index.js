import { css, html, LitElement } from 'lit'
import story from '../../assets/story.json'
import { WINDOW_WIDTH } from '../../constants/three'
import { getElementFromShadow } from '../../helpers/getElementFromShadow'
import { styles } from './index.styles'

export default customElements.define(
  'x-story',
  class extends LitElement {
    constructor() {
      super()
      this.counter = 1
      this.extraCounter = 0
      this.objective = "Buscá la morada de Ñande Ru Mirî en el mapa."
    }

    static styles = [styles]

    static properties = {
      counter: {},
      objective: {},
      extraCounter: {}
    }

    #toggleOpen() {
      if (this.counter < story.length) {  
        this.extraCounter++

        setTimeout(() => {
          this.counter++
          this.renderRoot.querySelector(".paragraphs-wrapper").scrollTo(0, 0)
        }, 500)
      }
      
      this.renderRoot.querySelector("#text").classList.toggle("show")
      const currCircleWidth = getElementFromShadow('progressive-bar', `.curr-${this.extraCounter}`)?.getBoundingClientRect().x ?? WINDOW_WIDTH
      

      this.objective = story[this.extraCounter]?.alert
      getElementFromShadow('progressive-bar', '#current-progress').style.width = `${currCircleWidth}px`
    }

    render() {
      return html`
        <section class="alert">
          <div class="objective">
            <label class="container">
              <input type="checkbox" disabled ?checked="${false}">
              <span class="checkmark"></span>
            </label>
            <p>${this.objective}</p>
          </div>
        </section>
        <div id="text" class="blur">
          <div class="modal">
            <button class="btn-cerrar" @click="${this.#toggleOpen}">   
              <img class="cerrar" src="./textures/cerrar.png"/>
            </button>
            <div class="paragraphs-wrapper">
              ${story[this.counter]?.paragraphs.map(paragraph => (
                html`<p class="paragraphs"> ${paragraph} </p>`
              ))}
              </div>
          </div>
        </div>
      `
    }
  }
)

import { css, html, LitElement } from 'lit'
import story from '../../assets/story.json'
import { getElementFromShadow } from '../helpers/getElementFromShadow'
import { styles } from './index.styles'

export default customElements.define(
  'x-story',
  class extends LitElement {
    constructor() {
      super()
      this.counter = 0
      this.objectives = [
        "Reviví conmigo la ceremonia secreta de los mbya visitando ahora la Casa de rezos (Opy)"
      ]
      this.finishes = []
    }

    static styles = [styles]

    static properties = {
      counter: {},
      objectives: {},
      selected: {}
    }

    #toggleOpen() {
      console.log()

      getElementFromShadow('story', '#text').classList.toggle("show")

      if (this.counter < story.length) {
        setTimeout(() => this.counter++, 500)
      }

      this.objectives.push(story[this.counter + 1]?.alert)
      this.finishes.push(this.objectives[this.counter])
    }
    

    render() {
      return html`
        <section class="alert">
          <p class="alert-title">Objectivos</p>
          <span class="line-separator"></span>
          <div class="objectives">
            ${this.objectives.map(objective => ( 
              html`<div class="objective">
                  <label class="container">
                    <input type="checkbox" disabled ?checked="${this.finishes.includes(objective) ? true : false}">
                    <span class="checkmark"></span>
                  </label>
                  <p class="${this.finishes.includes(objective) ? "done" : ""}">${objective}</p>
                </div>`
             ))}
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

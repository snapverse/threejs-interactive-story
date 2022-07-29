import { css, html, LitElement } from 'lit'
import story from '../../assets/story.json'
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
      this.selected = []
    }

    static styles = [styles]

    static properties = {
      counter: {},
      objectives: {},
      selected: {}
    }

    #toggleOpen() {
      document
        .querySelector('#app > x-story')
        .shadowRoot.querySelector('#text').classList.toggle("show")
      setTimeout(() => this.counter++, 500)
      this.objectives = [
        ...this.objectives,
        story[this.counter + 1].alert
      ]
    }

    render() {
      return html`
        <section class="alert">
          <p class="alert-title">Objectivos</p>
          <span class="line-separator"></span>
          <div class="objectives">
            ${this.objectives.map(objective => (
              html`
              <div class="objective">
                <label class="container">
                  <input type="checkbox" checked="${this.objectives.indexOf(objective) > -1}">
                  <span class="checkmark"></span>
                </label>
                <p class="${this.objectives.indexOf(objective) > -1 ? "" : ""}">${objective}</p>
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
              ${story[this.counter].paragraphs.map(paragraph => (
                html`<p class="paragraphs"> ${paragraph} </p>`
              ))}
              </div>
          </div>
        </div>
      `
    }
  }
)

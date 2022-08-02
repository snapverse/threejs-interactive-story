import { css, html, LitElement } from 'lit'
import intro from '../assets/intro.json'

export default customElements.define(
  'x-intro',
  class extends LitElement {
    static styles = css`
    `

    render() {
      return html`
        <section class="intro-hero">
        </section>
      `
    }
  }
)
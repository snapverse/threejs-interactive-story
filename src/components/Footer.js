import { css, html, LitElement } from 'lit'

export default customElements.define(
  'x-footer',
  class extends LitElement {
    static styles = css`
      .footer {
        position: absolute;
        bottom: 0;
        background: rgb(0, 0, 0);
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 25%,
          rgba(0, 0, 0, 0.2) 100%
        );
        z-index: 99;
        width: 100%;
        height: 70px;
      }
    `

    render() {
      return html`<footer class="footer"></footer>`
    }
  }
)

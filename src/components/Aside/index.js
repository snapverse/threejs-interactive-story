import { css, html, LitElement } from "lit";

export default customElements.define('x-aside', class extends LitElement {
  static styles = css`
    .aside {
      position: absolute;
      right: 0;
      top: 0;
      width: 45%;
      height: 100%;
      background-image: url(textures/paper.jpg);
      background-repeat: repeat;
      z-index: 999;
    }
  `

  render() {
    return html`
    <aside class="aside">
    </aside>
    `
  }
})
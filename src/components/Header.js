import { css, html, LitElement } from 'lit'

export default customElements.define('x-header', class extends LitElement {
  static styles = css`
    .header {
      position: absolute;
      top: 0;
      background: rgb(0,0,0);
      background: linear-gradient(0deg, rgba(0,0,0,0) 15%, rgba(0,0,0,0.65) 100%);
      z-index: 99;
      width: 100%;
      height: 100px;
    }
  `
  render() {
    return html`
      <header class="header">
        <slot></slot>
      </header>`
  }
})

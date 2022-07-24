import { css, html, LitElement } from 'lit'

export default customElements.define(
  'x-aside',
  class extends LitElement {
    static styles = css`
      .aside {
        position: absolute;
        right: 0;
        top: 0;
        width: 45%;
        height: 100%;
        /*background-image: url(textures/paper.jpg);*/
        background-color: #000;
        background-repeat: repeat;
        z-index: 2;
        transform: translateX(100%);
        transition: transform 0.7s ease-in-out;
      }

      .aside-open {
        transform: translateX(0%);
      }
    `

    render() {
      return html` <aside id="aside" class="aside"></aside> `
    }
  }
)

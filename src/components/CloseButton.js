import { css, html, LitElement } from 'lit'

export default customElements.define(
  'x-close-button',
  class extends LitElement {
    static styles = css`
      .close-button {
          width: 25px;
          position: relative;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: 0.5s ease-in-out;
          -moz-transition: 0.5s ease-in-out;
          -o-transition: 0.5s ease-in-out;
          transition: 0.5s ease-in-out;
          cursor: pointer;
          z-index: 9999;
        }

      .close-button span {
          display: block;
          position: absolute;
          height: 1.25px;
          width: 100%;
          background: rgb(255, 255, 255);
          y: 1;
          left: 0px;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out 0s;
        }

      .close-button span:nth-child(1) {
        top: 0px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      .close-button span:nth-child(2) {
        top: 7px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      .close-button span:nth-child(3) {
        top: 14px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      .close-button.open span:nth-child(1) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: -4px;
        left: 0px;
      }

      .close-button.open span:nth-child(2) {
        width: 0%;
        opacity: 0;
      }

      .close-button.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 14px;
        left: 0px;
      }

      .close-button span:nth-child(1) {
        top: 0px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      .close-button span:nth-child(2) {
        top: 7px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      .close-button span:nth-child(3) {
        top: 14px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      .close-button.open span:nth-child(1) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: -4px;
        left: 0px;
      }

      .close-button.open span:nth-child(2) {
        width: 0%;
        opacity: 0;
      }

      .close-button.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 14px;
        left: 0px;
      }
    `
    
    #toggleOpen() {
      this.renderRoot.querySelector('#close-button').classList.toggle('open')
      document
        .querySelector('#app > x-aside')
        .shadowRoot.querySelector('#aside')
        .classList.toggle('aside-open')
    }

    render() {
      return html`
        <button class="close-circle" @click="${this.#toggleOpen}">
          <div id="close-button" class="close-button">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      `
    }
  }
)

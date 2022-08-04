import { css, html, LitElement } from 'lit'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import story from '../assets/story.json'

const ArrowIcon = `<svg
width="20px"
viewBox="0 0 248.81 167.66"
>
<defs>
  <style>
    .cls-1 {
      fill: none;
      stroke: white;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 15px;
    }
  </style>
</defs>
<line class="cls-1" x1="10" y1="83.83" x2="238.81" y2="83.83" />
<line class="cls-1" x1="164.98" y1="10" x2="238.81" y2="83.83" />
<line class="cls-1" x1="238.81" y1="83.83" x2="164.98" y2="157.66" />
</svg>`

export default customElements.define(
  'x-intro',
  class extends LitElement {
    constructor() {
      super()
      this.currentPercent = 0
      this.isStarted = false;
    }

    static styles = css`
      .intro-hero {
        opacity: 1;
        display: grid;
        place-items: center;  
        width: 100%;
        height: 100%;
        position: absolute;
        background: #181715;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: 999999;
        transition: opacity 800ms;
      }

      .intro-hide {
        opacity: 0;
      }

      .percent {
        width: 120px;
        height: 120px;
        transform: rotate(270deg);
        position: relative;
      }

      .tocheable {
        cursor: pointer;
        transition: opacity 700ms;
      }

      .svg:target {
        transform: scale(0.9);
      }

      .percent #start-text {
        opacity: 0;
        text-transform: uppercase;
        font-size: 0.875rem;
        font-weight: 300;
        color: white;
        position: absolute;
        top: 52.9%;
        left: 23%;
        transform: rotate(90deg) translate(-50%, -50%);
        transition: opacity 700ms ease;
      }

      .percent svg {
        width: 120px;
        height: 120px;
        transition: 700ms;
      }

      .percent svg circle {
        width: 100%;
        height: 100%;
        fill: transparent;
        stroke-width: 2;
        stroke: rgba(255, 255, 255, 0.25);
      }

      .percent svg circle:nth-child(2) {
        stroke-width: 2;
        stroke: rgb(255, 255, 255);
        stroke-dasharray: 320;
        stroke-dashoffset: calc(320 - (320 * var(--percent)) / 100);
      }

      .paragraphs {
        display: flex;
        flex-direction: column;
        gap: 40px;
        opacity: 0;
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding-inline: 15px;
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 86%;
        transition: opacity 700ms 600ms ease;
        pointer-events: none;
      }
      
      .intro-show {
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .paragraph {
        // padding-inline: 70px;
        color: white;
        font-size: 2.5rem;
        line-height: 1.2;
        font-family: 'Antiquarian Scribe';
        font-weight: 400;
        margin:0px 0 0 17px;
      }

      .continue-button {
        opacity: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        transition: opacity 700ms 600ms ease;
      }

      .continue-button p {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 300;
        margin-right: 6px;
        transition: margin-right 600ms;        
      }

      .continue-button:hover p {
        margin-right: 12px;
      }

      .to-translate {
        margin: 0;
        display: inline;
        text-decoration: underline;
        position: relative;
      }

      .to-translate:hover .translation {
        display: block;
      }

      .translation {
        display: none;
        background-color: rgb(53, 53, 53);
        border-bottom: 2px solid black;
        padding: 16px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 46px;
        width: 270px;
        height: auto;
        font-size: 1rem;
        font-family: 'Geo Graphic Ahand';
        font-weight: 300;
        border-radius: 5px;
        color: white;
      }

      .translation > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row-reverse;
        margin-bottom: 12px;
      }

      .translation > div svg {
        width: 22px;
        cursor: pointer;
      }

      .translation > div .separator {
        height: 20px;
        border-right: 1px solid white;
        margin-inline: 8px;
      }

      .translation > div p {
        font-size: 1.25rem;
        font-weight: 500;
        margin: 0;
      }

    `

    firstUpdated() {
      const root = document.querySelector(':root');
      
      const progression = setInterval(() => {
        this.currentPercent++
        root.style.setProperty('--percent', this.currentPercent);

        if (this.currentPercent > 99) {
          clearInterval(progression)
          this.isStarted = true;
          this.renderRoot.querySelector('.percent').classList.add('tocheable')
          this.renderRoot.querySelector('#start-text').style.opacity = 1
        } 
      }, 100/144)
    }

    startHandler(evt) {
      if (!this.isStarted) return

      evt.preventDefault()
      evt.stopPropagation()
      
      this.renderRoot.querySelector('.percent').style.opacity = 0

      setTimeout(() => {
        this.renderRoot.querySelector('.percent').style.display = "none"
      }, 800)

      this.renderRoot.querySelector('.paragraphs').classList.add('intro-show')
      this.renderRoot.querySelector('.continue-button').classList.add('intro-show')
    }

    continueHandler() {
      if (!this.isStarted) return
      this.renderRoot.querySelector('.intro-hero').classList.add('intro-hide')      

      setTimeout(() => {
        this.renderRoot.querySelector('.intro-hero').style.display = "none"
      }, 800)
    }

    render() {
      return html`
        <section class="intro-hero">
          <section class="paragraphs">
            ${story[0]?.paragraphs.map(paragraph => (
              html`<p class="paragraph">${unsafeHTML(paragraph)}</p>`
            ))}
          </section>
          <button class="continue-button" @click="${this.continueHandler}"><p>CONTINUAR</p>${unsafeHTML(ArrowIcon)}</button>
          <span class="percent" @click="${this.startHandler}">
            <p id="start-text">INICIAR</p>
            <svg>
              <circle cx="60" cy="60" r="50"></circle>
              <circle cx="60" cy="60" r="50"></circle>
            </svg>
          </span>
        </section>
      `
    }
  }
)
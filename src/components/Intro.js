import { css, html, LitElement } from 'lit'       
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import story from '../assets/story.json'
import { fromShadow } from '../helpers/fromShadow'

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
      this.currentSound = ""
      this.isStarted = false;
    }
    static properties= {
      currentPercent: {},
      currentSound: {},
      isStarted: {}
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
        background: url("./textures/fondo.jpg");
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
        font-family: 'Geo Graphic Ahand';
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

      .logo{
        width:750px;
        opacity: 1;
        pointer-events:none;
        transition: opacity 700ms
      }

      .paragraphs::-webkit-scrollbar {
        -webkit-appearance: none;
      }

      .paragraphs::-webkit-scrollbar:vertical {
        width:10px;
        
      }
      
      .paragraphs::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
        display: none;
      } 
      
      .paragraphs::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.25);
        border-radius: 20px;
      }

      .paragraphs::-webkit-scrollbar-track {
        border-radius: 10px;  
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
        margin: 0 0 0 35px;
        background-color: rgb(53, 53, 53);
        border: 1px solid rgb(102 102 102);
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

      .center-intruccions{
        z-index:9999999999999999999999999;
		    position:absolute;
        display:none;
        transform: translate(-50%,-50%);
        top: -2753%;
        left: 250%;
        opacity:0;
        top: -1419%;
        left: 465%;
      }
      .instruccions{
        width: 1268px;
        height: 760px;
        background-color: #111010;
        border-radius:10px;
        border: 1px solid #3d3a3a;
        flex-wrap: wrap;
        align-items: center;
        justify-content:center;
        display:flex;
        padding:30px; 
        overflow-y: scroll;
        display:flex;
      }
      .instruccions::-webkit-scrollbar {
        -webkit-appearance: none;
      }
      .ins-img{
        padding:20px;
        width: 300px;
      }

      .ins-img:nth-child(1) {
        padding: 0px 20px 41px;
      }
      @media only screen and (max-width: 1472px) {
        .logo{
          width: 499px;
        }
      }

      .modal {
        z-index: 9999999;
        width: 100%;
        height: 100%;
        position: absolute;
        display: grid;
        place-items: center;
        background-color: rgba(0,0,0,0.65);
        backdrop-filter: blur(2px);
      }
      .modal.hide {
        display: none;
      }

      .sound-modal {
        width: 360px;
        border-radius: 8px;
        background-color: rgb(17, 16, 16);
        border: 1px solid rgb(61, 58, 58);
        padding: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 200px;
      }
      .sound-modal p {
        color: white;
        font-size: 1.25rem;
        margin-block: 20px;
      }
    
      #activate {
        border: none;
        padding: 8px 20px;
        width: 88%;
        border-radius: 5px;
        font-size: 0.875rem;
        font-family: sans-serif;
        font-weight: 600;
        background: rgb(49, 125, 90);
        color: white;
        cursor: pointer;
      }
      #activate:hover {
        background: rgb(37 93 68);
      }

      .headphone {
        width: 55px;
        height: 55px;
        color: white;
        margin-top: -8px;
      }
    `
    
    #modal = html`<div class="modal">
      <div class="sound-modal">
        <svg class="headphone" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"/></svg>  
        <p>Para una mejor experiencia es recomendable activar el sonido</p>
        <button id="activate" @click="${this.handleActivateModal}">Activar</button>
      </div>
    </div>`

    handleActivateModal() {
      const muteButton = fromShadow('mute', '#circle')
      const modal = this.renderRoot.querySelector('.modal')

      muteButton.click()
      modal.classList.add('hide')

      const root = document.querySelector(':root');
      const progression = setInterval(() => {
        this.currentPercent++
        // @ts-ignore
        root.style.setProperty('--percent', this.currentPercent);

        if (this.currentPercent > 99) {
          clearInterval(progression)
          this.isStarted = true;
          this.renderRoot.querySelector('.percent').classList.add('tocheable')
          // @ts-ignore
          this.renderRoot.querySelector('#start-text').style.opacity = 1
        } 
      }, 12000/144)
    }

    firstUpdated() {
      /** @type {HTMLAudioElement} */
      const audio = this.renderRoot.querySelector('#audio')
      this.renderRoot.querySelectorAll('.sound').forEach(element=>{
        element.addEventListener('click', evt => {
          // @ts-ignore
          this.currentSound = evt.path[3].childNodes[0].textContent.toLowerCase()
          audio.volume = 0.45
          audio.load();
          audio.play();
        })  
      });
    }

      

    startHandler(evt) {
      if (!this.isStarted) return
      
      evt.preventDefault()
      evt.stopPropagation()
      // @ts-ignore
      this.renderRoot.querySelector('.logo').style.opacity = 0
      // @ts-ignore
      this.renderRoot.querySelector('.percent').style.opacity = 0

      setTimeout(() => {
        // @ts-ignore
        this.renderRoot.querySelector('.percent').style.display = "none"
      }, 800)

      this.renderRoot.querySelector('.paragraphs').classList.add('intro-show')
      this.renderRoot.querySelector('.continue-button').classList.add('intro-show')
    }
    
    continueHandler() {
      if (!this.isStarted) return
      this.renderRoot.querySelector('.intro-hero').classList.add('intro-hide')      

      setTimeout(() => {
        // @ts-ignore
        this.renderRoot.querySelector('.intro-hero').style.display = "none"
      }, 800)
    }

    render() {
      return html`
        ${this.#modal}
        <section class="intro-hero">
          <section class="paragraphs">
            ${story[0]?.paragraphs.map(paragraph => (
              html`<p class="paragraph">${unsafeHTML(paragraph)}</p>`
            ))}
          </section>
          <button class="continue-button" @click="${this.continueHandler}"><p>CONTINUAR</p>${unsafeHTML(ArrowIcon)}</button>
          <img  class="logo" alt="logo" src="./textures/logo.png">
          <span class="percent" id="start-button" @click="${this.startHandler}">
            <p id="start-text">INICIAR</p>
            <svg>
              <circle cx="60" cy="60" r="50"></circle>
              <circle cx="60" cy="60" r="50"></circle>
            </svg>
          </span>
          
          <audio  id="audio">
            <source src="https://github.com/simmxns/interactive-webgl-story/blob/287fadafb3b454e7f7611f4d0da230efa36b94b1/public/translations/${this.currentSound}.ogg?raw=true" type="audio/ogg">
          </audio>
        </section>
      `
    }
  }
)
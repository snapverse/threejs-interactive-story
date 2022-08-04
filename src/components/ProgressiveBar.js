import { css, html, LitElement } from 'lit'
import story from '../assets/story.json'

export default customElements.define(
  'x-progressive-bar',
  class extends LitElement {
    static styles = css`
     #current-progress {
        position: absolute;
        border: 2px solid rgba(255, 255, 255, 1);
        top: 50%;
        left: 0;
        width: 0;
        transform: translateY(-50%);
        transition: width 1000ms ease-in-out;
      }

      .progressive-bar-story {
        position: absolute;
        bottom: 30px;
        width: 100%;
        border: 2px solid rgba(255, 255, 255, 0.25);
      }

      .progressive-wrapper {
        position: absolute;
        width: inherit;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }

      .progressive-circle {
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background-color: rgba(255, 255, 255, 0.75);
        transition: transform 200ms ease-in-out;
      }
      
      .progressive-circle:hover {
        transform: scale(1.35);
      }
    `

    render() {
      return html`
        <span class="progressive-bar-story">
          <span id="current-progress"></span>
          <div class="progressive-wrapper">
            ${story.slice(1,6).map((story, i) => html`<span class="progressive-circle curr-${i++}"></span>`)}
          </div>
        </span>
      `
    }
  }
)
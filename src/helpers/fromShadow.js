/** @type {(shadowRootName: string, selector: string) => HTMLElement} */
export const fromShadow = (shadowRootName, selector) => 
  document
    .querySelector(`x-${shadowRootName}`)
    .shadowRoot.querySelector(selector)
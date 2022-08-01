/** @type {(shadowRootName: string, selector: string) => HTMLElement} */
export const getElementFromShadow = (shadowRootName, selector) => 
  document
    .querySelector(`#app > x-${shadowRootName}`)
    .shadowRoot.querySelector(selector)
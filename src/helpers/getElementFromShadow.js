/** @type {(shadowRootName: string, selector: string) => HTMLElement} */
export const getElementFromShadow = (shadowRootName, selector) => 
  document
    .querySelector(`x-${shadowRootName}`)
    .shadowRoot.querySelector(selector)
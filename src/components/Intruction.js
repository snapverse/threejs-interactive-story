import { css, html, LitElement, svg } from 'lit'

export default customElements.define(
  'x-instruction',
  class extends LitElement {
    static styles = css`
        .center-intruction{
          position:absolute;
          display:none;
          transition: opacity 700ms;
          width:100%;
          height:100vh !important;
          overflow:hidden;
          justify-content: center;
          align-items: center;
        }
        .center{
          position:relative;
          height: 70%;
          padding: 40px 30px 60px 30px;
          background-color: rgb(17, 16, 16);
          border: 1px solid rgb(61, 58, 58);
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          width: 69%;
          overflow-y:auto;
          z-index:9999999999999;
          display: flex;
        }


      .instruccions{
        display:flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items:flex-end;
        gap:20px;
        row-gap: 27px;
        row-gap: 27px;
      }
      .instruccions::-webkit-scrollbar {
        -webkit-appearance: none;
      }

      #button-icon{
        position:absolute;
        z-index:99999999999999999;
        color:white;
        bottom:0;
        left: 9px;
        bottom: 35px;
        width: 33px;
        cursor:pointer;
      } 

      .center-intruction.open {
		    display:flex;
        opacity:1;
	    }
      
      .ins-img{
        width: 310px;
        padding:5px;
      }

      .center::-webkit-scrollbar {
        -webkit-appearance: none;
      }

      .center::-webkit-scrollbar:vertical {
        width:10px;
        
      }
      
      .center::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
        display: none;
      } 
      
      .center::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.25);
        border-radius: 20px;
      }

      .center::-webkit-scrollbar-track {
        border-radius: 10px;  
      }

      @media only screen and (max-width: 1472px) {
        .ins-img {
          
                width: 231px;
                //width: 23%;
        }
        .center{
          
          overflow-y: hidden;
          padding: 19px 0px -10px;
        }
      }
      @media only screen and (max-width: 1104px) {
        
        .instruccions{
          
          gap: inherit;
        }
      }

      @media only screen and (max-width: 1561) {
        .ins-img {
          width: 283px;
        }
      }
      
    `
    #svg = svg`<svg
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
      fill="currentColor"
    ></path>
    <path
      d="M18.29,8.92a7.38,7.38,0,0,0-5.72,2.57,1,1,0,0,0-.32.71.92.92,0,0,0,.95.92,1.08,1.08,0,0,0,.71-.29,5.7,5.7,0,0,1,4.33-2c2.36,0,3.83,1.52,3.83,3.41v.05c0,2.21-1.76,3.44-4.54,3.65a.8.8,0,0,0-.76.92s0,2.32,0,2.75a1,1,0,0,0,1,.9h.11a1,1,0,0,0,.9-1V19.45c3-.42,5.43-2,5.43-5.28v-.05C24.18,11.12,21.84,8.92,18.29,8.92Z"
      fill="currentColor"
    ></path>
    <circle
      cx="17.78"
      cy="26.2"
      r="1.25"
      fill="currentColor"

    ></circle>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
  </svg>`
     
    toggleOpen(){
      this.renderRoot.querySelector('.center-intruction').classList.toggle("open")
    }

    
    render() {
      return html`
        <div id="button-icon" @click=${this.toggleOpen}>${this.#svg}
        </div>
            <div class="center-intruction">
              <div class="center"> 
                <div class="instruccions">                    
                      <img  class="ins-img" alt="instrucciones" src="./textures/instrucciones/1.png">
                      <img  class="ins-img" alt="instrucciones" src="./textures/instrucciones/2.png">
                      <img  class="ins-img" alt="instrucciones" src="./textures/instrucciones/3.png">

                      <img  class="ins-img" alt="instrucciones" src="./textures/instrucciones/a.png">
                      <img  class="ins-img" alt="instrucciones" src="./textures/instrucciones/b.png">
                      <img  class="ins-img" alt="instrucciones" src="./textures/instrucciones/c.png">
                </div>
              </div>    
            </div>
      
      `
    }
  }
)
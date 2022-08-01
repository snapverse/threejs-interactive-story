import { css } from "lit";
import { classMap } from 'lit/directives/class-map.js'

export const styles = css`
      .blur {
        display:flex;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999999;
        justify-content: end;
        align-items: center;
        //transform: translateX(100%);
        opacity: 0;
        transition: all 0.7s ease-in-out;
        pointer-events:none;

      }
      .modal {
        width: 700px;
        height: 100%; 
        //object-fit: contain;
        //backdrop-filter: blur(2px);
        //background: rgba(0, 0, 0, 0.25);
        //box-shadow: 0px 0px 43px 35px rgba(0,0,0,0.25); 
        //background: red;
        position: relative;
        top: 35px;
        right: 10px;

        background-image: url(./textures/paper-antique.png);
        background-size: 45em;
        background-repeat: no-repeat;
        background-position: left;
      }
      
      img{
        height: 100%;
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index:-1;
      }

      .paragraphs-wrapper{
        position: absolute;
        //background: rgba(0, 0, 0, 0.25);
        width: 80%;
        height: 73%; 
        //padding: 90px 1000px 0 65px;
        overflow-y:scroll;
        top: 50%;
        left: 48.1%;
        transform: translate(-50%,-50%);
        letter-spacing: 2px;
        border-radius: 10px;
        hyphens: auto;
      }

      .paragraphs {
        //text-align: center;
        //text-align: justify;
        font-size: 2.5rem;
        line-height: 1.2;
        font-family: 'Antiquarian Scribe';
        font-weight: 400;
        margin:0px 0 0 17px;
        
        
        color: #1a1a1e;
        
        -webkit-text-stroke: 1px;
      }

      .paragraphs:nth-child(2) {
        padding: 27px 0 0 0;
      }

      .to-translate{
        font-weight: 300;
      }

      .show{
        opacity: 1;
        //transform: translateX(0%);
        pointer-events:visible;


      }
  
      .paragraphs-wrapper::-webkit-scrollbar {
        -webkit-appearance: none;
      }

      .paragraphs-wrapper::-webkit-scrollbar:vertical {
        width:10px;
        
      }
      
      .paragraphs-wrapper::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
        display: none;
      } 
      
      .paragraphs-wrapper::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
        border-radius: 20px;
      }

      .paragraphs-wrapper::-webkit-scrollbar-track {
        border-radius: 10px;  
      }

      .cerrar{
        width:90px;
        height:90px;
      }
      .btn-cerrar{
        display:flex;
        justify-content: end;
        align-items: end;
        cursor: pointer;
        position: absolute;
        width:80px;
        height:80px;
        border-radius: 100%;
        top: 88.2%;
        left: 89.2%;
        transform: translate(-50%,-50%);
        z-index: 999;
        background:none;
        border:none;
      }
      .blur .modal .btn-cerrar{
        pointer-events:none;
        opacity: 0;
        transition: all 0.7s ease-in-out;
        
      }
      .blur.show .modal .btn-cerrar{
        pointer-events: visible;
        opacity: 1;        
      }

      .alert {
        display: flex;
        align-items: start;
        flex-direction: column;
        position: absolute;
        top: 50px;
        left: 35px;
        color: white;
        font-size: 0.975rem;
        font-family: 'Geo Graphic Ahand';
        font-weight: 400;
      }

      .line-separator {
        width: 40%;
        height: 2px;
        background: #1e1e1e;
        margin: -5px 0 22px 0;
      }

      .objective {
        height: 16px;
        display: flex;
        align-items: center;
      }

      .objective .done {
        text-decoration: line-through;
      }

      .objectives {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
      }
      
      .objective .container {
        display: block;
        position: relative;
        padding-left: 24px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .objective .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .objective .container .checkmark {
        position: absolute;
        top: -2px;
        left: 0;
        height: 15px;
        width: 15px;
        background-color: none;
        border-radius: 100%;
        border: 1px solid white;
      }
      
      .objective .container input:checked ~ .checkmark::after {
        content: "✓";
        position: absolute;
        top: -11px;
        left: 2px;
        width: 10px;
        color: #a6bfb1;
      }

      .alert-title {
        font-size: 1rem;
        font-family: 'Geo Graphic Ahand';
        font-weight: 400;
      }
    `
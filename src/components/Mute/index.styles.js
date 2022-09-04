import { css } from 'lit'

export const styles = css`
  #circle {
    display: grid;
    place-items: center;
    position: relative;
    aspect-ratio: 5 / 5;
    width: 1.45rem;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  #wave {
    position: absolute;
    width: 200%;
    left: 0;
    animation: wave linear 3s infinite;
  }

  #wave path {
    fill: none;
    stroke: rgba(255, 255, 255, 0.25);
    stroke-linecap: square;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 30px;
    transition: 0.2s;
  }

  #wave.mute path {
    d: path(
      'M2845.2,290.85c-41.21,0-41.21-39-82.41-39s-41.2,39-82.4,39-41.2-39-82.4-39-41.2,39-82.4,39-41.2-39-82.4-39-41.2,39-82.4,39-41.2-39-82.4-39-41.2,39-82.4,39'
    );
  }

  @keyframes wave {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }
`

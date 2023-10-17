export const GAME_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

  img {
      display: block;
      margin-left: auto;
      margin-right: auto;    
      margin-bottom: 0.5rem;
      border-radius: 2rem;
  }

  #box {
      width: 20px;
      height: 200px;
      top: 10%;
      border: 2px grey solid;
      background-color: rgb(61, 63, 75);
      position: relative;
      border-radius: 2rem;

      margin: auto;
      margin-bottom: 0.5rem;
  }

  #bar {
      animation: rise 1s;
      width: 100%;
      height: 100%;
      position: relative;

      overflow: hidden;
      background-image: linear-gradient(to top, #03cafc, #0a1df0, #d513eb);

      border-radius: 2rem;
  }
  #bar-stripes {
      width: 100%;
      height: 100%;
      background: linear-gradient(
          -25deg,
          transparent,
          transparent 33%,
          rgba(0, 0, 0, 0.1) 33%,
          rgba(0, 0, 0, 0.1) 66%,
          transparent 66%
      );
      background-size: 100% 20px;
      animation: stripes 0.5s linear infinite;
      background-repeat: repeat;
  }

  @keyframes rise {
      0% {
          height: 0;
          top: 100%;
      }

      100% {
          height: 100%;
          top: 0%;
      }
  }
  @keyframes stripes {
      from {
          background-position: 0 20px, 0 0;
      }
      to {
          background-position: 0 0, 0 0;
      }
  }
`;

export const BUTTON_CSS = `
#button-container {
    width: 160px;
    height: 48px;
    border-radius: 160px;
    background-color: #3a6df0;
    position: relative;
    margin: auto;
    transition: 0.2s;
    animation: fade-in 1s forwards ease-out
}

#button-text {
    margin: auto;    
    width: fit-content;
    line-height: 48px;
    font-family: sans-serif;
    color:white;
    font-weight: 800;
}

@keyframes fade-in {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1
    }
}
`

export const CONVERT_SVG_CSS = `
    * {
    margin: 0;
    box-sizing: border-box;
    }
    #auth-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    }
    #title {
    text-align: center;
    }
    #token {
    width: 400px;
    text-align: center;
    overflow-wrap: break-word;
    white-space: normal;
    }
`;

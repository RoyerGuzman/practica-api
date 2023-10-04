import { LitElement, html, css } from 'lit';

class Header extends LitElement {
  static styles = css`
    .slide {
      position: relative;
      min-height: 400px;
      overflow: hidden;
    }

    .header {
      position: absolute;
      top: 0%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, 0%);
      text-align: center;
      font-size: 175%;
      color: #fff;
      text-shadow: 0 2px 2px #000;
    }

    #title {
      background-image: url("https://picsum.photos/640/480");
      background-repeat: no-repeat;
      background-size: cover;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    #title h1 {
      position: absolute;
      top: 10%;
      z-index: 1;
    }
    #title h1 span {
        display: block;
        font-size: 2.5rem;
    }
    #title::before {
      content: "";
      position: absolute;
      top: 5%;
      bottom: auto;
      left: auto;
      right: auto;
      width: 90%;
      min-width: 300px;
      max-width: 700px;
      height: 300px;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px); /* Aplicar filtro de desenfoque */
      border-radius: 30px;
      z-index: 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    // Agregar el evento de scroll para actualizar la posición del fondo en cada desplazamiento
    window.addEventListener('scroll', () => this.updateBackgroundPosition());
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Eliminar el evento de scroll cuando el componente se desconecta del DOM
    window.removeEventListener('scroll', () => this.updateBackgroundPosition());
  }

  updateBackgroundPosition() {
    const title = this.shadowRoot?.querySelector('#title');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajustar la posición vertical del fondo en relación con el desplazamiento
    if (title) {
      title.style.backgroundPositionY = `${-scrollTop * 1.5}px`;
    }
  }

  render() {
    return html`
      <div class="slide">
        <div id="title" class="header">
        <h1>
            <div class="overlay"></div>
            Tarjetas API
            
            <span>Rogelio Guzman Pastor</span>
        </h1>
        </div>
      </div>
    `;
  }
}

customElements.define('my-header', Header);
import { LitElement, html, css } from 'lit';

class CantTarjetasInput extends LitElement {
static styles = css`
    .bloque-cantidad {
        display: flex;
        width: 90%;        
        max-width: 300px;
        box-shadow: 10px 10px 30px rgba(0,0,0, 0.5);
        margin: 30px auto 20px auto;
        border-radius: 15px;
        min-height: 100px;
        justify-content: center;
        align-items: center;        
        flex-direction: column;
        padding: 20px 5px;

    }
    .bloque-cantidad input{
        width: 80%;        
        background: #efefef;
        display: block;
        padding: 8px 10px 8px 30px;
        text-align: center;
        border: none;
        border-radius: 10px;

    }
    .bloque-cantidad select {
        width: 90%;        
        background: #efefef;
        display: block;        
        padding: 8px 0 8px 0;
        text-align: center;
        border: none;
        border-radius: 10px;
        margin-bottom: 15px;

    }
    .bloque-cantidad select option {

        padding: 8px 25px 8px 0px;

    }
    .bloque-cantidad button {
        display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 10px;
      background-color: dodgerblue;
      margin-bottom: 20px;
      transition: all 0.2s;
      border: 2px solid dodgerblue;
      color: #fff;
      cursor: pointer;
    }
    .bloque-cantidad button:hover {
      transform: scale(1.05);
      box-shadow: 2px 2px 5px rgba(0,0,0, 0.2); 
    }

`;
static properties = {
    cantidadTarjetas: { type: Number },
    generoSeleccionado: { type: String },
  };

  constructor() {
    super();
    this.cantidadTarjetas = 8; // Valor predeterminado
    this.generoSeleccionado = ""; // Género seleccionado (vacío por defecto)
  }

  handleActualizar() {
    const event = new CustomEvent('actualizar-click', {
      detail: {
        cantidadTarjetas: this.cantidadTarjetas,
        generoSeleccionado: this.generoSeleccionado,
      },
    });
    this.dispatchEvent(event);
  }

  updateCantidadTarjetas(event) {
    this.cantidadTarjetas = Number(event.target.value);
  }

  handleGeneroChange(event) {
    this.generoSeleccionado = event.target.value;
  }

  handleVerFavoritos() {
    const event = new CustomEvent('ver-favoritos-click');    
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="bloque-cantidad">
        <p>Carga nuevas tarjetas</p>
        <input type="number" min="1" max="50" .value="${this.cantidadTarjetas}" @input="${this.updateCantidadTarjetas}">
        <p>Seleccionar Genero</p>
        <select @change="${this.handleGeneroChange}">
          <option value="">Ambos</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <button @click="${this.handleActualizar}">Actualizar</button>
        <button @click="${this.handleVerFavoritos}">Ver mis favoritos</button>
      </div>
    `;
  }
}

customElements.define('cant-tarjetas-input', CantTarjetasInput);
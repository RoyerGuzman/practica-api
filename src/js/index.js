import './components/components.js';
import { LitElement, html } from 'lit';
import { fetchData } from './services/consultaApi.js';

class MyApp extends LitElement {
  static properties = {
    data: { type: Array },
    cantidadTarjetas: { type: Number },
    generoFiltrado: { type: String },
    favoriteCards: { type: Array },
    showFavorites: { type: Boolean },
  };

  constructor() {
    super();
    this.cantidadTarjetas = 8;
    this.generoFiltrado = null;
    this.favoriteCards = [];
    this.showFavorites = false; // New property to track if favorites are shown
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchDataWithCantidad();
  }

  handleFavoriteClick(event, item) {
    if (event.detail.isFavorite) {
      this.favoriteCards.push(item);
    } else {
      const index = this.favoriteCards.findIndex((card) => card === item);
      if (index !== -1) {
        this.favoriteCards.splice(index, 1);
      }
    }
    this.requestUpdate();
  }

  handleActualizar(event) {
    this.cantidadTarjetas = event.detail.cantidadTarjetas;
    this.generoFiltrado = event.detail.generoSeleccionado;
    this.showFavorites = false; // Reset showFavorites when updating data
    this.fetchDataWithCantidad();
  }

  handleVerFavoritos() {
    this.favoriteCards =
      JSON.parse(localStorage.getItem('favoriteItems')) || [];
    this.showFavorites = true; // Set showFavorites when viewing favorites
    this.requestUpdate();
  }

  async fetchDataWithCantidad() {
    try {
      // Only make API request if not showing favorites
      if (!this.showFavorites) {
        const url = 'https://randomuser.me/api/';
        const apiUrl = this.generoFiltrado
          ? `${url}?results=${this.cantidadTarjetas}&gender=${this.generoFiltrado}`
          : `${url}?results=${this.cantidadTarjetas}`;
        this.data = await fetchData(apiUrl);
      }
      this.requestUpdate();
    } catch (error) {
      // Handle error
    }
  }

  favoriteClass(item) {
    return this.showFavorites && item.isFavorite ? 'select-favorite' : '';
  }

  render() {
    return html`
      <my-header></my-header>
      <cant-tarjetas-input
        .cantidadTarjetas="${this.cantidadTarjetas}"
        @actualizar-click="${this.handleActualizar}"
        @ver-favoritos-click="${this.handleVerFavoritos}"
      ></cant-tarjetas-input>
      ${this.showFavorites
        ? html`<favorite-cards .favoriteCards=${this.favoriteCards}></favorite-cards>`
        : html`
            ${this.data
              ? this.renderData()
              : html`<my-spinner></my-spinner>`}
          `}
      
    `;
  }

  renderData() {
    return html`
      <all-cards
        .data=${this.data}
        .favoriteCards=${this.favoriteCards}
        .favoriteClass=${(item) => this.favoriteClass(item)}
        @favorite-click="${this.handleFavoriteClick}"
      ></all-cards>
    `;
  }
}

customElements.define('my-app', MyApp);
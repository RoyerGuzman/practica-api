import { LitElement, html, css } from 'lit';

import './all-cards'; // Importar el componente AllCards

class FavoriteCards extends LitElement {
  static properties = {
    favoriteCards: { type: Array },
    showFavorites: { type: Boolean },
  };

  constructor() {
    super();
    this.favoriteCards = [];
    this.showFavorites = true;
  }

  render() {
    return html`
      <all-cards
        class="favorite-card"
        .data="${this.favoriteCards}"
        .showFavorites="${this.showFavorites}"
        
      ></all-cards>
    `;
  }

}

customElements.define('favorite-cards', FavoriteCards);
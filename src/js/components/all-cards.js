import { LitElement, html, css } from 'lit';

class AllCards extends LitElement {
  static properties = {
    data: { type: Array },
    showFavorites: { type: Boolean },
  };

  static styles = css`
    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      max-width: 1400px;
      margin: 0 auto;
    }

    .card {
      padding: 20px;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this.showFavorites = false;
  }

  favoriteClass(item) {
    const favoriteCardsInLocalStorage = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    const isFavorite = favoriteCardsInLocalStorage.some((card) => card.email === item.email);

    return this.showFavorites && isFavorite ? 'select-favorite' : '';
  }

  render() {
    return html`    
      <div class="card-container">
        ${this.data.map(
          (item) => html`
            <div class="card">
              <card-user
                .item="${item}"
                class="${this.favoriteClass(item)}"
                @favorite-click="${(event) => this.handleFavoriteClick(event, item)}"
              >
                <a class="${this.favoriteClass(item)}" @click="${this.handleClickFavorite}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
                    </svg>
                </a>
              </card-user>
            </div>
          `
        )}
      </div>
    `;
  }

  handleFavoriteClick(event, item) {
    const newIsFavorite = !item.isFavorite;
    item.isFavorite = newIsFavorite;
    this.requestUpdate();

  }
}

customElements.define('all-cards', AllCards);
import { LitElement, html, css } from 'lit';

class Card extends LitElement {
  static styles = css` 
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: "Lato", sans-serif;
    }

    .user-card {
      width: 230px;
      height: 250px;
      box-shadow: -10px 5px 20px rgba(0, 0, 0, 0.3);
      border-radius: 15px;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      transition: box-shadow 0.2s ease-in;
      
    }

    .user-card:hover {
      box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.4);
    }

    .user-card .user-cover {
      height: 25px;
      width: 100%;
      border-radius: 15px 15px 0 0;
      background-color: dodgerblue;
      position: relative;
    }

    .user-card .user-cover .user-avatar {
      position: absolute;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -25px;
      border: 1px solid #fff;
    }

    .user-card .user-details {
      text-align: center;
      margin-top: 35px;
      margin-bottom: 25px;
      width: 80%;
    }

    .user-card .user-details .user-name {
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .user-card .user-details .user-email {
      font-size: 12px;
      color: #666;
    }
    .user-card .buttons{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }

    .user-card .btn {
    
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
    }
    .user-card .btn svg{
      fill: #fff
    }
    .user-card .favorite {
    
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 10px;
      border: 2px solid dodgerblue;
      margin-bottom: 20px;
      transition: all 0.2s;
      cursor: pointer;
    }
    
    .user-card .favorite svg{
      fill: dodgerblue
    }
    .user-card .favorite:hover svg{
      fill: red
    }
    .user-card .favorite.select-favorite  {
      border: 2px solid red;      
    }
    .user-card .favorite.select-favorite svg {      
      fill: red
    }

    .user-card .btn:hover, .user-card .favorite:hover {
      transform: scale(1.05);
      box-shadow: 2px 2px 5px rgba(0,0,0, 0.2);
      
    }
    .user-card.select-favorite {
      background-color: lightpink;
      
    }

    @keyframes gradient-animation {
      from {
        left: 0%;
      }
      to {
        left: 100%;
      }
    }
    `;

    static properties = {
      item: { type: Object },
      isFavorite: { type: Boolean },
    };
  
    constructor() {
      super();
      this.isFavorite = false;
    }
  
   
    handleClickFavorite() {
      this.isFavorite = !this.isFavorite;
    
      const items = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    
      const index = items.findIndex((item) => item.name === this.item.name);
    
      const updatedItem = {
        ...this.item,
        isFavorite: true,
      };
    
      if (index !== -1) {        
        items.splice(index, 1);
      } else {        
        items.push(updatedItem);
      }
          
      localStorage.setItem('favoriteItems', JSON.stringify(items));    
    
      this.dispatchEvent(
        new CustomEvent('favorite-click', {
          detail: {
            item: this.item,
            isFavorite: this.isFavorite,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
    

    
    favoriteClass() {
      return this.item.isFavorite ? 'favorite select-favorite' : 'favorite';
    }

  render() {    
    const favoriteClassd = this.favoriteClass();
    const cleanNumber = this.item.cel.replace(/\D/g, '');
    return html`

      <div class="user-card ">
        <div class="user-cover">
          <img class="user-avatar" src="${this.item.picture}" alt="User Picture" />
        </div>
        <div class="user-details">
          <div class="user-name ">${this.item.name}</div>
          <div class="user-email ">${this.item.email}</div>
          <div class="user-email ">${this.item.cel}</div>
        </div>
        <div class="buttons">
          <a class="btn" href="tel:${cleanNumber}">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"/></svg>
          </a>
          <a class="btn" href="mailto:${this.item.email}">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"/></svg>
          </a>          
          <a class="${favoriteClassd}" @click="${this.handleClickFavorite}">          
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
            </svg>
          </a>
        </div>
        
      </div>
    `;
  }
}

customElements.define('card-user', Card);
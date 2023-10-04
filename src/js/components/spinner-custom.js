import { LitElement, html, css } from 'lit';
// import { LitElement, html, css } from 'lit';

class Spinner extends LitElement {
  static styles = css`
    .spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
    }

    .spinner__animation {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 5px solid #ccc;
      border-top-color: #333;
      animation: spinner-animation 1s linear infinite;
    }

    @keyframes spinner-animation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`
      <div class="spinner">
        <div class="spinner__animation"></div>
      </div>
    `;
  }
}

customElements.define('my-spinner', Spinner);
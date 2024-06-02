import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

interface CarouselItem {
  title: string;
  color: string;
}

@customElement('my-carousel')
export class MyCarousel extends LitElement {
  @property({ type: Array, attribute: true })
  items: CarouselItem[] = [];

  @property({ type: Boolean })
  looping = false;

  @property({ type: Number })
  offset = 0;

  @property({ type: Number })
  firstIndex = 0;

  @query('#inputTitle')
  inputTitle!: HTMLInputElement;

  @query('#inputColor')
  inputColor!: HTMLInputElement;

  static override get styles() {
    return css`
      :host {
        --item-margin: 10px;
        --item-offset: 0px;
        --item-width: 150px;

        display: flex;
        flex-direction: row;
        font: normal 14px/1.4 Helvetica, Arial, sans-serif;
      }

      .btn-next,
      .btn-prev {
        background: none;
        border: 0;
        color: black;
        cursor: pointer;
        font-size: 36px;
        outline: none;
      }

      .hidden {
        visibility: hidden;
      }

      #contents {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
      }

      #carousel {
        display: flex;
        flex-direction: row;
        width: 580px;
      }

      #main {
        display: flex;
        flex-direction: column;
      }

      #add-elements-container {
        text-align: center;
      }

      #contents::after {
        background: linear-gradient(
          to right,
          #fff 0%,
          transparent 3%,
          transparent 97%,
          #fff 100%
        );
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
      }

      article {
        box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
          0 1px 3px 0 rgba(63, 63, 68, 0.15);
        box-sizing: border-box;
        flex-shrink: 0;
        margin: var(--item-margin);
        padding: 10px;
        /* width + left and right margins */
        transform: translateX(calc(-1 * var(--item-offset)));
        transition: transform 300ms;
        width: var(--item-width);
        height: 200px;
        border-radius: 10px;
      }
    `;
  }

  override attributeChangedCallback(
    name: string,
    oldVal: string,
    newVal: string
  ) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'items') {
      this.items = JSON.parse(newVal);
      this.requestUpdate();
    }
  }

  override render() {
    return html`
      <div id="main">
        <div id="carousel">
          <button class="btn-prev" @click=${() => this._move('left')}><</button>
          <div id="contents">
            ${this.items.map(
              ({ color, title }) => html`
                <article style="background-color:${color}">
                  <h3>${title}</h3>
                  <p><b>color:</b> ${color}</p>
                </article>
              `
            )}
          </div>
          <button class="btn-next" @click=${() => this._move('right')}>
            >
          </button>
        </div>
        <br /><br />
        <div id="add-elements-container">
          <label for="inputTitle">Title:</label>
          <input id="inputTitle" aria-label="Title" /><br /><br />
          <label for="inputColor">Color:</label>
          <input id="inputColor" type="color" aria-label="Color" /><br /><br />
          <button @click=${this._addElement}>Add</button>
        </div>
      </div>
    `;
  }

  _move(direction: string) {
    const container = this?.shadowRoot?.getElementById('contents');
    const styles = getComputedStyle(this);
    const itemMargin = parseFloat(styles.getPropertyValue('--item-margin'));
    const itemWidth = parseFloat(styles.getPropertyValue('--item-width'));
    const itemTotalWidth = itemWidth + 2 * itemMargin;

    if (this.looping) {
      const items = container?.querySelectorAll('article');
      const lastIndex = items!.length - 1;

      if (direction === 'left') {
        this.firstIndex =
          this.firstIndex === 0 ? lastIndex : this.firstIndex - 1;
      } else {
        this.firstIndex =
          this.firstIndex === lastIndex ? 0 : this.firstIndex + 1;
      }

      for (let i = this.firstIndex; i < items!.length; i++) {
        items![i].style.transform = `translateX(-${
          itemTotalWidth * this.firstIndex
        }px)`;
      }

      for (let i = 0; i < this.firstIndex; i++) {
        items![i].style.transform = `translateX(${
          itemTotalWidth * (items!.length - this.firstIndex)
        }px)`;
      }
    } else {
      const itemsTotalWidth = itemTotalWidth * this.items.length;
      const buffer = itemsTotalWidth - container!.clientWidth;

      if (direction === 'left') {
        this.offset =
          this.offset - itemTotalWidth >= 0 ? this.offset - itemTotalWidth : 0;
      } else {
        this.offset =
          this.offset + itemTotalWidth > buffer
            ? buffer
            : this.offset + itemTotalWidth;
      }
    }

    this.style.setProperty('--item-offset', `${this.offset}px`);
  }

  _addElement() {
    this.items = [
      ...this.items,
      { title: this.inputTitle.value, color: this.inputColor.value },
    ];
    this.inputTitle.value = '';
    this.inputColor.value = '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-carousel': MyCarousel;
  }
}

import {createElement} from "../util";

export const getFilmsTemplate = () => `<section class="films"></section>`;

export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

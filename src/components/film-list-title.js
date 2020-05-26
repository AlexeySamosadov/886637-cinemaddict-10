import {createElement} from "../util";

const getFilmsTitleTemplate = () => `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;

export default class FilmsListTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getFilmsTitleTemplate();
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

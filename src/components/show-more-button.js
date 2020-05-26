import AbstractComponent from "./abstract-component";

const getShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return getShowMoreButtonTemplate();
  }

  setClickButtonHandler(handler) {
    this._element.addEventListener(`click`, handler);
  }
}

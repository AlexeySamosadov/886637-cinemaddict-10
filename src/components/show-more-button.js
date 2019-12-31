import AbstractComponent from "./abstract-component";

export const getShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return getShowMoreButtonTemplate();
  }
}

import AbstractComponent from "./abstract-component";

const getFilmsTitleTemplate = () => `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;

export default class FilmsListTitle extends AbstractComponent {
  getTemplate() {
    return getFilmsTitleTemplate();
  }
}

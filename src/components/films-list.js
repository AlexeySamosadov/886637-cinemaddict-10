import AbstractComponent from "./abstract-component";

export const getFilmsListTemplate = () => {
  return (
    `<section class="films-list">
    </section>`
  );
};


export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return getFilmsListTemplate();
  }
}

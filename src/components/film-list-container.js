import AbstractComponent from "./abstract-component";

const getFilmsListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};


export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return getFilmsListContainerTemplate();
  }
}

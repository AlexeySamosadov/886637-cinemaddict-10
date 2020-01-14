import AbstractComponent from "./abstract-component";

const getFilmsTemplate = () => `<section class="films"></section>`;

export default class Films extends AbstractComponent {
  getTemplate() {
    return getFilmsTemplate();
  }
}

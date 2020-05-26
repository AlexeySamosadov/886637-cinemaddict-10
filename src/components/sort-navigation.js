import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const getSortNavigationTemplate = (TypeOfSort) => {
  const sortType = Object.values(TypeOfSort);
  return `<ul class="sort">
    ${
  [...sortType]
    .map((sortElement) => (
      `<li><a href="#" data-sort-type ="${sortElement}" class="sort__button ">Sort by ${sortElement}</a></li>`
    )).join(`\n`)
}
  </ul>`;
};

export default class SortNavigation extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;

    this.save = null;
  }
  getTemplate() {
    return getSortNavigationTemplate(SortType);
  }

  setSortTypeHandler(handler) {
    this._element.addEventListener(`click`, (evt)=>{
      evt.preventDefault();
      if (this.save && this.save !== evt.target) {
        this.save.classList.remove(`sort__button--active`);
      }
      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }
      this._currentSortType = sortType;
      handler(this._currentSortType);
      evt.target.classList.add(`sort__button--active`);
      this.save = evt.target;
    });

  }
}

import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  HUY: `pizda`,
};

export const getSortNavigationTemplate = (TypeOfSort) => {
  const sortType = Object.values(TypeOfSort);
  return `<ul class="sort">
    ${
  [...sortType]
    .map((sortElement) => (
      `<li><a href="#" data-sort-type ="${sortElement}" class="sort__button sort__button--active">Sort by ${sortElement}</a></li>`
    )).join(`\n`)
}
  </ul>`;
};


export default class SortNavigation extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return getSortNavigationTemplate(SortType);
  }

  setSortTypeHandler(handler) {
    this._element.addEventListener(`click`, (evt)=>{
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }
      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const getSortNavigationTemplate = (typeOfSorting) => {
  typeOfSorting = Object.values(typeOfSorting);
  return (`<ul class="sort">
    <li><a href="#" data-sort-type ="${typeOfSorting[0]}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type ="${typeOfSorting[1]}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type ="${typeOfSorting[2]}" class="sort__button">Sort by rating</a></li>
  </ul>`);
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

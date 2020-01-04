import AbstractComponent from "./abstract-component";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};

export const getSortNavigationTemplate = () => {
  return (`<ul class="sort">
    <li><a href="#" data-sort-type ="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type ="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type ="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`);
};


export default class SortNavigation extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return getSortNavigationTemplate();
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

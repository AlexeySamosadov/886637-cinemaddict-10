import AbstractComponent from "./abstract-component";

// const getMainNavigationTemplate = (filters) => {
//   console.log(`filters`,filters);
//   return (`<nav class="main-navigation">
//     <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
//     <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
//     <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
//     <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
//     <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
//   </nav>`);
// };

export const getMainNavigationTemplate = (filters) => {
  const filerTypeType = Object.values(filters);
  return `<nav class="main-navigation">
    ${
  [...filerTypeType]
      .map((filterElement) => {
        const {name, count, active} = filterElement;
        return (`<a href="#${
          name === `All movies` ? name.toLowerCase().substring(3, 0) : name.toLowerCase()
        }" class="main-navigation__item ${active ? `main-navigation__item--active` : ``}
          ${name === `Stats` ? `main-navigation__item--additional` : ``}">${name} ${count}</a>`);
      }).join(`\n`)
}
  </nav>`;
};


export default class MainNavigation extends AbstractComponent {
  constructor(filters) {
    super();
    this.statsElement = null;
    this._filters = filters;
  }
  getTemplate() {
    return getMainNavigationTemplate(this._filters);
  }

  setClickStatsHandler(handler) {
    this.statsElement = this.getElement().querySelector(`.main-navigation__item--additional`);
    this.statsElement.addEventListener(`click`, handler);
  }

  setClickMainNavigationHandler(handler) {
    this.getElement().addEventListener(`click`, (evt)=> {
      if (evt.target === this.statsElement) {
        return;
      }
      handler();
    });
  }
}

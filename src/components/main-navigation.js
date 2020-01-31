import AbstractComponent from "./abstract-component";

export const getMainNavigationTemplate = (filters) => {
  const filerTypeType = Object.values(filters);
  return `<nav class="main-navigation">
    ${[...filerTypeType]
      .map((filterElement) => {
        const {name, count, active} = filterElement;
        return (`<a href="#${name === `All movies` ? name.toLowerCase().substring(3, 0) : name.toLowerCase()}"
                    class="main-navigation__item ${active ? `main-navigation__item--active` : ``}
                        ${name === `Stats` ? `main-navigation__item--additional` : ``}">
                    ${name} ${(name === `All movies` || name === `Stats`) ? `` : `<span class="main-navigation__item-count">${count}</span>`}
                </a>`);
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

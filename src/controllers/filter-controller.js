import {render, replaceComponentElement} from '../util/render';
import {FilterType} from "../const";
import MainNavigationComponent from '../components/main-navigation.js';
import StatisticComponent from "../components/statistic";
import {getMoviesByFilter} from "../util/navigation-filer";

const WATCHED_FILM_NUMBER = 27;

export default class FilterController {
  constructor(container, moviesModel, pageController) {
    this.container = container;
    this.moviesModel = moviesModel;
    this._activeFilterType = FilterType.AllMOVIES;
    this.statisticElement = null;
    this.mainNavigationElement = null;
    this.mainNavigationComponent = null;
    this.pageController = pageController;
    this._onDataChange = this._onDataChange.bind(this);
  }
  render() {
    const allTasks = this.moviesModel.getAllMovies();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allTasks, filterType).length,
        active: filterType === this._activeFilterType,
      };
    });


    const oldComponent = this.mainNavigationComponent;

    this.mainNavigationComponent = new MainNavigationComponent(filters);
    this.mainNavigationElement = this.mainNavigationComponent.getElement();
    this.mainNavigationComponent.setClickMainNavigationHandler(this.onNavigationClick.bind(this));
    this.mainNavigationComponent.setClickStatsHandler(this.renderStatistic.bind(this));
    if (oldComponent) {
      replaceComponentElement(this.mainNavigationComponent, oldComponent);
    } else {
      render(this.container, this.mainNavigationElement);
    }
  }

  renderStatistic() {
    if (!this.statisticElement) {
      const mainNavigation = this.container.querySelector(`.main-navigation`);
      const statisticComponent = new StatisticComponent(WATCHED_FILM_NUMBER);
      this.statisticElement = statisticComponent.getElement();
      render(mainNavigation, this.statisticElement, `afterend`);
      statisticComponent.setCharts();
      this.pageController.removeFilmList();
      document.querySelector(`.films`).setAttribute(`style`, `display: none;`);
      document.querySelector(`.sort`).setAttribute(`style`, `display: none;`);
    }
  }

  onNavigationClick(evt) {
    this._onFilterChange(evt.target.dataset.nav);
    this.removeStatistic();
  }

  removeStatistic() {
    if (this.statisticElement) {
      this.statisticElement.remove();
      this.statisticElement = null;
      document.querySelector(`.films`).removeAttribute(`style`);
      document.querySelector(`.sort`).removeAttribute(`style`);
    }
  }

  _onFilterChange(filterType) {
    this.moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this._onDataChange();
  }

  _onDataChange() {
    this.render();
  }
}

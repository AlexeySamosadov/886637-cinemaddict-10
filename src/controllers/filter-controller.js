import {render, RenderPosition} from '../util/render';
import {FilterType} from "../const";
import MainNavigationComponent from '../components/main-navigation.js';
import StatisticComponent from "../components/statistic";

export default class FilterController {
  constructor(container, moviesModel) {
    this.container = container;
    this.moviesModel = moviesModel;
    this._activeFilterType = FilterType.All_MOVIES;
    this.statisticElement = null;

  }
  render() {
    // const allTasks = this.moviesModel.getAllMovies();
    const filters = Object.values(FilterType).map((filterType)=>{
      return {
        name: filterType,
        count: Math.random().toFixed(2),
        active: filterType === this._activeFilterType,
      };
    });
    const mainNavigationComponent = new MainNavigationComponent(filters);
    const mainNavigationElement = mainNavigationComponent.getElement();

    render(this.container, mainNavigationElement);

    mainNavigationComponent.setClickMainNavigationHandler(this.removeStatistic.bind(this));
    mainNavigationComponent.setClickStatsHandler(this.renderStatistic.bind(this));

  }

  renderStatistic() {
    if (!this.statisticElement) {
      const mainNavigation = this.container.querySelector(`.main-navigation`);
      const WATCHED_FILM_NUMBER = 27;
      this.statisticElement = new StatisticComponent(WATCHED_FILM_NUMBER).getElement();
      render(mainNavigation, this.statisticElement, RenderPosition.AFTEREND);
    }
  }

  removeStatistic() {
    if (this.statisticElement) {
      this.statisticElement.remove();
      this.statisticElement = null;
    }
  }
}

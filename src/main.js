import {render} from './util/render';
import ProfileRatingComponent from './components/profile-raiting.js';
import MainNavigationComponent from './components/main-navigation.js';
import StatisticComponent from "./components/statistic";
import PageController from "./controllers/page-controller";

const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileRatingComponent().getElement());

const mainElement = document.querySelector(`.main`);

const mainNavigationElement = new MainNavigationComponent().getElement();
render(mainElement, mainNavigationElement);
render(mainElement, new StatisticComponent(22).getElement());

const pageController = new PageController();
pageController.renderFilmList();



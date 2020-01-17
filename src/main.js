import {render} from './util/render';
import ProfileRatingComponent from './components/profile-raiting.js';
import MainNavigationComponent from './components/main-navigation.js';
import StatisticComponent from "./components/statistic";
import PageController from "./controllers/page-controller";
import {generateFilmCardsData} from "./mock/film";

const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileRatingComponent().getElement());
const filmsData = generateFilmCardsData(22);

const mainElement = document.querySelector(`.main`);
const mainNavigationElement = new MainNavigationComponent().getElement();
render(mainElement, mainNavigationElement);
const WATCHED_FILM_NUMBER = 27;
render(mainElement, new StatisticComponent(WATCHED_FILM_NUMBER).getElement());

const pageController = new PageController();
pageController.renderFilmList(filmsData);



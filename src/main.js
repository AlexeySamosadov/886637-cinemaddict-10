import {render} from './util/render';
import ProfileRatingComponent from './components/profile-raiting.js';
import PageController from "./controllers/page-controller";
import {generateFilmCardsData} from "./mock/film";
import Movies from "./models/movies";
import FilterController from "./controllers/filter-controller";

const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileRatingComponent().getElement());
const filmsData = generateFilmCardsData(22);
const moviesModel = new Movies();
moviesModel.setMovies(filmsData);

const mainElement = document.querySelector(`.main`);
const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const pageController = new PageController(moviesModel);
pageController.renderFilmList();



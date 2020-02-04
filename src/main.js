import API from "./api";
import {render} from './util/render';
import ProfileRatingComponent from './components/profile-raiting.js';
import PageController from "./controllers/page-controller";
import {generateFilmCardsData} from "./mock/film";
import Movies from "./models/movies";
import FilterController from "./controllers/filter-controller";

// const AUTHORIZATION = `Basic kTy9gIdsz2317rD`;
// const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
// const api = new API(AUTHORIZATION, END_POINT);

const filmsData = generateFilmCardsData(23);
const moviesModel = new Movies();
moviesModel.setMovies(filmsData);

const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileRatingComponent().getElement());
const mainElement = document.querySelector(`.main`);
const pageController = new PageController(moviesModel);
const filterController = new FilterController(mainElement, moviesModel, pageController);
filterController.render();

pageController.renderFilmList();

// api.getMovies()
//   .then((movies) => {
//     console.log(movies);
//   });



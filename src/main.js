import {render} from './util.js';
import {getProfileRaiting} from './components/profile-raiting.js';
import {getMainNavigationTemplate} from './components/main-navigation.js';
import {getSortNavigationTemplate} from './components/sort-navigation.js';
import {getFilmsTemplate} from './components/films.js';
import {getFilmsListTemplate} from './components/films-list.js';
import {getFilmCardTemplate} from './components/film-card.js';
import {getFilmDetailsTemplate} from './components/film-details.js';
import {getFilmsExtraTemplate} from './components/film-extra.js';
import {getShowMoreButtonTemplate} from './components/show-more-button.js';
import {generateFilmCardsData, generateFilmCardData} from "./mock/film";
import {getStatisticTemplate} from "./components/statistic";

const filmsData = generateFilmCardsData(30);

const START_PAGE_FILMS_VISIBLE = 5;
const EXTRA_BLOCKS_QUANTITY = 2;

const headerElement = document.querySelector(`.header`);
render(headerElement, getProfileRaiting());

const mainElement = document.querySelector(`.main`);
render(mainElement, getMainNavigationTemplate());

const mainNavigationElement = mainElement.querySelector(`.main-navigation`);

render(mainNavigationElement, getStatisticTemplate(22), `afterend`);

render(mainElement, getSortNavigationTemplate());
render(mainElement, getFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, getFilmsListTemplate());

const filmsContainerElement = filmsElement.querySelector(`.films-list__container`);

let totalFilmsVisible = START_PAGE_FILMS_VISIBLE;

filmsData
  .slice(0, totalFilmsVisible)
  .forEach((filmData)=> render(filmsContainerElement, getFilmCardTemplate(filmData)));
render(filmsContainerElement, getShowMoreButtonTemplate(), `afterend`);

new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(filmsElement, getFilmsExtraTemplate()));
const extraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

const topRatedDivElement = extraBlockElements[0].querySelector(`.films-list__container`);
const topRated = filmsData
  .sort((a, b) => {
    return b.rating - a.rating;
  });

topRated
  .slice(0, EXTRA_BLOCKS_QUANTITY)
  .forEach((filmData)=> render(topRatedDivElement, getFilmCardTemplate(filmData)));

const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
mostCommentedTitleElement.textContent = `Most commented`;
const mostCommented = filmsData
  .sort((a, b) => {
    return b.commentsQuantity- a.commentsQuantity;
  });

mostCommented
  .slice(0, EXTRA_BLOCKS_QUANTITY)
  .forEach((filmData)=> render(mostCommentedDivElement, getFilmCardTemplate(filmData)));

const footerElement = document.querySelector(`.footer`);
render(footerElement, getFilmDetailsTemplate(filmsData[0]), `afterend`);
const filmDetailsElement = document.querySelector(`.film-details`);
filmDetailsElement.classList.add(`visually-hidden`);



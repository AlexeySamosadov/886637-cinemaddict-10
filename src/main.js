import {render} from './components/util.js';
import {getProfileRaiting} from './components/profile-raiting.js';
import {getMainNavigationTemplate} from './components/main-navigation.js';
import {getSortNavigationTemplate} from './components/sort-navigation.js';
import {getFilmsTemplate} from './components/films.js';
import {getFilmsListTemplate} from './components/films-list.js';
import {getFilmCardTemplate} from './components/film-card.js';
import {getFilmDetailsTemplate} from './components/film-details.js';
import {getFilmsExtraTemplate} from './components/film-extra.js';
import {getShowMoreButtonTemplate} from './components/show-more-button.js';

const FILMS_QUANTITY = 5;
const EXTRA_BLOCKS_QUANTITY = 2;


const headerElement = document.querySelector(`.header`);
render(headerElement, getProfileRaiting());

const mainElement = document.querySelector(`.main`);
render(mainElement, getMainNavigationTemplate());
render(mainElement, getSortNavigationTemplate());
render(mainElement, getFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, getFilmsListTemplate());

const filmsContainerElement = filmsElement.querySelector(`.films-list__container`);
new Array(FILMS_QUANTITY).fill(``).forEach(()=> render(filmsContainerElement, getFilmCardTemplate()));
render(filmsContainerElement, getShowMoreButtonTemplate(), `afterend`);

new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(filmsElement, getFilmsExtraTemplate()));
const extraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

const topRatedDivElement = extraBlockElements[0].querySelector(`.films-list__container`);
new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(topRatedDivElement, getFilmCardTemplate()));

const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
mostCommentedTitleElement.textContent = `Most commented`;
new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(mostCommentedDivElement, getFilmCardTemplate()));

const footerElement = document.querySelector(`.footer`);
render(footerElement, getFilmDetailsTemplate(), `afterend`);
const filmDetailsElement = document.querySelector(`.film-details`);
filmDetailsElement.classList.add(`visually-hidden`);



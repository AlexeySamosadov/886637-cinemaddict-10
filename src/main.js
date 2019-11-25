'use strict';

const FILMS_QUANTITY = 5;
const QUANTITY_EXTRA_BLOCKS = 2;

const getProfileRaiting = () => `  <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

const getMainNavigationTemplate = () => `  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;

const getSortNavigationTemplate = () => `  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

const getFilmsTemplate = () => `<section class="films"></section>`;

const getFilmsListTemplate = () => `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
    </section>`;

const getFilmeCardTemplate = () => `<article class="film-card">
          <h3 class="film-card__title">Sagebrush Trail</h3>
          <p class="film-card__rating">3.2</p>
          <p class="film-card__info">
            <span class="film-card__year">1933</span>
            <span class="film-card__duration">54m</span>
            <span class="film-card__genre">Western</span>
          </p>
          <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
          <a class="film-card__comments">89 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;

const getFilmsExtraTemplate = () => `    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
      </section>`;

const getShowMoreButtonTemplate = () => `<button class="films-list__show-more">Show more</button>`;

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteHeader = document.querySelector(`.header`);
render(siteHeader, getProfileRaiting());

const siteMain = document.querySelector(`.main`);
render(siteMain, getMainNavigationTemplate());
render(siteMain, getSortNavigationTemplate());
render(siteMain, getFilmsTemplate());

const films = siteMain.querySelector(`.films`);
render(films, getFilmsListTemplate());

const filmsContainer = films.querySelector(`.films-list__container`);
new Array(FILMS_QUANTITY).fill(``).forEach(()=> render(filmsContainer, getFilmeCardTemplate()));
render(filmsContainer, getShowMoreButtonTemplate(), `afterend`);

new Array(QUANTITY_EXTRA_BLOCKS).fill(``).forEach(()=> render(films, getFilmsExtraTemplate()));
const extraBlocks = films.querySelectorAll(`.films-list--extra`);

const TopRatedDiv = extraBlocks[0].querySelector(`.films-list__container`);
new Array(QUANTITY_EXTRA_BLOCKS).fill(``).forEach(()=> render(TopRatedDiv, getFilmeCardTemplate()));

const mostCommentedTitle = extraBlocks[1].querySelector(`.films-list__title`);
const mostCommentedDiv = extraBlocks[1].querySelector(`.films-list__container`);
mostCommentedTitle.textContent = `Most commented`;
new Array(QUANTITY_EXTRA_BLOCKS).fill(``).forEach(()=> render(mostCommentedDiv, getFilmeCardTemplate()));


import AbstractSmartComponent from "./abstract-smart-component";

const generateGenreContent = (genres) => {
  return genres
    .map((genre)=> {
      return `<span class="film-card__genre">${genre}</span>`;
    })
    .join(`\n`);
};

const getFilmCardTemplate = (filmData) => {
  const {title, rating, year, duration, genres, posterSource, description, commentsQuantity, isAddWatch, isWatched, isFavorite} = filmData;
  const genreContent = generateGenreContent(genres);

  return (`<article class="film-card">


          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            ${genreContent}
          </p>
          <img src="./images/posters/${posterSource}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsQuantity} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddWatch ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
        </article>`);
};


export default class FilmCard extends AbstractSmartComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
  }

  getTemplate() {
    return getFilmCardTemplate(this._filmData);
  }

  rerender() {
    super.rerender();
  }

  setPosterClickHandler(handler) {
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setTittleClickHandler(handler) {
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setAddWatchlistClickHandler(handler) {
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setMarkAsFavoriteClickHandler(handler) {
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}

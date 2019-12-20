import {createElement} from "../util";

const generateGenreContent = (genres) => {
  return genres
    .map((genre)=> {
      return `<span class="film-card__genre">${genre}</span>`;
    })
    .join(`\n`);
};

export const getFilmCardTemplate = (filmData) => {
  const {title, rating, year, duration, genres, posterSource, description, commentsQuantity} = filmData;
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
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`);
};


export default class FilmCard {
  constructor(filmData) {
    this._element = null;
    this._filmData = filmData;
  }

  getTemplate() {
    return getFilmCardTemplate(this._filmData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

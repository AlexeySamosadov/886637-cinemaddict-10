import FilmCardComponent from "../components/film-card";
import {render, replaceComponentElement} from "../util/render";
import FilmDetailsComponent, {generateCommentTemplate} from "../components/film-details";
import AbstractComponent from "../components/abstract-component";
import FilmDetailsRating from "../components/film-details-raiting";
import {createElement} from "../util/util";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController extends AbstractComponent {
  constructor(place, onDataChange, onViewChange) {
    super();
    this.place = place;
    this.onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this.filmData = null;
    this.filmCardComponent = null;
    this.filmDetailsComponent = null;
    this.oldFilmDetailsComponent = null;
    this.filmDetailsElement = null;
    this.footerElement = document.querySelector(`.footer`);

    this.mode = Mode.DEFAULT;

    this.closePopup = this.closePopup.bind(this);
    this.onEscPress = this.onEscPress.bind(this);
  }

  renderCard(filmData) {
    const oldFilmCardComponent = this.filmCardComponent;
    this.oldFilmDetailsComponent = this.filmDetailsComponent;

    this.filmData = filmData;
    this.filmCardComponent = new FilmCardComponent(this.filmData);

    const filmCardComponent = this.filmCardComponent;
    const filmCardElement = filmCardComponent.getElement();

    filmCardComponent.setPosterClickHandler(this.showPopup.bind(this));
    filmCardComponent.setTittleClickHandler(this.showPopup.bind(this));
    filmCardComponent.setCommentsClickHandler(this.showPopup.bind(this));

    filmCardComponent.setAddWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this.setActiveButton(evt, this.filmData.isAddWatch);
      this.filmData.isAddWatch = !this.filmData.isAddWatch;
    });

    filmCardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this.setActiveButton(evt, this.filmData.isWatched);
      this.filmData.isWatched = !this.filmData.isWatched;
    });

    filmCardComponent.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this.setActiveButton(evt, this.filmData.isFavorite);
      this.filmData.isFavorite = !this.filmData.isFavorite;
    });

    if (oldFilmCardComponent) {
      replaceComponentElement(filmCardComponent, oldFilmCardComponent);
    } else {
      render(this.place, filmCardElement);
    }
  }

  setActiveButton(evt, condition) {
    if (condition) {
      const activeButton = document.querySelector(`.film-card__controls-item--active`);
      activeButton.classList.remove(`film-card__controls-item--active`);
    } else {
      const target = evt.target;
      target.classList.add(`film-card__controls-item--active`);
    }
  }

  showPopup() {
    this.filmDetailsComponent = new FilmDetailsComponent(this.filmData);
    this.filmDetailsElement = this.filmDetailsComponent.getElement();
    render(this.footerElement, this.filmDetailsElement);


    if (this.filmData.isWatched) {
      this.renderFilmDetailRating();
    }

    this.subscribeEvents();
    this._onViewChange();
    this.mode = Mode.POPUP;
  }

  renderFilmDetailRating() {
    this.filmDetailsRatingComponent = new FilmDetailsRating();
    this.filmDetailsRatingElement = this.filmDetailsRatingComponent.getElement();
    const topContainer = this.filmDetailsElement.querySelector(`.form-details__top-container`);
    topContainer.insertAdjacentElement(`afterend`, this.filmDetailsRatingElement);
  }

  setDefaultView() {
    if (this.mode !== Mode.DEFAULT) {
      this.closePopup();
      document.removeEventListener(`keydown`, this.onEscPress);
    }
  }

  subscribeEvents() {
    this.filmDetailsComponent.setClickHandler(this.closePopup);
    this.filmDetailsComponent.setAddWatchlistClickHandler(this.addWatchHandler.bind(this));
    this.filmDetailsComponent.setMarkAsWatchedClickHandler(this.ratingHandler.bind(this));
    this.filmDetailsComponent.setMarkAsFavoriteClickHandler(this.addFavouritesHandler.bind(this));
    this.filmDetailsComponent.setDeleateCommentHandler(this.removeComment.bind(this));
    this.filmDetailsComponent.setEmotionHandler();
    this.filmDetailsComponent.setAddComment(this.addComment.bind(this));

    document.addEventListener(`keydown`, this.onEscPress);
  }

  addComment() {
    const data = this.filmDetailsComponent.getData();
    const element = createElement(generateCommentTemplate(data));
    const commentsList = this.filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);

    render(commentsList, element);
    this.filmData.comments.push(data);
    this.updateComment();
  }

  removeComment(evt) {
    evt.preventDefault();
    const id = evt.target.dataset.id;
    if (!id) {
      return;
    }
    const index = this.filmData.comments.findIndex((it) => it.commentId === id);
    if (index === -1) {
      return;
    }

    this.filmDetailsComponent.getElement().querySelector(`[data-comment="${id}"]`).remove();
    this.filmData.comments.splice(index, 1);
    this.updateComment();
  }

  updateComment() {
    this.onDataChange(this, this.filmData, Object.assign({}, this.filmData, {
      commentsQuantity: this.filmData.comments.length,
    }));
    const commentsNumber = this.filmDetailsComponent.getElement().querySelector(`.film-details__comments-count`);
    commentsNumber.textContent = String(this.filmData.commentsQuantity);
  }

  addWatchHandler() {
    this.onDataChange(this, this.filmData, Object.assign({}, this.filmData, {
      isAddWatch: !this.filmData.isAddWatch,
    }));
  }

  ratingHandler() {
    this.onDataChange(this, this.filmData, Object.assign({}, this.filmData, {
      isWatched: !this.filmData.isWatched,
    }));
    if (this.filmDetailsElement.querySelector(`.form-details__middle-container`)) {
      this.filmDetailsElement.querySelector(`.form-details__middle-container`).remove();
    }

    if (this.filmData.isWatched) {
      this.renderFilmDetailRating();
    } else {
      if (this.filmDetailsRatingComponent) {
        this.filmDetailsRatingComponent.removeElement();
        this.filmDetailsRatingElement.remove();
        this.filmData.isWatched = false;
      }
    }
  }

  addFavouritesHandler() {
    this.onDataChange(this, this.filmData, Object.assign({}, this.filmData, {
      isFavorite: !this.filmData.isFavorite,
    }));
  }

  closePopup() {
    this.footerElement.removeChild(this.filmDetailsElement);
    document.removeEventListener(`keydown`, this.onEscPress);
    this.mode = Mode.DEFAULT;
  }

  onEscPress(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this.footerElement.removeChild(this.filmDetailsElement);
      document.removeEventListener(`keydown`, this.onEscPress);
      this.mode = Mode.DEFAULT;
    }
  }
}

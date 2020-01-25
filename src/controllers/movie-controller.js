import FilmCardComponent from "../components/film-card";
import {render, replaceComponentElement} from "../util/render";
import FilmDetailsComponent from "../components/film-details";
import AbstractComponent from "../components/abstract-component";

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
    this.filmCardComponent = new FilmCardComponent(filmData);
    this.filmDetailsComponent = new FilmDetailsComponent(this.filmData);

    const filmCardComponent = this.filmCardComponent;
    const filmCardElement = filmCardComponent.getElement();

    filmCardComponent.setPosterClickHandler(this.showPopup.bind(this));
    filmCardComponent.setTittleClickHandler(this.showPopup.bind(this));
    filmCardComponent.setCommentsClickHandler(this.showPopup.bind(this));

    filmCardComponent.setAddWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this.onDataChange(this, filmData, Object.assign({}, filmData, {
        isAddWatch: !filmData.isAddWatch,
      }));
    });
    filmCardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this.onDataChange(this, filmData, Object.assign({}, filmData, {
        isWatched: !filmData.isWatched,
      }));
    });
    filmCardComponent.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this.onDataChange(this, filmData, Object.assign({}, filmData, {
        isFavorite: !filmData.isFavorite,
      }));
    });

    if (oldFilmCardComponent && this.oldFilmDetailsComponent) {
      replaceComponentElement(filmCardComponent, oldFilmCardComponent);
      replaceComponentElement(this.filmDetailsComponent, this.oldFilmDetailsComponent);
    } else {
      render(this.place, filmCardElement);
    }
  }

  showPopup() {
    this.filmDetailsElement = this.filmDetailsComponent.getElement();
    render(this.footerElement, this.filmDetailsElement);
    this.subscribeEvents();
    this._onViewChange();
    this.mode = Mode.POPUP;
  }

  setDefaultView() {
    if (this.mode !== Mode.DEFAULT) {
      this.closePopup();
      document.removeEventListener(`keydown`, this.onEscPress);
    }
  }

  subscribeEvents() {
    this.filmDetailsComponent.setClickHandler(this.closePopup);
    this.filmDetailsComponent._subscribeOnEvents();
    document.addEventListener(`keydown`, this.onEscPress);
  }

  closePopup() {
    this.footerElement.removeChild(this.filmDetailsElement);
    this.filmDetailsComponent.removeClickHandler(this.closePopup);
    document.removeEventListener(`keydown`, this.onEscPress);
    this.filmDetailsComponent.removeMarkAsWatchedClickHandler();
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

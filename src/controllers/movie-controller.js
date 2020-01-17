import FilmCardComponent from "../components/film-card";
import {render, replaceComponentElement} from "../util/render";
import FilmDetailsComponent from "../components/film-details";
import AbstractComponent from "../components/abstract-component";

export default class MovieController extends AbstractComponent {
  constructor(place, onDataChange) {
    super();
    this.place = place;
    this.onDataChange = onDataChange;
    this.filmData = null;
    this.filmCardComponent = null;
    this.filmDetailsComponent = null;
    this.oldFilmDetailsComponent = null;
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
    const footerElement = document.querySelector(`.footer`);
    const filmDetailsComponent = this.filmDetailsComponent;
    const filmDetailsElement = filmDetailsComponent.getElement();
    render(footerElement, filmDetailsElement);

    const closePopup = () => {
      footerElement.removeChild(filmDetailsElement);
      filmDetailsComponent.removeClickHandler(closePopup);
    };

    const onEscPress = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        footerElement.removeChild(filmDetailsElement);
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    const working = () => {
      console.log(`This working`);
    };

    filmDetailsComponent.setClickHandler(closePopup);

    filmDetailsComponent.setAddWatchlistClickHandler(working);
    filmDetailsComponent.setMarkAsWatchedClickHandler(working);
    filmDetailsComponent.setMarkAsFavoriteClickHandler(working);

    document.addEventListener(`keydown`, onEscPress);
  }
}

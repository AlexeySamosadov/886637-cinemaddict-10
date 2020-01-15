import FilmCardComponent from "../components/film-card";
import {render} from "../util/render";
import FilmDetailsComponent from "../components/film-details";
import AbstractComponent from "../components/abstract-component";

export default class MovieController extends AbstractComponent {
  constructor(place, filmData, onDataChange) {
    super();
    this.place = place;
    this.onDataChange = onDataChange;
    this.filmData = null;
  }

  renderCard(filmData) {
    this.filmData = filmData;
    const filmCardComponent = new FilmCardComponent(filmData);
    const filmCardElement = filmCardComponent.getElement();
    render(this.place, filmCardElement);

    filmCardComponent.setPosterClickHandler(this.showPopup.bind(this));
    filmCardComponent.setTittleClickHandler(this.showPopup.bind(this));
    filmCardComponent.setCommentsClickHandler(this.showPopup.bind(this));

    filmCardComponent.setAddWatchlistClickHandler(()=>{
      this.onDataChange(this, filmData, Object.assign({}, filmData), {

      });
      console.log(`This working`);
    });
    filmCardComponent.setMarkAsWatchedClickHandler(() =>{
      this.onDataChange(this, filmData);
      console.log(`This working`);
    });
    filmCardComponent.setMarkAsFavoriteClickHandler(()=>{
      this.onDataChange(this, filmData);
      console.log(`This working`);
    });
  }

  showPopup() {
    const footerElement = document.querySelector(`.footer`);
    const filmDetailsComponent = new FilmDetailsComponent(this.filmData);
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

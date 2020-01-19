import {render} from "../util/render";
import NoFilms from "../components/no-films";
import FilmsListTitle from "../components/film-list-title";
import FilmsListContainerComponent from "../components/film-list-container";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmsExtraComponent from "../components/film-extra";
import FilmListComponent from "../components/films-list";
import FilmsComponent from "../components/films";
import SortNavigationComponent from "../components/sort-navigation";
import {SortType} from "../components/sort-navigation";
import MovieController from "./movie-controller";


const START_PAGE_FILMS_VISIBLE = 5;
const EXTRA_BLOCKS_QUANTITY = 2;

export default class PageController {
  constructor() {
    this._filmListElement = null;
    this._filmsElement = null;
    this._filmsContainerElement = null;
    this._mainElement = document.querySelector(`.main`);
    this._sortNavigationComponent = null;
    this._renderingFilms = [];

    this._onDataChange = this._onDataChange.bind(this);

    this._totalFilmsVisible = START_PAGE_FILMS_VISIBLE;
  }

  renderFilmList(filmsData) {
    this._filmListElement = new FilmListComponent().getElement();
    this._filmsElement = new FilmsComponent().getElement();
    this._sortNavigationComponent = new SortNavigationComponent();
    this._renderingFilms = filmsData;
    this.showedFilmControllers = [];

    const mainElement = this._mainElement;
    const filmsElement = this._filmsElement;

    render(mainElement, this._sortNavigationComponent.getElement());
    render(mainElement, filmsElement);
    render(filmsElement, this._filmListElement);

    if (filmsData.length < 1) {
      render(this._filmListElement, new NoFilms().getElement());
      return;
    }

    render(this._filmListElement, new FilmsListTitle().getElement());
    this._filmsContainerElement = new FilmsListContainerComponent().getElement();
    render(this._filmListElement, this._filmsContainerElement);

    let newFilms = this.renderFilms(this._filmsContainerElement, filmsData.slice(0, this._totalFilmsVisible), this._onDataChange);
    this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);
    console.log(this.showedFilmControllers);
    this.renderShowMoreButton();

    new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(filmsElement, new FilmsExtraComponent().getElement()));
    const extraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

    const topRatedDivElement = extraBlockElements[0].querySelector(`.films-list__container`);

    const topRated = filmsData
        .sort((a, b) => {
          return b.rating - a.rating;
        });

    newFilms = this.renderFilms(topRatedDivElement, topRated.slice(0, EXTRA_BLOCKS_QUANTITY), this._onDataChange);
    this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);
    console.log(this.showedFilmControllers);

    const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
    const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
    mostCommentedTitleElement.textContent = `Most commented`;

    const mostCommented = filmsData
        .sort((a, b) => {
          return b.commentsQuantity - a.commentsQuantity;
        });

    newFilms = this.renderFilms(mostCommentedDivElement, mostCommented.slice(0, EXTRA_BLOCKS_QUANTITY), this._onDataChange);
    this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);
    console.log(this.showedFilmControllers);
    this.setSortNavigation();
  }

  renderFilms(filmsListElement, films, onDataChange, onViewChange) {
    return films.map((film)=> {
      const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
      movieController.renderCard(film);
      return movieController;
    });
  }

  renderShowMoreButton() {
    const showMoreButtonComponent = new ShowMoreButtonComponent();
    const showMoreButtonElement = showMoreButtonComponent.getElement();
    render(this._filmListElement, showMoreButtonElement);
    const CARDS_VISIBLE_BY_BUTTON = 5;
    const onShowMoreButton = () => {
      const prevShowedCards = this._totalFilmsVisible;
      this._totalFilmsVisible = this._totalFilmsVisible + CARDS_VISIBLE_BY_BUTTON;

      const newFilms = this.renderFilms(this._filmsContainerElement, this._renderingFilms.slice(prevShowedCards, this._totalFilmsVisible), this._onDataChange);
      this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);

      console.log(this.showedFilmControllers);
      if (this._totalFilmsVisible > this._renderingFilms.length) {
        showMoreButtonElement.remove();
      }
    };
    showMoreButtonComponent.setClickButtonHandler(onShowMoreButton);
  }

  setSortNavigation() {
    this._sortNavigationComponent.setSortTypeHandler((sortType) => {
      let sortedFilms = [];
      switch (sortType) {
        case SortType.DATE:
          sortedFilms = this._renderingFilms.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = this._renderingFilms.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = this._renderingFilms.slice(0, this._totalFilmsVisible);
          break;
      }
      this._filmsContainerElement.innerHTML = ``;

      this.newFilms = this.renderFilms(this._filmsContainerElement, sortedFilms.slice(0, this._totalFilmsVisible), this._onDataChange);
      this.showedFilmControllers = this.showedFilmControllers.concat(this.newFilms);
      console.log(this.showedFilmControllers);
    });
  }

  _onViewChange() {
    console.log(`Апп`,this.showedFilmControllers);
    this.showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(place, oldFilmData, newFilmData) {
    const index = this._renderingFilms.findIndex((it) => it === oldFilmData);
    if (index === -1) {
      return;
    }

    this._renderingFilms = [].concat(this._renderingFilms.slice(0, index), newFilmData, this._renderingFilms.slice(index + 1));
    place.renderCard(this._renderingFilms[index]);
  }
}

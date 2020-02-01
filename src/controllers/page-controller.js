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

export const renderFilms = (filmsListElement, films, onDataChange, onViewChange) => {
  return films.map((film)=> {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
    movieController.renderCard(film);
    return movieController;
  });
};

export default class PageController {
  constructor(moviesModel) {
    this._filmListElement = null;
    this._filmsElement = null;
    this._filmsContainerElement = null;
    this._mainElement = document.querySelector(`.main`);
    this._sortNavigationComponent = null;
    this._moviesModel = moviesModel;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._showMoreButtonElement = null;


    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._totalFilmsVisible = null;
    // this._moviesModel.setFilterChangeHandler(this._onFilterChange.bind(this));
  }

  renderFilmList() {
    this._filmListElement = new FilmListComponent().getElement();
    this._filmsElement = new FilmsComponent().getElement();
    this._sortNavigationComponent = new SortNavigationComponent();
    this._totalFilmsVisible = START_PAGE_FILMS_VISIBLE;

    this.showedFilmControllers = [];

    const mainElement = this._mainElement;
    const filmsElement = this._filmsElement;

    render(mainElement, this._sortNavigationComponent.getElement());
    render(mainElement, filmsElement);
    render(filmsElement, this._filmListElement);

    if (this._moviesModel.getMovies().length < 1) {
      render(this._filmListElement, new NoFilms().getElement());
      return;
    }

    render(this._filmListElement, new FilmsListTitle().getElement());
    this._filmsContainerElement = new FilmsListContainerComponent().getElement();
    render(this._filmListElement, this._filmsContainerElement);

    this._renderMovies(this._moviesModel.getMovies().slice(0, this._totalFilmsVisible));
    this.renderShowMoreButton();

    new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(filmsElement, new FilmsExtraComponent().getElement()));
    const extraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

    const topRatedDivElement = extraBlockElements[0].querySelector(`.films-list__container`);

    const topRated = this._moviesModel.getMovies()
        .sort((a, b) => {
          return b.rating - a.rating;
        });

    let newFilms = renderFilms(topRatedDivElement, topRated.slice(0, EXTRA_BLOCKS_QUANTITY), this._onDataChange, this._onViewChange);
    this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);

    const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
    const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
    mostCommentedTitleElement.textContent = `Most commented`;

    const mostCommented = this._moviesModel.getMovies()
        .sort((a, b) => {
          return b.commentsQuantity - a.commentsQuantity;
        });

    newFilms = renderFilms(mostCommentedDivElement, mostCommented.slice(0, EXTRA_BLOCKS_QUANTITY), this._onDataChange, this._onViewChange);
    this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);
    this.setSortNavigation();
    this._moviesModel.setFilterChangeHandler(this._onFilterChange());
  }

  _renderMovies(films) {
    const newFilms = renderFilms(this._filmsContainerElement, films, this._onDataChange, this._onViewChange);
    this.showedFilmControllers = this.showedFilmControllers.concat(newFilms);
    this._totalFilmsVisible = this.showedFilmControllers.length;

  }

  _removeMovies() {
    this._filmsContainerElement.innerHTML = ``;
    // this.showedFilmControllers.forEach((filmController) => filmController.destroy());
    this.showedFilmControllers = [];
  }

  // _updateTasks(totalFilmsVisible) {
  //   this._removeMovies();
  //   this._renderMovies(this._moviesModel.getMovies().slice(0, totalFilmsVisible));
  //   this.renderShowMoreButton();
  // }

  renderShowMoreButton() {
    if (this._totalFilmsVisible >= this._moviesModel.getMovies().length) {
      return;
    }
    if (!this._showMoreButtonElement) {
      this._showMoreButtonElement = this._showMoreButtonComponent.getElement();
      render(this._filmListElement, this._showMoreButtonElement);
    }

    const CARDS_VISIBLE_BY_BUTTON = 5;
    const onShowMoreButton = () => {
      const prevShowedCards = this._totalFilmsVisible;
      this._totalFilmsVisible = this._totalFilmsVisible + CARDS_VISIBLE_BY_BUTTON;
      this._renderMovies(this._moviesModel.getMovies().slice(prevShowedCards, this._totalFilmsVisible));
      if (this._totalFilmsVisible >= this._moviesModel.getMovies().length) {
        this._showMoreButtonElement.remove();
      }
    };
    this._showMoreButtonComponent.setClickButtonHandler(onShowMoreButton);
  }

  setSortNavigation() {
    this._sortNavigationComponent.setSortTypeHandler((sortType) => {
      let sortedFilms = [];
      switch (sortType) {
        case SortType.DATE:
          sortedFilms = this._moviesModel.getMovies().slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = this._moviesModel.getMovies().slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = this._moviesModel.getMovies().slice(0, this._totalFilmsVisible);
          break;
      }
      this._removeMovies();
      this._renderMovies(sortedFilms.slice(0, this._totalFilmsVisible));
    });
  }

  _onViewChange() {
    this.showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(place, oldFilmData, newFilmData) {
    const isSuccess = this._moviesModel.updateMovies(oldFilmData.id, newFilmData);
    if (isSuccess) {
      place.renderCard(newFilmData);
    }
  }

  // _onFilterChange() {
  //   this._updateTasks(this._totalFilmsVisible);
  // }
}

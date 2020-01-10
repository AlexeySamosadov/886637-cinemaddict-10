import {render} from "../util/render";
import NoFilms from "../components/no-films";
import FilmsListTitle from "../components/film-list-title";
import FilmsListContainerComponent from "../components/film-list-container";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import ShowMoreButtonComponent from "../components/show-more-button";
import FilmsExtraComponent from "../components/film-extra";
import {generateFilmCardsData} from "../mock/film";
import FilmListComponent from "../components/films-list";
import FilmsComponent from "../components/films";
import SortNavigationComponent from "../components/sort-navigation";
import {SortType} from "../components/sort-navigation";

const filmsData = generateFilmCardsData(22);

const START_PAGE_FILMS_VISIBLE = 5;
const EXTRA_BLOCKS_QUANTITY = 2;

export default class PageController {
  constructor() {
    this._filmListElement = null;
    this._filmsElement = null;
    this._filmsContainerElement = null;
    this._mainElement = document.querySelector(`.main`);
    this._sortNavigationComponent = null;

    this._totalFilmsVisible = START_PAGE_FILMS_VISIBLE;
  }

  renderFilmList() {
    this._filmListElement = new FilmListComponent().getElement();
    this._filmsElement = new FilmsComponent().getElement();
    this._sortNavigationComponent = new SortNavigationComponent();

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

    this.renderFilms(this._filmsContainerElement, filmsData.slice(0, this._totalFilmsVisible));

    this.renderShowMoreButton();

    new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(filmsElement, new FilmsExtraComponent().getElement()));
    const extraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

    const topRatedDivElement = extraBlockElements[0].querySelector(`.films-list__container`);

    const topRated = filmsData
        .sort((a, b) => {
          return b.rating - a.rating;
        });

    this.renderFilms(topRatedDivElement, topRated.slice(0, EXTRA_BLOCKS_QUANTITY));

    const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
    const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
    mostCommentedTitleElement.textContent = `Most commented`;

    const mostCommented = filmsData
        .sort((a, b) => {
          return b.commentsQuantity - a.commentsQuantity;
        });

    this.renderFilms(mostCommentedDivElement, mostCommented.slice(0, EXTRA_BLOCKS_QUANTITY));

    this.setSortNavigation();
  }

  renderCard(place, filmData) {
    const filmCardComponent = new FilmCardComponent(filmData);
    const filmCardElement = filmCardComponent.getElement();
    render(place, filmCardElement);

    const showPopup = () => {
      const footerElement = document.querySelector(`.footer`);
      const filmDetailsComponent = new FilmDetailsComponent(filmData);
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

      filmDetailsComponent.setClickHandler(closePopup);
      document.addEventListener(`keydown`, onEscPress);
    };

    filmCardComponent.setClickHandler(showPopup);
  }

  renderFilms(filmsListElement, films) {
    films.forEach((film)=> this.renderCard(filmsListElement, film));
  }

  renderShowMoreButton() {
    const showMoreButtonComponent = new ShowMoreButtonComponent();
    const showMoreButtonElement = showMoreButtonComponent.getElement();
    render(this._filmListElement, showMoreButtonElement);
    const CARDS_VISIBLE_BY_BUTTON = 5;
    const onShowMoreButton = () => {
      const prevShowedCards = this._totalFilmsVisible;
      this._totalFilmsVisible = this._totalFilmsVisible + CARDS_VISIBLE_BY_BUTTON;

      filmsData
        .slice(prevShowedCards, this._totalFilmsVisible)
        .forEach((filmData) => this.renderCard(this._filmsContainerElement, filmData));

      if (this._totalFilmsVisible > filmsData.length) {
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
          sortedFilms = filmsData.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = filmsData.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = filmsData.slice(0, this._totalFilmsVisible);
          break;
      }
      this._filmsContainerElement.innerHTML = ``;

      this.renderFilms(this._filmsContainerElement, sortedFilms.slice(0, this._totalFilmsVisible));
    });
  }
}

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
    this._filmListElement = new FilmListComponent().getElement();
    this._filmsElement = new FilmsComponent().getElement();
    this._mainElement = document.querySelector(`.main`);
    this._sortNavigationComponent = new SortNavigationComponent();
  }


  renderFilmList() {
    const sortNavigationComponent = this._sortNavigationComponent;
    const mainElement = this._mainElement;
    const filmListElement = this._filmListElement;
    const filmsElement = this._filmsElement;

    render(mainElement, sortNavigationComponent.getElement());

    render(mainElement, filmsElement);
    render(filmsElement, filmListElement);

    if (filmsData.length < 1) {
      render(filmListElement, new NoFilms().getElement());
      return;
    }
    render(filmListElement, new FilmsListTitle().getElement());
    const filmsContainerElement = new FilmsListContainerComponent().getElement();
    render(filmListElement, filmsContainerElement);

    let totalFilmsVisible = START_PAGE_FILMS_VISIBLE;

    const renderCard = (place, filmData) => {
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
    };
    const renderFilms = (filmsListElement, films) => {
      films.forEach((film)=> renderCard(filmsListElement, film));
    };


    renderFilms(filmsContainerElement, filmsData.slice(0, totalFilmsVisible));

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    const showMoreButtonElement = showMoreButtonComponent.getElement();
    render(filmListElement, showMoreButtonElement);

    new Array(EXTRA_BLOCKS_QUANTITY).fill(``).forEach(()=> render(filmsElement, new FilmsExtraComponent().getElement()));
    const extraBlockElements = filmsElement.querySelectorAll(`.films-list--extra`);

    const topRatedDivElement = extraBlockElements[0].querySelector(`.films-list__container`);

    const topRated = filmsData
        .sort((a, b) => {
          return b.rating - a.rating;
        });

    renderFilms(topRatedDivElement, topRated.slice(0, EXTRA_BLOCKS_QUANTITY));

    const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
    const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
    mostCommentedTitleElement.textContent = `Most commented`;

    const mostCommented = filmsData
        .sort((a, b) => {
          return b.commentsQuantity - a.commentsQuantity;
        });

    renderFilms(mostCommentedDivElement, mostCommented.slice(0, EXTRA_BLOCKS_QUANTITY));

    const CARDS_VISIBLE_BY_BUTTON = 5;

    const onShowMoreButton = () => {
      const prevShowedCards = totalFilmsVisible;
      totalFilmsVisible = totalFilmsVisible + CARDS_VISIBLE_BY_BUTTON;

      filmsData
          .slice(prevShowedCards, totalFilmsVisible)
          .forEach((filmData) => renderCard(filmsContainerElement, filmData));

      if (totalFilmsVisible > filmsData.length) {
        showMoreButtonElement.remove();
      }
    };

    showMoreButtonComponent.setClickButtonHandler(onShowMoreButton);

    sortNavigationComponent.setSortTypeHandler((sortType) => {
      let sortedFilms = [];
      switch (sortType) {
        case SortType.DATE:
          sortedFilms = filmsData.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = filmsData.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = filmsData.slice(0, totalFilmsVisible);
          break;
      }
      filmsContainerElement.innerHTML = ``;

      renderFilms(filmsContainerElement, sortedFilms.slice(0, totalFilmsVisible));
    });
  }
}

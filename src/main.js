import {render} from './util/render';
import ProfileRatingComponent from './components/profile-raiting.js';
import MainNavigationComponent from './components/main-navigation.js';
import SortNavigationComponent from './components/sort-navigation.js';
import FilmsComponent from './components/films.js';
import FilmListComponent from './components/films-list.js';
import NoFilms from "./components/no-films";
import FilmsListTitle from "./components/film-list-title";
import FilmsListContainerComponent from './components/film-list-container.js';
import FilmCardComponent from './components/film-card.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsExtraComponent from './components/film-extra.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import StatisticComponent from "./components/statistic";
import {generateFilmCardsData} from "./mock/film";

const filmsData = generateFilmCardsData(30);

const START_PAGE_FILMS_VISIBLE = 5;
const EXTRA_BLOCKS_QUANTITY = 2;

const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileRatingComponent().getElement());

const mainElement = document.querySelector(`.main`);

const mainNavigationElement = new MainNavigationComponent().getElement();
render(mainElement, mainNavigationElement);
render(mainElement, new StatisticComponent(22).getElement());
render(mainElement, new SortNavigationComponent().getElement());

const filmsElement = new FilmsComponent().getElement();
render(mainElement, filmsElement);

const filmListElement = new FilmListComponent().getElement();
render(filmsElement, filmListElement);

if (filmsData.length < 1) {
  render(filmListElement, new NoFilms().getElement());
} else {
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
      const filmDetailsComponent = new FilmDetailsComponent(filmData)
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

  filmsData
    .slice(0, totalFilmsVisible)
    .forEach((filmData)=> renderCard(filmsContainerElement, filmData));
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

  topRated
    .slice(0, EXTRA_BLOCKS_QUANTITY)
    .forEach((filmData)=> renderCard(topRatedDivElement, filmData));

  const mostCommentedTitleElement = extraBlockElements[1].querySelector(`.films-list__title`);
  const mostCommentedDivElement = extraBlockElements[1].querySelector(`.films-list__container`);
  mostCommentedTitleElement.textContent = `Most commented`;
  const mostCommented = filmsData
    .sort((a, b) => {
      return b.commentsQuantity - a.commentsQuantity;
    });

  mostCommented
    .slice(0, EXTRA_BLOCKS_QUANTITY)
    .forEach((filmData)=> renderCard(mostCommentedDivElement, filmData));

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
}



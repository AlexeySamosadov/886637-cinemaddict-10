import {getRandomItem, getRandomNumber} from "../util/util";
import AbstractSmartComponent from "./abstract-smart-component";

const generateGenreContent = (genres) => {
  return [...genres]
    .map((genre)=> {
      return `<span class="film-details__genre">${genre}</span>`;
    })
    .join(`\n`);
};

const generateCountryContent = (countries) => {
  return [...countries]
    .map((country) => {
      return `<td class="film-details__cell">${country}</td>`;
    })
    .join(`\n`);
};

const EMOJIESLINKS = [
  `smile.png`,
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
];

const COMMENTS = [
  `stupid`,
  `nice`,
  `Я плакал`,
  `Хотел бы быть как главный герой`,
  `Почему он?`,
  `Нереальная концовка`,
  `Фильм хорош, чтобы уснуть`,
];

const COMMENTATOR_NAMES = [
  `Antonio`,
  `Hyan`,
  `Genry`,
  `Sergey Talizin`,
  `Mark`,
  `Fill`,
  `Chipolino`
];


const setTimeStyle = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const generateDateTime = () => {
  const currentTime = new Date();
  const hours = setTimeStyle(currentTime.getHours() % 12);
  const minutes = setTimeStyle(currentTime.getMinutes());
  const month = setTimeStyle(currentTime.getMonth() - getRandomNumber(0, 5));
  const year = currentTime.getFullYear();
  const day = setTimeStyle(currentTime.getDate() - getRandomNumber(0, 5));

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const generateComment = () => {
  return {
    comment: getRandomItem(COMMENTS),
    commentatorName: getRandomItem(COMMENTATOR_NAMES),
    emojiLink: getRandomItem(EMOJIESLINKS),
    commentTime: generateDateTime(),
  };
};

const createComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

const generateCommentsTemplate = (count) => {
  const comments = createComments(count);
  return [...comments]
    .map((comment)=>{
      const {commentText, commentatorName, emojiLink, commentTime} = comment;
      return (
        `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emojiLink}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${commentText}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentatorName}</span>
                <span class="film-details__comment-day">${commentTime}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
      );
    })
    .join(`\n`);
};


export const getFilmDetailsTemplate = (filmData) => {
  const {title, titleDetails, rating, releaseDate, year, duration, genres, posterSource, country, description, commentsQuantity} = filmData;
  const genreContent = generateGenreContent(genres);
  const countriesContent = generateCountryContent(country);
  const filmDateProduction = `${releaseDate} ${year}`;

  const comments = generateCommentsTemplate(commentsQuantity);

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${posterSource}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${titleDetails}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Anthony Mann</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${filmDateProduction}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              ${countriesContent}
            </tr>
            <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genreContent}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

        <ul class="film-details__comments-list">
            ${comments}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`);
};


export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
  }

  getTemplate() {
    return getFilmDetailsTemplate(this._filmData);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {

    this.setAddWatchlistClickHandler();
    this.setMarkAsWatchedClickHandler();
    this.setMarkAsFavoriteClickHandler();
    this.setClickHandler();
  }

  setClickHandler(handler) {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  removeClickHandler(handler) {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, handler);
  }

  setAddWatchlistClickHandler() {
    this._element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, ()=>{
      console.log(`Работает!`);
      this.rerender();
    });
  }

  setMarkAsWatchedClickHandler() {
    this._element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, ()=>{
      console.log(`Работает!`);
      this.rerender();
    });
  }

  setMarkAsFavoriteClickHandler() {
    this._element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, ()=>{
      console.log(`Работает!`);
      this.rerender();
    });
  }
}

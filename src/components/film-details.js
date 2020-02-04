import {createElement, getRandomItem, getRandomNumber} from "../util/util";
import AbstractSmartComponent from "./abstract-smart-component";
import {formatDateFull, formatCommentTime, formatMovieDuration} from "../util/time";
import he from "he";

const COMMENTATOR_NAMES = [
  `Antonio`,
  `Hyan`,
  `Genry`,
  `Sergey Talizin`,
  `Mark`,
  `Fill`,
  `Chipolino`
];

const EMOJIES = [
  `smile`,
  `angry`,
  `puke`,
  `sleeping`,
];

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

const generateCommentsTemplate = (comments) => {
  return [...comments]
    .map((comment)=> generateCommentTemplate(comment))
    .join(`\n`);
};


const generateCommentEmotion = (emojies) => {
  return [...emojies]
    .map((emoji) => {
      return (`<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
            <label class="film-details__emoji-label" for="emoji-${emoji}">
              <img src="./images/emoji/${emoji}.png" data-emotion="${emoji}.png" width="30" height="30" alt="emoji">
            </label>`);
    })
    .join(`\n`);
};

export const generateCommentTemplate = (comment) => {
  const {commentText, commentatorName, emojiLink, commentTime, commentId} = comment;
  const saveCommentsText = he.encode(commentText);

  const clearCommentTime = formatCommentTime(commentTime);
  return (
    `<li class="film-details__comment" data-comment="${commentId}">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emojiLink}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${saveCommentsText}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentatorName}</span>
                <span class="film-details__comment-day">${clearCommentTime}</span>
                <button class="film-details__comment-delete" data-id="${commentId}">Delete</button>
              </p>
            </div>
          </li>`
  );
};

export const getFilmDetailsTemplate = (filmData) => {
  const {title, titleDetails, rating, releaseDate, duration, genres, posterSource, country, description, commentsQuantity, isAddWatch, isWatched, isFavorite, comments} = filmData;

  const formattedDuration = formatMovieDuration(duration);
  const genreContent = generateGenreContent(genres);
  const countriesContent = generateCountryContent(country);
  const filmDateProduction = formatDateFull(releaseDate);
  const commentsTemplate = generateCommentsTemplate(comments);
  const commentEmotionTemplate = generateCommentEmotion(EMOJIES);

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
              <td class="film-details__cell">${formattedDuration}</td>
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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isAddWatch ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>



    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

        <ul class="film-details__comments-list">
            ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" minlength="1" maxlength="140" name="comment" required></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${commentEmotionTemplate}
          </div>
        </div>
        <button type="submit">Отправить</button>
      </section>
    </div>
  </form>
</section>`);
};

const getEmotionImageTemplate = () => {
  return (`<img height="55" width="55"></img>`);
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this.targetSource = null;
    this.emotionImage = null;
    this.emotionContainer = null;
    this.emotion = null;
    this.emotionUrl = null;
  }

  getTemplate() {
    return getFilmDetailsTemplate(this._filmData, {
      isTest: true,
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.setEmotionHandler();
  }

  setClickHandler(handler) {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  setAddWatchlistClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
  }

  setMarkAsFavoriteClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
  }

  setDeleteCommentHandler(handler) {
    this._element.querySelector(`.film-details__comments-list`).addEventListener(`click`, handler);
  }

  setEmotionHandler() {
    this._element.querySelector(`.film-details__emoji-list`).addEventListener(`click`, (event) => {
      if (this.emotionImage) {
        this.emotionImage.remove();
      }

      const target = event.target;
      this.emotion = target.dataset.emotion;

      if (this.emotion) {
        this.targetSource = `./images/emoji/${this.emotion}`;
        this.emotionUrl = this.emotion;
        this.emotionContainer = this._element.querySelector(`.film-details__add-emoji-label`);
      }
      this.emotionImage = createElement(getEmotionImageTemplate());
      this.emotionImage.setAttribute(`src`, `${this.targetSource}`);
      this.emotionContainer.insertAdjacentElement(`afterbegin`, this.emotionImage);
    });
  }

  setAddComment(handler) {
    this._element.querySelector(`.film-details__inner`).addEventListener(`submit`, (evt)=>{
      evt.preventDefault();
      if (!this.emotionUrl) {
        return;
      }
      handler(evt);
    });
  }

  getData() {
    const form = this.getElement().querySelector(`.film-details__inner`);
    const formData = new FormData(form);
    const url = this.emotionUrl;
    return parseFormData(formData, url);
  }
}


const parseFormData = (formData, url) => {
  return {
    commentId: `id` + String(getRandomNumber(1, 99999999)),
    commentText: formData.get(`comment`),
    commentatorName: getRandomItem(COMMENTATOR_NAMES),
    emojiLink: url,
    commentTime: new Date(),
  };
};

import AbstractComponent from "./abstract-component";

const valuesType = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getFilmDetailsRatingTemplate = () => {
  return (`<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">

            ${
    [...valuesType].map((valuesElement)=>(
      `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${valuesElement}" id="rating-${valuesElement}">
              <label class="film-details__user-rating-label" for="rating-${valuesElement}">${valuesElement}</label>`
    )).join(`\n`)
    }

            </div>
          </section>
        </div>
      </section>
    </div>`);
};

export default class FilmDetailsRating extends AbstractComponent {
  getTemplate() {
    return getFilmDetailsRatingTemplate();
  }
}

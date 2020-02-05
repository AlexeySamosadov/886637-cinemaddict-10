import {getRandomItem, getRandomNumber} from "../util/util";
import {genres} from "../mock/film";
import AbstractComponent from "./abstract-component";
import Charts from "chart.js";

const filterDuration = [
  `All time`,
  `Today`,
  `Week`,
  `Month`,
  `Year`,
  `Last hour`,
];

const rangs = [
  `Параитик`,
  `Начинающий`,
  `Неплохо разбирающийся`,
  `Sci-Fighter`,
  `Сериальщик`,
  `Фильмозадрот`,
  `Консультант режисера`,
  `Режисер`,
  `Продюссер`,
];

const getFilterDurationTemplate = (filters) => {
  return [...filters]
    .map((filterElement) => (
      `<input type="radio"
            class="statistic__filters-input visually-hidden"
            name="statistic-filter" id="statistic-${filterElement}"
            value="${filterElement}"
            ${filterElement === `All time` ? `checked` : ``}>
       <label for="statistic-all-time" class="statistic__filters-label">${filterElement}</label>`
    ))
    .join(`\n`);
};

const generateDurationTemplate = (totalDuration) => {
  return (`<p class="statistic__item-text">${(totalDuration / 60).toFixed(0)}<span class="statistic__item-description">h</span> ${totalDuration % 60} <span class="statistic__item-description">m</span></p>`);
};

const getStatisticTemplate = (filteredMovies) => {
  const popularGenres = sortPopularGenres(filteredMovies);
  const lebels = popularGenres.map((item) => item[0]);
  const totalDuration = filteredMovies.reduce((acc, cur) => acc + cur.duration, 0);

  const rang = getRandomItem(rangs);
  const filters = getFilterDurationTemplate(filterDuration);
  const watchedFilmsNumber = filteredMovies.length;
  const duration = generateDurationTemplate(totalDuration);
  const genre = lebels[0];

  return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rang}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filters}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsNumber}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        ${duration}
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${genre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`);
};

const sortPopularGenres = (filteredMovies) => {
  const filmGenres = filteredMovies.map((it)=> it.genres);
  const genreses = {};
  filmGenres.forEach((arr) => arr.forEach((genre) => {
    if (!genreses[genre]) {
      genreses[genre] = 1;
    } else {
      genreses[genre] += 1;
    }
  }));
  return Object.entries(genreses)
    .sort((a, b) => b[1] - a[1])
};

const renderCharts = (filteredMovies) => {
  const popularGenres = sortPopularGenres(filteredMovies);
  const lebels = popularGenres.map((item) => item[0]);
  const quantityGenres = popularGenres.map((item) => item[1]);
  const ctx = document.querySelector(`.statistic__chart`).getContext(`2d`);
  return new Charts(ctx, {
    type: `horizontalBar`,

    // The data for our dataset
    data: {
      labels: lebels,
      datasets: [{
        label: `Statistic`,
        backgroundColor: `#ffe800`,
        borderColor: `rgb(255, 99, 132)`,
        data: quantityGenres,
      }]
    },

    // Configuration options go here
    options: {}
  });
};


export default class Statistic extends AbstractComponent {
  constructor(filteredMovies, watchedFilmsQuantity) {
    super();
    this._watchedFilmsQuantity = watchedFilmsQuantity;
    this._filteredMovies = filteredMovies;
  }
  getTemplate() {
    return getStatisticTemplate(this._filteredMovies);
  }

  setCharts() {
    renderCharts(this._filteredMovies);
  }
}

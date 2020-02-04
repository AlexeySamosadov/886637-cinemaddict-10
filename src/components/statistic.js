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

const generateDurationTemplate = (min, max) => {
  const minutes = getRandomNumber(min, max);
  return (`<p class="statistic__item-text">${(minutes / 60).toFixed(0)}<span class="statistic__item-description">h</span> ${minutes % 60} <span class="statistic__item-description">m</span></p>`);
};

const getStatisticTemplate = (filteredMovies) => {
  // console.log(`filteredMovies`, filteredMovies);

  const totalDuration = filteredMovies.reduce((acc, cur) => acc + cur.duration, 0);
  // console.log(`dvddfbbg`, totalDuration);

  const rang = getRandomItem(rangs);
  const filters = getFilterDurationTemplate(filterDuration);
  const watchedFilmsNumber = filteredMovies.length;
  const duration = generateDurationTemplate(100, 1000);
  const genre = getRandomItem(genres);

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


const renderCharts = (filteredMovies) =>{
  const filmGenres = filteredMovies.map((it)=> it.genres);
  // console.log(`filmGenres`, filmGenres);
  const genreses = {};
  filmGenres.forEach(arr => arr.forEach(genre => {
    if (!genreses[genre]) {
      genreses[genre] = 1;
    } else {
      genreses[genre] += 1;
    }
  }));
  const sortFilmGenres = Object.entries(genreses).sort((a, b) => b[1] - a[1])

  console.log(sortFilmGenres)
  const ctx = document.querySelector(`.statistic__chart`).getContext(`2d`);
  return new Charts(ctx, {
    type: `horizontalBar`,

    // The data for our dataset
    data: {
      labels: [`Ужасы`, `Фантастика`, `Мелодраммы`, `Приключения`, `Спорт`, `Комедия`, `Детектив`],
      datasets: [{
        label: `Statistic`,
        backgroundColor: `#ffe800`,
        borderColor: `rgb(255, 99, 132)`,
        data: [30, 10, 5, 2, 20, 30, 11]
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

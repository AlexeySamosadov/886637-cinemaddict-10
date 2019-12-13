import {getRandomNumber, getRandomDuration, getRandomArray, getRandomItem} from "../util";

const filmNames = [
  `Полет над гнездом кукушки`,
  `Гайвер`,
  `Назад в будущее`,
  `От заката до рассвета`,
  `Бэтмен`,
  `Мстители`,
  `Хитмен`,
  `Хенкок`,
  `Алладин`,
  `Матрица`,
  `Шрек`,
  `Тимон и Пумба`,
  `Угнать за 60 секунд`,
  `Терминатор`,
  `Американский пирог 2`,
];

const nameDetails = [
  `Интересноая комедия`,
  `Космическая Сага`,
  `Романтическая история ужасов`,
  `Фильм о хороших буднях`,
  `Фильм для воспитания терористов`,
];

const descriptionFilms = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const countries = [
  `Russia`,
  `Inida`,
  `China`,
  `France`,
  `Italy`,
  `Germany`,
  `Tynise`,
  `Turkey`,
  `Great Britain`,
  `Argentina`,
  `Brazilia`,
];

const genres = [
  `feature film`,
  `short film`,
  `action`,
  `adventure`,
  `comedy`,
  `drama`,
  `crime`,
  `horror`,
  `fantasy`,
  `romance`,
  `thriller`,
  `animation`,
  `family`,
  `war`,
  `documentary`,
  `musical`,
  `biography`,
  `sci-fi`,
  `western`,
  `post-apocalyptic`,
];

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];


const button = document.querySelector('.decoder__points');
const reload = window.location.reload;
const start = () => {
  if(button.textContent.toLowerCase() === 'старт') {
    button.click();
    setTimeout(reload, 20000);
  }
};

setInterval(start, 4000);

const getRandomRating = (minNumber, maxNumber) => {
  return (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(2);
};

const gerRandomDate = (mounts) => {
  return `${getRandomNumber(1, 30)} ${getRandomItem(mounts)}`;
};


const generateFilmCardData = () => {
  return {
    title: getRandomItem(filmNames),
    rating: getRandomRating(3, 10),
    year: getRandomNumber(1900, 2020),
    duration: getRandomDuration(70, 150),
    genres: getRandomArray(genres, 5),
    posterSource: getRandomItem(posters),
    description: getRandomArray(descriptionFilms, 3).join(` `),
    commentsQuantity: getRandomNumber(0, 99),
    titleDetails: getRandomItem(nameDetails),
    releaseDate: gerRandomDate(months),
    country: getRandomArray(countries, 3),
  };
};

const generateFilmCardsData = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCardData);
};

export {generateFilmCardData, generateFilmCardsData, genres};

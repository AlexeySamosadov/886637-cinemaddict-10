import {getRandomNumber, getRandomDuration, getRandomArray, getRandomItem} from "../util/util";

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

const getRandomRating = (minNumber, maxNumber) => {
  return (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(2);
};

const getRandomFullDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  targetDate.setMinutes(targetDate.getMinutes() + sign * getRandomNumber(0, 9999999));
  return targetDate;
};

const generateFilmCardData = () => {
  return {
    title: getRandomItem(filmNames),
    rating: getRandomRating(3, 10),
    duration: getRandomDuration(70, 150),
    genres: getRandomArray(genres, 5),
    posterSource: getRandomItem(posters),
    description: getRandomArray(descriptionFilms, 3).join(` `),
    commentsQuantity: getRandomNumber(0, 15),
    titleDetails: getRandomItem(nameDetails),
    releaseDate: getRandomFullDate(),
    country: getRandomArray(countries, 3),
    isAddWatch: false,
    isWatched: false,
    isFavorite: false,
  };
};

const generateFilmCardsData = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCardData);
};

export {generateFilmCardData, generateFilmCardsData, genres, getRandomFullDate};

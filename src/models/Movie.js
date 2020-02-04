import {getRandomArray, getRandomDuration, getRandomItem} from "../util/util";
import {genres, getRandomFullDate} from "../mock/film";

export default class Movie {
  constructor(data) {
    this.title = data[`id`];
    this.comments = new Set(data[`comments`] || []);

  }
}


  // id: String(Math.random() + Math.random()),
  // title: getRandomItem(filmNames),
  // rating: getRandomRating(3, 10),
  // duration: getRandomDuration(70, 150),
  // genres: getRandomArray(genres, 5),
  // posterSource: getRandomItem(posters),
  // description: getRandomArray(descriptionFilms, 3).join(` `),
  // commentsQuantity: getComments.length,
  // titleDetails: getRandomItem(nameDetails),
  // releaseDate: getRandomFullDate(),
  // country: getRandomArray(countries, 3),
  // isAddWatch: Math.random() > 0.5,
  // isWatched: Math.random() > 0.5,
  // isFavorite: Math.random() > 0.5,
  // comments: getComments,

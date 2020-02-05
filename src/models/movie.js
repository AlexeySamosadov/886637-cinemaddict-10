import {getRandomNumber} from "../util/util";

export default class Movie {
  constructor(data) {
    //console.log(`data contructor`, data);
    this.id = data.id;
    this.comments = null;
    // this.title = null;
    // this.rating = null;
    // this.duration = null;
    // this.genres = null;
    // this.posterSource = null;
    // this.description = null;
    // this.commentsQuantity = null;
    // this.titleDetails = null;
    // this.releaseDate = null;
    // this.country = null;
    // this.isAddWatch = null;
    // this.isWatched = Math.random() > 0.5;
    // this.isFavorite = Math.random() > 0.5;
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
    };
  }

  static parseMovie(data) {
    //console.log('data123', data);

    const comments = fetch('https://htmlacademy-es-10.appspot.com/cinemaddict/comments/?movieId: 1', {authorization: "Basic eo0w590ik29889a"})
      .then(response => response.json())
      .then(res => console.log('res', res))

    console.log('ç12312312', comments)


    return new Movie(data);
  }

  static parseMovies(movies) {
    return movies.map((movie) => Movie.parseMovie(movie));
  }

  static clone(data) {
    return new Movie(data.toRAW());
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

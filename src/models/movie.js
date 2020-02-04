export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = new Set(data[`comments`] || []);
    this.title = getRandomItem(filmNames);
    this.rating = getRandomRating(3, 10);
    this.duration = getRandomDuration(70, 150);
    this.genres = getRandomArray(genres, 5);
    this.posterSource = getRandomItem(posters);
    this.description = getRandomArray(descriptionFilms, 3).join(` `);
    this.commentsQuantity = getComments.length;
    this.titleDetails = getRandomItem(nameDetails);
    this.releaseDate = getRandomFullDate();
    this.country = getRandomArray(countries, 3);
    this.isAddWatch = Math.random() > 0.5;
    this.isWatched = Math.random() > 0.5;
    this.isFavorite = Math.random() > 0.5;
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie());
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

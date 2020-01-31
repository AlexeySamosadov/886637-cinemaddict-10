import {FilterType} from "../const";

export default class Movies {
  constructor() {
    this._filmsData = [];
    this._activeFilterType = FilterType.All_MOVIES;

  }

  setMovies(filmData) {
    this._filmsData = [...filmData];
  }

  getMovies() {
    return this._filmsData;
  }

  getAllMovies() {
    return this._filmsData;
  }

  updateMovies(id, filmData) {
    const index = this._filmsData.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    const filmsData = [...this._filmsData];
    filmsData.splice(index, 1, filmData);
    this._filmsData = filmsData;
    // console.log(`updateMovies`, this._filmsData);
    return true;
  }
}

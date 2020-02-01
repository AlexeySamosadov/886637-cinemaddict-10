import {FilterType} from "../const";
import {getMoviesByFilter} from "../util/navigation-filer";

export default class Movies {
  constructor() {
    this._filmsData = [];
    this._activeFilterType = FilterType.AllMOVIES;
    this._filterChangeHandlers = [];
  }

  setMovies(filmData) {
    this._filmsData = [...filmData];
  }

  getMovies() {
    return getMoviesByFilter(this._filmsData, this._activeFilterType);
  }

  getAllMovies() {
    return this._filmsData;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
    console.log(this._filterChangeHandlers[0]);
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

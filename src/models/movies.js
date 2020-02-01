import {FilterType} from "../const";
import {getMoviesByFilter} from "../util/navigation-filer";

export default class Movies {
  constructor() {
    this._filmsData = [];
    this._activeFilterType = FilterType.AllMOVIES;
    this._filterChangeHandlers = [];
    this._filteredData = null;
    this._updateController = [];
  }

  setMovies(filmData) {
    this._filmsData = [...filmData];
  }

  getMovies() {
    this._filteredData = getMoviesByFilter(this._filmsData, this._activeFilterType);
    return this._filteredData;
  }

  getAllMovies() {
    return this._filmsData;
  }

  setFilter(filterType) {
    console.log(`this._updateController`, this._updateController);
    this._activeFilterType = filterType;
    // this._updateController.forEach((handler)=> handler());
  }

  setFilterChangeHandler(handler) {
    console.log(`handler hyi`, handler);
    // this._updateController.push(handler);

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

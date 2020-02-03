import {FilterType} from "../const";

const getWatchlist = (filmsData) => {
  return filmsData.filter((filmData)=> filmData.isAddWatch);
};

const getHistory = (filmsData) => {
  return filmsData.filter((filmData)=> filmData.isWatched);
};

const getFavourites = (filmsData) => {
  return filmsData.filter((filmData)=> filmData.isFavorite);
};

export const getMoviesByFilter = (filmsData, filterType) => {
  switch (filterType) {
    case FilterType.AllMOVIES:
      return filmsData;
    case FilterType.WATCHLIST:
      return getWatchlist(filmsData);
    case FilterType.HISTORY:
      return getHistory(filmsData);
    case FilterType.FAVORITES:
      return getFavourites(filmsData);
    case FilterType.STATS:
      return filmsData;
  }
  return filmsData;
};

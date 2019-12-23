
export const sortTopRated = (filmsData) => {
  return filmsData
    .sort((a, b) => {
      return b.rating - a.rating;
    });
};


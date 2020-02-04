import moment from 'moment';

const formatCommentTime = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:MM`);
};

const formatMovieDuration = (movieDuration) => {
  return `${(movieDuration / 60).toFixed(0)}h ${movieDuration % 60}min`;
};

const formatDateFull = (date) => {
  return moment(date).format(`DD MM YYYY`);
};

const formatDateToYear = (date) => {
  return moment(date).format(`YYYY`);
};

export {formatCommentTime, formatMovieDuration, formatDateFull, formatDateToYear};

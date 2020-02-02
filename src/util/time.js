import moment from 'moment';

const formatCommentTime = (date) => {
  return moment(date).format(`YYYY/MM/DD HH:MM`);
};

const formatDateFull = (date) => {
  return moment(date).format(`DD MM YYYY`);
};

const formatDateToYear = (date) => {
  return moment(date).format(`YYYY`);
};

export {formatCommentTime, formatDateFull, formatDateToYear};

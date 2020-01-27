import moment from 'moment';

const formatCommentTime = (date) => {
  return moment(date).format(`hh:mm DD MMMM YYYY`);
};

const formatDateFull = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatDateToYear = (date) => {
  return moment(date).format(`YYYY`);
};

export {formatCommentTime, formatDateFull, formatDateToYear};

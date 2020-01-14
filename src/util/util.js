const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


const getRandomNumber = function (minNumber, maxNumber) {
  return arguments.length === 2 ? Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber) : Math.round(Math.random() * minNumber);
};

const getRandomDuration = (min, max) => {
  const minutes = getRandomNumber(min, max);
  return `${(minutes / 60).toFixed(0)}h ${minutes % 60}min`;
};

const getRandomArray = (array, maxLength) => {
  const maxTimes = getRandomNumber(1, maxLength);
  let newArray = [];
  for (let i = 0; i < maxTimes; i++) {
    newArray.push(array[getRandomNumber(0, array.length - 1)]);
  }
  return newArray;
};

const getRandomItem = (array) => {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
};

export {createElement, getRandomNumber, getRandomDuration, getRandomArray, getRandomItem};



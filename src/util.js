const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const getRandomNumber = function (minNumber, maxNumber) {
  if (arguments.length > 2) {
    return 0;
  } else if (arguments.length === 2) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  } else if (arguments.length === 1) {
    return Math.round(Math.random() * minNumber);
  } else {
    return Math.round(Math.random());
  }
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

export {render, getRandomNumber, getRandomDuration, getRandomArray, getRandomItem};

'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  const newArray = [...someArray];
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [newArray[i], newArray[randomPosition]] = [newArray[randomPosition], newArray[i]];
  }

  return newArray;
};

module.exports = {getRandomInt, shuffle};

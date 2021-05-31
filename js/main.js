const getRandomIntInclusive = function (min, max) {
  // Функция взята с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  if (min >= 0 && max >= 0 && min !== max && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  return('Введите верные значения диапазона');
};

getRandomIntInclusive(0, 30);

const getRandomDecInclusive = function (min, max, length) {
  // Функция взята с https://learn.javascript.ru/task/random-min-max
  if (min >= 0 && max >= 0 && min !== max && min < max) {
    return (min + Math.random() * (max - min)).toFixed(length);
  }
  return('Введите верные значения диапазона');
};

getRandomDecInclusive(0, 30, 2);

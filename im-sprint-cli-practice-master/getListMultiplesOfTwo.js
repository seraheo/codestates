const { range } = require('range'); // range 모듈을 불러옵니다

function getListMultiplesOfTwo(upTo) {
  // TODO
  const result = range(2, upTo + 2, 2);
  return result;
}

module.exports = getListMultiplesOfTwo;
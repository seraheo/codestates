const arr1 = [1, 2, 3, 7];
const sum1 = arr1.reduce(function(prev, curr, idx, origin) {
  return prev + curr;
}, 10)
console.log(sum1);

const sum2 = arr1.reduce(function(prev, curr) {
  console.log(prev);
  console.log(curr);
  return [...prev, prev[prev.length - 1] + curr];
}, [0]);
console.log(sum2)
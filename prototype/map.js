const arr = [1, "2", "three", 7];
const mappedArr = arr.map(function(element, index, origin) {
  console.log("element: ", element)
  console.log("index: ", index)
  console.log("origin: ", origin)
  return element + 1;
})
console.log(mappedArr);

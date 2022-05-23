const arr = [1, "2", "three", 7];
const filteredArr = arr.filter(function(element, index, origin) {
  console.log("element: ", element)
  console.log("index: ", index)
  console.log("origin: ", origin)
  return typeof element === "number";
})
console.log(filteredArr);


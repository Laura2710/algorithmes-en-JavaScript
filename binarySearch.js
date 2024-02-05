const tableau = [1, 2, 3, 4, 5];
const target = 3;

function binarySearch(arr, target) {
  if (arr.length > 0) { 
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle); 

    if (target === arr[middle]) {
      return target + " se trouve à l'index " + middle;
    } else {
      if (target < arr[middle]) {
        return binarySearch(left, target);
      } else {
        return binarySearch(right, target);
      }
    }
  }
  return false; 
}

console.log(binarySearch(tableau, target));

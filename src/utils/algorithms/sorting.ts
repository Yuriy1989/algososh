import { checkedRadio } from "../../types/types";

export const sortingArray = (arr: Array<number>, typeSorting: checkedRadio, minmax: string): Array<number> => {

  let newArr: Array<number> = [];
  if (typeSorting === checkedRadio.Choice) {
    newArr = choiceMin(arr, minmax);
  } else {
    newArr = bubbleMin(arr, minmax);
  }
  return newArr;
}

const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

const bubbleMin = (arr: Array<number>, minmax: string): Array<number>=> {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if(minmax === "По возрастанию") {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      } else {
        if (arr[i] < arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
  }
  return arr;
}

const choiceMin = (arr: Array<number>, minmax: string): Array<number> => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i+1; j < length; j++) {
      if(minmax === "По возрастанию") {
        if(arr[maxInd] < arr[j]) {
          console.log("arr", arr, "arr length =", length, "maxInd = ", maxInd, "arr[maxInd] = ", arr[maxInd], "arr[j] = ", arr[j]);
          maxInd=j;
        }
      } else {
        if(arr[maxInd] > arr[j]) {
          console.log("arr", arr, "arr length =", length, "maxInd = ", maxInd, "arr[maxInd] = ", arr[maxInd], "arr[j] = ", arr[j]);
          maxInd=j;
        }
      }
    }
    if(maxInd != i){
      swap(arr, maxInd, i);
    }
  }
  return arr;
}

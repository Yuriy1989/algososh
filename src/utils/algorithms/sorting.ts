import { checkedRadio, IStepsSorting } from "../../types/types";

export const sortingArray = (arr: Array<number>, typeSorting: checkedRadio, minmax: string): Array<IStepsSorting> => {

  let newArr: Array<IStepsSorting> = [];
  if (typeSorting === checkedRadio.Choice) {
    newArr = choice(arr, minmax);
  } else {
    newArr = bubble(arr, minmax);
  }
  return newArr;
}

const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

const bubble = (arr: Array<number>, minmax: string): Array<IStepsSorting> => {
  let steps: Array<IStepsSorting> = [];
  steps.push({
      mas: [...arr],
    });
  let mod: Array<number> = []; //прошедшие сортировку
  let chan: Array<number> = [0, 1]; //сортируемые
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      chan[0] = (i);
      chan[1] = (j);
      steps.push({
        mas: [...arr],
        changing: [...chan],
        modified: [...mod],
      })
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
    mod.push(j);
    steps.push({
      mas: [...arr],
      modified: [...mod],
    })

  }
  mod.push(0);
  steps.push({
    mas: [...arr],
    modified: [...mod],
  })
  return steps;
}

const choice = (arr: Array<number>, minmax: string): Array<IStepsSorting> => {
  let steps: Array<IStepsSorting> = [];
  steps.push({
      mas: [...arr],
    });
  let mod: Array<number> = []; //прошедшие сортировку
  let chan: Array<number> = [0, 1]; //сортируемые
  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    for (let j = i+1; j < arr.length; j++) {
      chan[0] = (maxInd);
      chan[1] = (j);
      steps.push({
        mas: [...arr],
        changing: [...chan],
        modified: [...mod],
      })
      if(minmax === "По возрастанию") {
        if(arr[maxInd] > arr[j]) {
          maxInd=j;
        }
      } else {
        if(arr[maxInd] < arr[j]) {
          maxInd=j;
        }
      }
    }
    if(maxInd != i){
      swap(arr, maxInd, i);
    }
    mod.push(i);
    steps.push({
      mas: [...arr],
      modified: [...mod],
    })
  }
  mod.push(arr.length - 1);
  steps.push({
    mas: [...arr],
    modified: [...mod],
  })
  return steps;
}

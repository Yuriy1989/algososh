import { ISteps } from "../../types/types";

  export const permutation = (sortingArray: string[]): Array<ISteps> => {
    let start: number = 0;
    let end: number = sortingArray.length-1;
    let steps: Array<ISteps> = [];
    steps.push({
        mas: [...sortingArray],
      });

    let mod = []; //прошедшие сортировку
    while(start <= end) {
      let chan = []; //сортируемые
      chan.push(start);
      chan.push(end);

      steps.push({
        mas: [...sortingArray],
        changing: [...chan],
        modified: [...mod],
      })

      let temp = sortingArray[end];
      sortingArray[end] = sortingArray[start];
      sortingArray[start] = temp;

      mod.push(start);
      mod.push(end);
      chan = [];
      chan.push(start+1);
      chan.push(end-1);

      end--;
      start++;
    }
    // mod.push(start);
    steps.push({
      mas: [...sortingArray],
      modified: [...mod],
    });
    return steps;
  }

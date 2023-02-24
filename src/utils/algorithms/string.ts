import { ElementStates } from "../../types/element-states";
import { ISteps } from "../../types/types";

  export const permutation = (sortingArray: string[]): Array<ISteps> => {
    let start: number = 0;
    let end: number = sortingArray.length-1;
    let steps: Array<ISteps> = [];
    steps.push({
        mas: [...sortingArray],
      });
    while(start < end) {
      let temp = sortingArray[end];
      sortingArray[end] = sortingArray[start];
      sortingArray[start] = temp;
      let mod = [];
      mod.push(start);
      mod.push(end);
      steps.push({
        mas: [...sortingArray],
        index: mod,
        state: ElementStates.Changing,
      })
      steps.push({
        mas: [...sortingArray],
        index: mod,
        state: ElementStates.Modified,
      })
      end--;
      start++;
    }
    steps.push({
      mas: [...sortingArray],
      state: ElementStates.Changing,
    });
    return steps;
  }

import { FC, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: FC = () => {

  //константная сложность
  const constComplexity = (a: number, b: number): number => {
    return (a- (a%b) / b);
  }

  //Логарифмическая сложность
  const binarySearch = (sortingArray: number[], n: number): number => {
    let start = 0;
    let end = sortingArray.length;
    while(start < end) {
      const middle = Math.floor((start + end) / 2);
      const value = sortingArray[middle];
      if(n === value) {
        return middle;
      }
      if(n < value) {
        end = middle;
      } else {
        start = middle + 1;
      }
    }
    return -1;
  }

  const lineComplexity = (nums: Array<number>): {min: number, max: number} => {
    let min = nums[0];
    let max = nums[0];
    for(let i = 0; i < nums.length; i++) {
      const n = nums[i];
      if( n < min) {
        min = n;
      }
      if( n > max) {
        max = n;
      }
    }
    return {min, max};
  }

  const lineLogComplexity = (arr1: Array<number>, arr2: Array<number>): Array<number> => {
    let elements: Array<number> = [];
    for(let i = 0; i < arr1.length; i++) {
      const found = binarySearch(arr2, arr1[i]);
      if( found > -1) {
        elements.push(arr1[i]);
      }
    }
    return elements;
  }

  const binarySearch2 = (arr: number[], n: number, start = 0, end = arr.length - 1): number => {  
    while (end >= start) {
      let mid = Math.floor((start + end) / 2);
      console.log("start = ", start, "end = ", end, "mid = ", mid);
      if(n === arr[mid]) {
        console.log("answer index = ", mid);
        return mid;
      }
      if(n < arr[mid]) {
        console.log("<<<<", arr[mid]);
        return binarySearch2(arr, n, start, mid-1);
      } else {
        console.log(">>>>", arr[mid]);
        return binarySearch2(arr, n, mid+1);
      }
    }
    return -1;
  }

  const isPowerOfFour = (num: number): boolean => {

    console.log('answer = ', Math.pow(4, Math.floor((Math.log(num) / Math.log(4)))));
    if( num != 0 && (num === Math.pow(4, Math.floor((Math.log(num) / Math.log(4)))))) {
      return true;
    } else {
      return false
    }
  }

  const containsDuplicate = (nums: number[]): boolean => {
    
    // let t = nums.splice(0);
    // console.log(t);
    console.log(nums);

    for(let i = 0; i < nums.length; i++) {
      let uniques = nums[i];
      let nums2 = nums.slice();
      nums2.splice(i, 1);
      console.log('nums2 = ', nums2);
      for(let x = 0; x < nums2.length; x++) {
        console.log('uniques = ', uniques);
        console.log("nums2 element=", nums2[x]);
        if(nums2[x] == uniques) {
          console.log("true");
          return true;
        }
      }
      // console.log('nums[i] = ', nums[i]); 
      // console.log('uniques = ', uniques);    
    }
    console.log("false");
    return false;
  };

  // containsDuplicate([3,3,20,33,1,44,66,200,71,13]); 

  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };
  
  const selectionSort = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i+1; j < length; j++) {
        if(arr[maxInd] < arr[j]) {
          console.log("arr", arr, "arr length =", length, "maxInd = ", maxInd, "arr[maxInd] = ", arr[maxInd], "arr[j] = ", arr[j]);
          maxInd=j;
        }
      }
      if(maxInd != i){
        swap(arr, maxInd, i);
      }
    }
    console.log("arr = ", arr);
    return arr;
  };

  // selectionSort([0,20,1,7,6,123,8,6]);

  // const quickSort = (arr: Array<number>, start: number = 0, end: number = arr.length - 1): Array<number> => {
    
  //   if(end <= start) {
  //     return arr;
  //   }

  //   let pivotValue = arr[end];
  //   let pivotIndex = start;

  //   for (let i = 0; i < end; i++) {
  //     if(arr[i] < pivotValue) {
  //       let temp = arr[pivotIndex];
  //       arr[pivotIndex] = arr[i];
  //       arr[i] = temp;
  //       pivotIndex++;
  //     }
  //   }

  //   return arr;
  // }

  // const partition2 = (arr: number[], start = 0, end = arr.length - 1): number => {
  //   const pivotValue = arr[end]
  //   let pivotIndex = start;
  //   // const leftList = [];
  //   // const rightList = [];
  //   console.log("arr = ", arr);

  //   for (let i = start; i < end; i++) {
  //     if (arr[i] < pivotValue) {
  //       console.log("pivotValue = ", pivotValue, "pivotIndex = ", pivotIndex, "arr[i] = ", arr[i]);
  //       // leftList.push(arr[i]);
  //       pivotIndex++;
  //     } else {
  //       // rightList.push(arr[i]);
  //     }
  //   }

  //   swap(arr, pivotIndex, end);

  //   // let x = [...leftList, pivotValue, ...rightList];
  //   // console.log("NEW arr =" , arr, "leftList = ", leftList, "rightList = ", rightList)
  //   // console.log("x", x);
  //   console.log("NEW arr =" , arr);
  //   return pivotIndex;
  // }

  const quickSort = (arr: number[], start = 0, end = arr.length - 1): number[] => {
    
    if (start >= end) {
      return arr;
    }

    let index = partition(arr, start, end);

    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
  
    // console.log("sorting arr ", arr);
    return arr;
  }

  const partition = (arr: number[], start = 0, end = arr.length - 1): number => {
    const pivotValue = arr[end]
    let pivotIndex = start;
    // console.log("arr = ", arr);

    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        // console.log("pivotValue = ", pivotValue, "pivotIndex = ", pivotIndex, "arr[i] = ", arr[i]);
        swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
    swap(arr, pivotIndex, end);

    // console.log("NEW arr =" , arr,"pivotIndex = ", pivotIndex);
    return pivotIndex;
  }
  
  // quickSort([0,20,1,7,5,34,6]);

  const mergeSort = (arr: number[], start = 0, end = arr.length - 1, buffer?: number[]): number[] => {
    if(end <= start) {
      return arr;
    }
  
    buffer = buffer || [...arr];
  
    const mid = Math.floor((start + end)/ 2);
  
    mergeSort(arr, start, mid, buffer);
    mergeSort(arr, mid+1, end, buffer);
  
    merge(arr, buffer, start, mid, end);
  
    return arr;
  }
  
  const merge = (arr: number[], buffer: number[], start: number, mid: number, end: number): void => {
    for (let i = start; i <= end; i++) {
      buffer[i] = arr[i];
    }
  
    let l = start;
    let r = mid + 1;
    let i = start;
  
    while (l < mid + 1 && r < end + 1) {
      if (buffer[l] <= buffer[r]) {
        arr[i] = buffer[l];
        l++
      } else {
        arr[i] = buffer[r];
        r++
      }
      i++;
    }
  
    while (l < mid + 1) {
      arr[i] = buffer[l];
      l++;
      i++;
    }
  
    while (r < end + 1) {
      arr[i] = buffer[r];
      r++;
      i++;
    }
  }

  // console.log(mergeSort([2,50,8,54]));

  const test = (arr: number[], buf: number[], start = 0, end=arr.length-1) => {
    let t= []
    for (let x = start; x <= end; x++ ) {
      t.push(arr[x]);
      console.log("t", t);
    }
    for (let i = start; i <= end; i++) {
      buf[i] = arr[i];
    }
    console.log("t", t, "buf", buf);
    return t
  }

  // console.log(test([2,5,8,54],[1]));

  const moveZeroes = (nums: number[]): number[] => {
    let start = 0;
    let end = nums.length - 1;
    while (start < end) {
      let curr = nums[start] + nums[end];
      if(nums[start] === 0) {
        if(curr === 0) {
          [nums[end-1], nums[start]] = [nums[start], nums[end-1]];
          end--;
        } else {
          [nums[end], nums[start]] = [nums[start], nums[end]];
          start++;
          end--;
        }
      } else {
        start++;
      } 
    }
    return nums;
  };

  // console.log(moveZeroes([0,2,1,0,7,0,0,0]));
  // console.log(moveZeroes([4,2,4,0,0,3,0,5,1,0]));

  //   const moveZeroes = (nums: number[]): number[] => {
  //   let start = 0;
  //   let end = nums.length;

  //   for(let i = 0; i < end; i++) {
  //     if(nums[i] === 0) {
  //       [nums[start], nums[i]] = [nums[i], nums[start]];
  //       start++;
  //       end--;
  //     }
  //   }
  //   return nums;
  // };

  
  // console.log(moveZeroes([0, 134, 0, 1, 0, 3, 12, 0]));

  const transactions: ITransaction[] = [
    {
      id: 1,
      date: '2020-01-11',
      amount: 14425.1,
    },
    {
      id: 2,
      date: '2020-01-11',
      amount: -14423.1,
    },
    {
      id: 3,
      date: '2020-02-22',
      amount: 123.44,
    }
  ];

interface ITransaction {
    id: number;
    date: string;
    amount: number;
  }
  
interface IGroup {
    amount: number;
    group: ITransaction[];
  }

// const groupByDate = (transactions: ITransaction[]): Record<string, IGroup> => {
//   const groups: Record<string, IGroup> = {};
//   console.log("groups ====", groups);

//   const groups.reduce() 

//   transactions.forEach(transaction => {
//     const { date, amount } = transaction;
//     console.log("groups", groups);
//     if (date in groups) {
//       // добавляем значение в группу
//       const group = [...groups[date].group, transaction];
//       console.log("group", group);
//       groups[date] = {
//         group,
//         amount: group.reduce((acc, { amount: amountNext }) => acc + amountNext, 0)
//       };
//     } else {
//       // создаем новое значение в группе
//       groups[date] = {
//         group: [transaction],
//         amount
//       };
//     }
//   });
//   return groups;
// };

// console.log(groupByDate(transactions));

  useEffect(() => {
    // console.log("Answer = ",constComplexity(3, 5));
    // console.log("binarySearch = ", binarySearch([1,2,3,4,5,6], 0));
    // console.log("lineComplexity = ", lineComplexity([2,4,6,74,2,4,75,3]));
    // console.log("lineLogComplexity = ", lineLogComplexity([1,2,3,4,5,6], [2,9,16,74,200,401,751]))
    // console.log("binarySearch2 = ", binarySearch2([1,20,33,44,66,71], 20));
    // console.log(isPowerOfFour(8));
  }, []);
  
  return (
    <SolutionLayout title="Строка">
    </SolutionLayout>
  );
};

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
      for (let x = 0; x < length - 1; x++) {
        if(arr[maxInd] > arr[x]) {
          swap(arr, maxInd, x);
        }
      }
      // ...
    }
    return arr;
  };

  selectionSort([20,1,7]);

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

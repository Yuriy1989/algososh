import { FC, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from '../../utils/hooks';
import { permutation } from "../../utils/algorithms/string";
import { Circle } from "../ui/circle/circle";
import string from './string.module.css';
import { ISteps } from "../../types/types";
import { DELAY_IN_MS } from "../../constants/delays";
import { MEAN_MAX_LENGTH_STRING } from "../../constants/input";

export const StringComponent: FC = () => {

  const {values, handleChange} = useForm({text: ''});
  const [list, setList] = useState<Array<ISteps> | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [button, setButton] = useState<boolean>(false);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(values.text) {
      setList(null);
      setSteps(0);
      setButton(true);
      setList(permutation(values.text.split('')));
    }
  }

  useEffect(() => {
    let index = list?.length ? list.length : 0;
    if (steps >= index-1) {
      setButton(false);
      return;
    }

    setTimeout(() => {
      setSteps(steps+1);
    }, DELAY_IN_MS);
  }, [steps, list])


  // function lengthOfLongestSubstring(s: string): number {
  //   let str: string[] = [];
  //   let result = 0;
  //   for(let i = 0; i < s.length; i++) {
  //     if(str.indexOf(s[i]) !== -1) {
  //       str = [];
  //       str.push(s[i]);
  //       console.log("str NULL", str, "s[i]", s[i]);
  //     } else {
  //       str.push(s[i]);
  //       console.log("str PUSH", str, "s[i]", s[i]);
  //     }
  //     if(result < str.length) {
  //       result = str.length;
  //     }
  //   }
  //   return result;
  // }

  // console.log(lengthOfLongestSubstring("q12q234y323"));

  function collectFruits(fruits: number[]): number {
    const BASKET_COUNT = 2;
    let counter: {[key: string]: number} = {};
    let maxCount: number = 0;
    let currentCount: number = 0;
    for (let i = 0; i < fruits.length; i++) {
      let currentSum = 0;
      for(let j = 0; j < fruits.length; j++) {
        if(fruits[i] === fruits[j]) {
          currentSum ++;
          let n = fruits[i];
          counter[n] = currentSum
        }
      }
    }
    const objKeys = Object.keys(counter);
    console.log("objKeys", objKeys.length);

    for (let i = 0; i < BASKET_COUNT ; i++) {
      currentCount += counter[objKeys[i]];
    }
    console.log("currentCount= ", currentCount);

    for ( let i = BASKET_COUNT; i < objKeys.length; i++) {
      currentCount +=  counter[objKeys[i]] - counter[objKeys[i-BASKET_COUNT]];
      maxCount = Math.max(currentCount, maxCount);
      console.log("key =", objKeys[i], "counter[key]", counter[objKeys[i]], "key =", objKeys[i-BASKET_COUNT], "counter[key]", counter[objKeys[i-BASKET_COUNT]], "maxCount = " , maxCount);
    }
    console.log("counter", counter, "maxCount = ", maxCount);

    return maxCount;
  };

  // console.log(collectFruits([0,1,2,3,2,2,2]));


  function maxSumByDays(arr: number[], d: number) {
    let maxSum = 0;
    let currentSum = 0;
    // вычисляем сумму первого окна
    for (let i = 0; i < d; i++) {
      currentSum += arr[i];
      console.log("currentSum", currentSum, "i", i);
    }

    for (let i = d; i < arr.length; i++) {
      // добавляем новый элемент в окно arr[i], удаляем старый arr[i - d]
      currentSum += arr[i] - arr[i - d];
      maxSum = Math.max(currentSum, maxSum);
    }

    return maxSum;
  }

  const days = [100, 200, 400, 700, 100, 300];

  // console.log(maxSumByDays(days, 2));

  class Heap {
    heap: number[] = [];

    getHeap = () => {
      console.log("heap", this.heap, "heap.length", this.heap.length);
    }

    siftUp = (index: number) => {
      const getParentIndex = (nodeIndex: number): number => ~~((nodeIndex - 1) / 2);

      let parent = getParentIndex(index);
      console.log("getParentIndex", parent, "this.heap[index]", this.heap[index], "this.heap[parent]", this.heap[parent]);
      while (index > 0 && this.heap[index] < this.heap[parent]) {
        [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
        index = parent;
        parent = getParentIndex(index);
      }
    }

    swap(index1: number, index2: number) {
      [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    siftDown = (i: number) => {
      const getLeft = (nodeIndex: number): number => 2 * nodeIndex + 1;
      const getRight = (nodeIndex: number): number => 2 * nodeIndex + 2;

      let left = getLeft(i)
      let right = getRight(i)

      while ((left < this.heap.length && this.heap[i] > this.heap[left]) || (right < this.heap.length && this.heap[i] > this.heap[right])) {
        let smallest = right;
        if (right >= this.heap.length || this.heap[left] < this.heap[right]) {
          smallest = left;
        }
        this.swap(i, smallest)
        i = smallest;
        left = getLeft(i);
        right = getRight(i);
      }
    }

    insert = (item: number) => {
      this.heap.push(item);
      this.siftUp(this.heap.length - 1);
    }

    getMin = (): number | null => this.heap.length >= 0 ? this.heap[0] : null;

    extract = (): number => {
      const minValue = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      this.siftDown(0);
      return minValue;
    }

    build = (sourceArray: number[]) => {
      this.heap = sourceArray;
      const startIdx = Math.floor(sourceArray.length / 2) - 1;
      for (let i = startIdx; i >= 0; i--) {
        this.siftDown(i);
      }
    }

    update = (ind: number) => {
      // ...
    }
  }

  const heap = new Heap();
  heap.build([12, 1, 10, 11, 30, 3, -4])

  heap.getHeap();
  console.log(heap.extract());
  console.log(heap.getMin());
  heap.getHeap();
  heap.siftUp(3);
  // console.log(heap.getMin()) // -3
  // heap.update(0)
  // console.log(heap.getMin()) // 1
  // Node: i
  // Left child: 2i + 1
  // Right child: 2i + 2
  // Parent: (i - 1)/2




  return (
    <SolutionLayout title="Строка">
      <div className={string.string}>
        <form className={string.form} onSubmit={handleClick}>
          <div className={string.input}>
            <Input
              name={'text'}
              onChange={handleChange}
              value={`${values.text}`}
              placeholder={'Введите текст'}
              maxLength={MEAN_MAX_LENGTH_STRING}
            />
            <span>Максимум - {MEAN_MAX_LENGTH_STRING} символов</span>
          </div>
          <Button isLoader={button} type="submit" text="Развернуть" />
        </form>
        {list &&
          <div className={string.circle}>
            {
              list[steps].mas.map((item, index) => {
                if (list[steps]?.changing?.includes(index)) {
                  return <Circle state={ElementStates.Changing} letter={item} key={index} extraClass={`${string.mr12}`}/>
                } else if (list[steps]?.modified?.includes(index)) {
                  return <Circle state={ElementStates.Modified} letter={item} key={index} extraClass={`${string.mr12}`}/>
                } else {
                  return <Circle state={ElementStates.Default} letter={item} key={index} extraClass={`${string.mr12}`}/>
                }
              })
            }
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

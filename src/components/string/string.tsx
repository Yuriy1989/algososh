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

  interface ICounter {
    [key: number]: number
  }

  function collectFruits(fruits: number[]): number {
    const BASKET_COUNT = 2;
    let result = 0;
    let currentSum = 0;
    let counter = {};
    for (let i = 0; i < 2 ; i++) {
      counter = {
        i: currentSum
      }
      currentSum +=  fruits[i];
    }

    for(let i = 0; i< fruits.length; i++) {

    }
    console.log("currentSum", currentSum);

    return result;
  };

  console.log(collectFruits([1,1,3,4,5,1]));


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

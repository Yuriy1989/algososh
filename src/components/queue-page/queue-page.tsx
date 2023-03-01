import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queue from './queue.module.css';
import { IQueueSteps } from "../../types/types";
import { Input } from "../ui/input/input";
import { newQueue } from '../../utils/algorithms/queue';
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' });
  const [list, setList] = useState<Array<IQueueSteps<String>> | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [arr, setArr] = useState<Array<string>>([]);
  const [stepsArr, setStepsArr] = useState<Array<ISteps>>();

  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { value } = e.target;
    setValues({ text: value });
  }

  const handleClickReset = () => {
    setList(null);
    setSteps(0);
    // newStack.clearContainet();
  }

  interface ISteps {
    mas?: string,
    head?: boolean,
  }

  const handleClickPush = () => {
    // setList(null);
    setSteps(0);
    if (values.text) {
      newQueue.enqueue(values.text);
      // console.log("container= ", newQueue.getSize());
      // console.log("head= ", newQueue.peak());

      if (stepsArr && arr.length) {

        let addArr: Array<string> = arr;
        addArr.push(values.text);
        setArr(addArr);

        let element: Array<ISteps> = [];
        element.push({
          mas: values.text,
          head: true,
        });
        element.push({
          mas: values.text,
          head: false,
        });
        setStepsArr(element)

      } else {
        let element: Array<ISteps> = [];
        let addArr: Array<string> = [];
        addArr.push(values.text);
        setArr(addArr);

        element.push({
          mas: values.text,
          head: true,
        });
        element.push({
          mas: values.text,
          head: false,
        });
        setStepsArr(element)
      }

      // console.log("stepsArr1 = ", stepsArr);
      // console.log("arr", arr);

      // setTimeout(() => {
      //   if (stepsArr?.mas) {
      //     let mass: Array<string> = stepsArr.mas;
      //     setStepsArr({
      //       mas: mass,
      //       head: false,
      //     })
      //   }
      //   console.log("stepsArr2 = ", stepsArr);
      // }, 1500);
    }
    setValues({ text: '' });
  }

  console.log("stepsArr = ", stepsArr, "arr = ", arr);


  const handleClickPop = () => {
    setList(null);
    setSteps(0);
    const size = newQueue.getSize();
    if(size) {
      newQueue.dequeue();
      // mas.shift();
      // setArr(mas);
    }
  }

  useEffect(() => {
    let index = stepsArr?.length ? stepsArr.length : 0;
    console.log('index = ', index);
    if (steps >= index-1) {
      // setButton(false);
      return;
    }

    setTimeout(() => {
      setSteps(steps+1);
      console.log('steps Effect = ', steps);
    }, 500);
  }, [arr, stepsArr])

  useEffect(() => {
    setSize(newQueue.getSize());
  }, [])

  const test = () => {
    let content = [];
    let i = 0;
    let j = 0;
    while (i <= size) {
      if (arr && stepsArr) {
        if (arr.length > j && stepsArr[steps].head === true && stepsArr[steps].mas === arr[j]) {
          content.push(<Circle
            state={ElementStates.Modified}
            head={`head`}
            tail={`tail`}
            letter={`${arr[j]}`}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
        } else if (arr.length > j) {
          content.push(<Circle
            state={ElementStates.Default}
            head={`head`}
            tail={`tail`}
            letter={`${arr[j]}`}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
        } else {
          content.push(<Circle
            state={ElementStates.Default}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          i++;
        }
      } else {
        content.push(<Circle
          state={ElementStates.Default}
          extraClass={queue.mr12}
          index={i}
          key={i}
        />)
        i++;
      }
    }
    return content;
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={queue.queue}>
        <form className={queue.form}>
          <div className={queue.input}>
            <Input
              name={'text'}
              onChange={onButtonActive}
              value={`${values.text}`}
              placeholder={'Введите текст'}
              maxLength={4}
            />
            <span>Максимум - 4 символа</span>
          </div>
          <div className={queue.button}>
            <Button
              disabled={!values.text ? true : false}
              onClick={handleClickPush}
              type="button"
              text="Добавить"
              extraClass={`${queue.mr12}`}
            />
            <Button
              onClick={handleClickPop}
              // disabled={!list ? true : false}
              type="button"
              text="Удалить"
              extraClass={`${queue.mr80}`}
            />
          </div>
          <Button
            onClick={handleClickReset}
            // disabled={!list ? true : false}
            type="reset"
            text="Очистить"
          />
        </form>
        {size &&
          <div className={queue.circle}>
            {test()}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

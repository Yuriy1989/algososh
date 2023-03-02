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
  const [elements, setElements] = useState<Array<IList>>([]);

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
    valuesHead?: string,
    head?: boolean,
    valuesTail?: string,
    indexTail?: number,
    tail?: boolean,
    animation?: boolean,
  }


  interface IList {
    str?: string,
    head?: boolean,
    tail?: boolean,
    active?: boolean,
    pop?: boolean
    push?: boolean
  }

  let testArr: Array<IList> = [];


  const handleClickPush = () => {
    setSteps(0);

    if (values.text && elements.length < 8) {
      if(elements.length > 0) {
        testArr = elements

        let i = 0;
        while(elements.length > i) {
          elements[i].tail = false
          elements[i].pop = false
          i++;
        }

        testArr.push({
          str: values.text,
          head: false,
          tail: true,
          active: true,
          pop: false,
          push: true
        });

        setElements(testArr);
      } else {
        testArr.push({
          str: values.text,
          head: true,
          tail: true,
          active: true,
          pop: false,
          push: true
        });

        setElements(testArr);
      }

      newQueue.enqueue(values.text);
    }
    setValues({ text: '' });
  }

  const handleClickPop = () => {
    setList(null);
    setSteps(0);
    const size = newQueue.getSize();
    if(size) {
      newQueue.dequeue();

      if(elements.length > 0) {
        testArr = elements

        let i = 0;
        while(testArr.length > i) {
          if(testArr[i].active === true){
            testArr[i].str = '';
            testArr[i].active = false;
            testArr[i].head = false;
            testArr[i].pop = true;

            testArr[i+1].head = true;
            return
          } else {
            testArr[i].pop = false;
          }
          i++;
        }
      }

      setElements(testArr);
    }
  }

  useEffect(() => {
    let index = elements?.length ? elements.length : 0;
    if (steps >= 1) {
      // setButton(false);
      return;
    }

    setTimeout(() => {
      setSteps(steps+1);
      // console.log('steps Effect = ', steps);
    }, 2500);
  }, [arr, stepsArr, elements, steps])

  useEffect(() => {
    setSize(newQueue.getSize());
  }, [])

  console.log('steps Effect = ', steps, 'elements = ', elements);

  const test2 = () => {
    let content = [];
    let i = 0;
    let j = 0;
    while (j <= size) {
      if (elements.length > i) {
        if (steps === 0 && elements[i].push && elements.length-1 === i) {
          console.log("1");
          content.push(<Circle
            state={ElementStates.Changing}
            // head={(elements[i].head) ? 'head' : ''}
            // tail={elements[i].tail ? 'tail' : ''}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
        } else
        if (steps === 1 && elements[i].push && elements.length-2 === i) {
          console.log("2", elements.length-2);
          content.push(<Circle
            state={ElementStates.Default}
            head={(elements[i].head) ? 'head' : ''}
            tail={'tail'}
            letter={elements[i].active ? `${elements[i].str}` : ''}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
          console.log("2", elements.length-2);
        } else if (steps === 1 && elements[i].tail) {
          console.log("3");
          content.push(<Circle
            state={ElementStates.Default}
            head={(elements[i].head) ? 'head' : ''}
            tail={elements[i].tail ? 'tail' : ''}
            letter={elements[i].active ? `${elements[i].str}` : ''}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
        } else {
          console.log("4");
          content.push(<Circle
            state={ElementStates.Default}
            head={(elements[i].head) ? 'head' : ''}
            tail={elements[i].tail ? 'tail' : ''}
            letter={`${elements[i].str}`}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
        }
      } else {
        console.log("5");
        content.push(<Circle
          state={ElementStates.Default}
          extraClass={queue.mr12}
          index={j}
          key={j}
        />)
        j++;
        i++;
      }
    }
    console.log("content", content);
    return content;
  }

  const test = () => {
    let content = [];
    let i = 0;
    let j = 0;
    while (i <= size) {
      if (arr && stepsArr) {
        if (arr.length > j && stepsArr[steps].animation === true && stepsArr[steps].indexTail === j) {
          content.push(<Circle
            state={ElementStates.Modified}
            head={(stepsArr[steps].head && (j === 0)) ? 'head' : ''}
            tail={stepsArr[steps].tail ? 'tail' : ''}
            letter={`${arr[j]}`}
            extraClass={queue.mr12}
            index={i}
            key={i}
          />)
          j++;
          i++;
        } else if (arr.length > j ) {
            content.push(<Circle
              state={ElementStates.Default}
              head={(stepsArr[steps].head && (j === 0)) ? 'head' : ''}
              tail={(stepsArr[steps].tail && (arr.length - 1 === j)) ? 'tail' : ''}
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
          <>
            {/* <div className={queue.circle}>
              {test()}
            </div> */}
            <div className={queue.circle}>
              {test2()}
            </div>
          </>
        }
      </div>
    </SolutionLayout>
  );
};

import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queue from './queue.module.css';
import { IQueueElements } from "../../types/types";
import { Input } from "../ui/input/input";
import { newQueue } from '../../utils/algorithms/queue';
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' });
  const [list, setList] = useState<Array<IQueueElements> | null>();
  const [size, setSize] = useState<number>(0);
  const [reload, setReload] = useState<boolean>(false);
  const [steps, setSteps] = useState<boolean>(false);

  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { value } = e.target;
    setValues({ text: value });
  }

  const handleClickReset = () => {
    setList(null);
    setValues({ text: '' });
    newQueue.clearContainet();
    setReload(true);
  }

  const handleClickPush = () => {
    if (values.text) {
      const headTail = newQueue.getHeadTail();
      if (list?.length) {
        list[headTail.tail].state = ElementStates.Changing;
      }
    }
    setSteps(true);
  }

  const handleClickPop = () => {
    const headTail = newQueue.getHeadTail();
    if (list?.length) {
      list[headTail.head].state = ElementStates.Changing;
    }
    setSteps(true);
  }

  console.log(list);

  const stepsAnimations = () => {
    let temp: Array<IQueueElements> = [];
    const headTail = newQueue.getHeadTail();
    let elements = newQueue.getContainer();
    if (elements) {
      let i = 0;
      while (elements.length > i) {
        if (!elements[i]) {
          temp.push({
            value: '',
            index: i,
            head: headTail.head,
            tail: headTail.tail,
            state: ElementStates.Default,
          });
          i++;
        } else {
          elements.map((item, index) => {
            temp.push({
              value: item,
              index: index,
              head: headTail.head,
              tail: headTail.tail,
              state: ElementStates.Default,
            });
            i++;
          })
        }
      }
    }
    setList(temp);
  }

  useEffect(() => {
    console.log("here");
    setTimeout(() => {
      console.log("here ---");
      if (values.text) {
        console.log("here push");
        newQueue.enqueue(values.text);
        let temp: Array<IQueueElements> = [];
        const headTail = newQueue.getHeadTail();
        let elements = newQueue.getContainer();
        if (elements) {
          let i = 0;
          while (elements.length > i) {
            if (!elements[i]) {
              temp.push({
                value: '',
                index: i,
                head: headTail.head,
                tail: headTail.tail,
                state: ElementStates.Default,
              });
              i++;
            } else {
              elements.map((item, index) => {
                temp.push({
                  value: item,
                  index: index,
                  head: headTail.head,
                  tail: headTail.tail,
                  state: ElementStates.Default,
                });
                i++;
              })
            }
          }
        }
        setList(temp);
      } else {
        console.log("here pop");
        // newQueue.dequeue();
        // stepsAnimations();
      }
    }, 1000)
    setValues({ text: '' });
    setSteps(false);
  }, [steps])

  useEffect(() => {
    setSize(newQueue.getSize());
    let temp: Array<IQueueElements> = [];
    let elements = newQueue.getContainer();

    if(elements) {
      if(!elements[0]) {
        let i = 0;
        while(elements.length > i) {
          temp.push({
            value: '',
            index: i,
            state: ElementStates.Default,
          });
          i++;
        }
      }
    }
    setList(temp);
    setReload(false);
  }, [reload])

  const createContent = () => {
    let content = [];
    let i = 0;

    if (list) {
      while (i < list.length) {
        content.push(<Circle
          letter={`${list[i].value}`}
          head={list[i].head === i ? "head" : ''}
          tail={list[i].tail === i ? "tail" : ''}
          state={list[i].state}
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
            {createContent()}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

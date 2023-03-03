import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queue from './queue.module.css';
import { IQueueElements, actions } from "../../types/types";
import { Input } from "../ui/input/input";
import { newQueue } from '../../utils/algorithms/queue';
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' });
  const [list, setList] = useState<Array<IQueueElements> | null>(); //элементы в очереди
  const [reload, setReload] = useState<boolean>(false); //необходим для обновления страницы после очистки
  const [steps, setSteps] = useState<boolean>(false); //шаг для включения анимации
  const [action, setAction] = useState<actions | null>(); //тип действия с очередью

  //сбор данных с input
  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { value } = e.target;
    setValues({ text: value });
  }

  //очистка всего
  const handleClickReset = () => {
    setList(null);
    setValues({ text: '' });
    newQueue.clearContainet();
    setReload(true);
  }

  //добавление элемента
  const handleClickPush = () => {
    if (values.text) {
      const headTail = newQueue.getHeadTail();
      if (list?.length) {
        list[headTail.tail].state = ElementStates.Changing;
      }
    }
    setSteps(true);
    setAction(actions.Push);
  }

  //удаление элемента
  const handleClickPop = () => {
    const headTail = newQueue.getHeadTail();
    if (list?.length) {
      list[headTail.head].state = ElementStates.Changing;
    }
    setSteps(true);
    setAction(actions.Pop);
  }

  //сбор элементов из очереди
  const stepsAnimations = () => {
    let temp: Array<IQueueElements> = [];
    const headTail = newQueue.getHeadTail();
    let elements = newQueue.getContainer();
    if (elements) {
      let i = 0;
      elements.map((item, index) => {
        temp.push({
          value: item,
          index: index,
          head: headTail.head === i ? headTail.head : null,
          tail: (headTail.tail-1) === i ? headTail.tail-1 : null,
          state: ElementStates.Default,
        });
        i++;
      })
    }
    setList(temp);
    setAction(null);
  }

  //анимация с задержкой
  useEffect(() => {
    setTimeout(() => {
      if (action === actions.Push && values.text) {
        newQueue.enqueue(values.text);
        stepsAnimations();
      } else if (action === actions.Pop) {
        newQueue.dequeue();
        stepsAnimations();
      }
    }, 500)
    setValues({ text: '' });
    setSteps(false);
    setAction(null);
  }, [steps])

  //первоначальная отрисовка пустой очереди
  useEffect(() => {
    let temp: Array<IQueueElements> = [];
    let elements = newQueue.getContainer();
    if (elements) {
      let i = 0;
      while (elements.length > i) {
        temp.push({
          value: null,
          index: i,
          state: ElementStates.Default,
        });
        i++;
      }
    }
    setList(temp);
    setReload(false);
  }, [reload])

  //создание контента
  const createContent = () => {
    let content = [];
    let i = 0;
    if (list) {
      while (i < list.length) {
        content.push(<Circle
          letter={list[i].value ? `${list[i].value}` : ''}
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
              disabled={newQueue.isEmpty()}
              type="button"
              text="Удалить"
              extraClass={`${queue.mr80}`}
            />
          </div>
          <Button
            onClick={handleClickReset}
            disabled={newQueue.isEmpty()}
            type="reset"
            text="Очистить"
          />
        </form>
        {list &&
          <div className={queue.circle}>
            {createContent()}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

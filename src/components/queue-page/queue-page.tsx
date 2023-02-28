import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queue from './queue.module.css';
import { IStackSteps } from "../../types/types";
import { Input } from "../ui/input/input";
import { newQueue } from '../../utils/algorithms/queue';
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {

  const {values, setValues} = useForm({text: ''});
  const [list, setList] = useState<Array<IStackSteps<String>> | null>(null);
  const [steps, setSteps] = useState<number>(0);

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

  const handleClickPush = () => {
    setList(null);
    setSteps(0);
    if(values.text) {
      // setList(newQueue.enqueue(values.text));
    }
    setValues({ text: '' });
  }

  const handleClickPop = () => {
    // setList(null);
    // setSteps(0);
    // const size = newStack.getSize();
    // if(size) {
    //   setList(newStack.pop());
    // }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSteps(steps+1);
  //   }, 500);
  // }, [list])

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
        {/* {list &&
          <div className={queue.circle}>
            {
              list[0].mas.map((item, index) => {
                if (list[0].changing?.includes(index) && steps) {
                  return <Circle
                    state={ElementStates.Default}
                    letter={`${item}`}
                    index={index}
                    head="top"
                    key={index} />
                } else if (list[0].changing?.includes(index)) {
                  return <Circle
                    state={ElementStates.Changing}
                    letter={`${item}`}
                    index={index}
                    head="top"
                    key={index} />
                } else {
                  return <Circle
                    state={ElementStates.Default}
                    letter={`${item}`}
                    index={index}
                    key={index}
                  />
                }
              })
            }
          </div>
        } */}
      </div>
    </SolutionLayout>
  );
};

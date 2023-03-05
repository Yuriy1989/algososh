import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stack from './stack.module.css';
import { ILoader, IStackSteps, Task } from "../../types/types";
import { Input } from "../ui/input/input";
import { newStack } from '../../utils/algorithms/stack';
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SHORT_MAX_LENGTH_STRING } from "../../constants/input";

export const StackPage: React.FC = () => {

const {values, setValues} = useForm({text: ''});
const [list, setList] = useState<Array<IStackSteps<String>> | null>(null);
const [steps, setSteps] = useState<number>(0);
const [loader, serLoader] = useState<ILoader>({state: false, task: null});

const onButtonActive = (e: {
  target: any; preventDefault: () => void;
}) => {
  const { value } = e.target;
  setValues({ text: value });
}

const handleClickReset = () => {
  setList(null);
  setSteps(0);
  newStack.clearContainet();
  serLoader({ state: true, task: Task.Reset })
}

const handleClickPush = () => {
  setList(null);
  setSteps(0);
  if(values.text) {
    setList(newStack.push(values.text));
  }
  setValues({ text: '' });
  serLoader({ state: true, task: Task.Push })
}

const handleClickPop = () => {
  setList(null);
  setSteps(0);
  const size = newStack.getSize();
  if(size) {
    setList(newStack.pop());
  }
  serLoader({ state: true, task: Task.Pop })
}

useEffect(() => {
  setTimeout(() => {
    setSteps(steps+1);
    serLoader({ state: false, task: null })
  }, SHORT_DELAY_IN_MS);
}, [list])

  return (
    <SolutionLayout title="Стек">
      <div className={stack.stack}>
        <form className={stack.form}>
          <div className={stack.input}>
            <Input
              name={'text'}
              onChange={onButtonActive}
              value={`${values.text}`}
              placeholder={'Введите текст'}
              maxLength={SHORT_MAX_LENGTH_STRING}
              disabled={loader.state ? true : false}
            />
            <span>Максимум - {SHORT_MAX_LENGTH_STRING} символа</span>
          </div>
          <div className={stack.button}>
            <Button
              disabled={!values.text || loader.state ? true : false}
              onClick={handleClickPush}
              type="button"
              text="Добавить"
              extraClass={`${stack.mr12}`}
              isLoader={loader.state && loader.task === Task.Push}
            />
            <Button
              onClick={handleClickPop}
              disabled={!list || loader.state ? true : false}
              type="button"
              text="Удалить"
              extraClass={`${stack.mr80}`}
              isLoader={loader.state && loader.task === Task.Pop}
            />
          </div>
          <Button
            onClick={handleClickReset}
            disabled={!list || loader.state ? true : false}
            type="reset"
            text="Очистить"
            isLoader={loader.state && loader.task === Task.Reset}
          />
        </form>
        {list &&
          <div className={stack.circle}>
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
        }
      </div>
    </SolutionLayout>
  );
};

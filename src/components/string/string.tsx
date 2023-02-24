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

export const StringComponent: FC = () => {

  const {values, handleChange} = useForm({text: ''});
  const [list, setList] = useState<Array<ISteps> | null>(null);
  const [steps, setSteps] = useState<number>(0);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(values.text) {
      setList(null);
      setSteps(0);
      setList(permutation(values.text.split('')));
    }
  }

  useEffect(() => {
    let index = list?.length ? list.length : 0;
    if (steps >= index-1) {
      return;
    }

    setTimeout(() => {
      setSteps(steps+1);
    }, 1000);
  }, [steps, list])

  console.log('step222', steps);
  console.log('list222', list);
  if(list) {
    console.log(list[steps].state);
  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleClick}>
        <Input
          name={'text'}
          onChange={handleChange}
          value={`${values.text}`}
          placeholder={'Введите текст'}
          maxLength={11}
        />
        <span>максимум 11-символов</span>
        <Button type="submit" text="Развернуть"/>
      </form>
      {list &&
        <div className={string.string}>
          {
            list[steps].mas.map((item, index) => {
              if (
                  (list[steps].state === ElementStates.Modified) &&
                  (
                    (index === list[steps]?.index) ||
                    (list[steps].mas.length - index - 1 === list[steps]?.index)
                  )
                ){
                return <Circle state={ElementStates.Modified} letter={item} key={index} />
              } else if ((list[steps].state === ElementStates.Changing) && ((index === list[steps]?.index) || (list[steps].mas.length - index - 1 === list[steps]?.index))) {
                return <Circle state={ElementStates.Changing} letter={item} key={index} />
              } else {
                return <Circle state={ElementStates.Default} letter={item} key={index} />
              }
            })
          }
        </div>
      }
    </SolutionLayout>
  );
};

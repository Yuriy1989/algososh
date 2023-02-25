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
    }, 1000);
  }, [steps, list])

  if(list) {
    console.log(list);
  }

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
              maxLength={11}
            />
            <span>максимум 11-символов</span>
          </div>
          <Button isLoader={button} type="submit" text="Развернуть" />
        </form>
        {list &&
          <div className={string.circle}>
            {
              list[steps].mas.map((item, index) => {
                if (list[steps]?.changing?.includes(index)) {
                  return <Circle state={ElementStates.Changing} letter={item} key={index} />
                } else if (list[steps]?.modified?.includes(index)) {
                  return <Circle state={ElementStates.Modified} letter={item} key={index} />
                } else {
                  return <Circle state={ElementStates.Default} letter={item} key={index} />
                }
              })
            }
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

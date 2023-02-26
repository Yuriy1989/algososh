import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sortingArray } from '../../utils/algorithms/sorting';
import sorting from './sorting.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { RandomArr } from '../../utils/random';
import { checkedRadio } from '../../types/types';
import { Column } from '../ui/column/column';

export const SortingPage: React.FC = () => {

  const {values, setValues} = useForm({check: checkedRadio.Choice});
  const [list, setList] = useState<Array<number> | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [button, setButton] = useState<boolean>(false);
  const [numb, setNumb] = useState<Array<number>>([]);

  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { value } = e.target;
    setValues({ check: value });
  }

  const handleClick = (e: {
    target: any; preventDefault: () => void;
}) => {
    e.preventDefault();
      setList(null);
      setSteps(0);
      setList(RandomArr());
  }

  const handleClickSorting = (e: any) => {
    if(list && values.check) {
      console.log(sortingArray(list, values.check, e.target.innerText));
    }
  }

  useEffect(() => {
    let index = list?.length ? list.length : 0;
    if (steps > index) {
      setButton(false);
      return;
    }

    setTimeout(() => {
      setSteps(steps+1);
      if(list){
        setNumb(list.slice(0, steps));
      }
    }, 1000);
  }, [steps, list])

  useEffect(() => {
    setList(RandomArr());
  }, [])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sorting.sorting}>
        <form className={sorting.form} onSubmit={handleClick}>
          <div className={sorting.input}>
            <div className={sorting.radioInput}>
              <RadioInput onChange={onButtonActive} checked={values.check == checkedRadio.Choice ? true : false} label="Выбор" value="choice" name="sort" extraClass={`${sorting.radioInput_margin}`}/>
              <RadioInput onChange={onButtonActive} checked={values.check == checkedRadio.Bubble ? true : false} label="Пузырёк" value="bubble" name="sort" extraClass={`${sorting.radioInput_margin}`}/>
            </div>
            <div className={sorting.button}>
              <Button onClick={handleClickSorting} name="max" isLoader={button} type="button" text="По возрастанию" sorting={Direction.Ascending} extraClass={`${sorting.mr12}`}/>
              <Button onClick={handleClickSorting} name="min" isLoader={button} type="button" text="По убыванию" sorting={Direction.Descending} extraClass={`${sorting.mr80}`}/>
            </div>
            <Button isLoader={button} type="submit" text="Новый массив" />
          </div>
        </form>
        {list &&
          <div className={sorting.columns}>
            {
              list.map((item, index) => {
                return <Column key={index} index={item} />
              })
            }
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

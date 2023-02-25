import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { sortingAlg } from '../../utils/algorithms/sorting';
import sorting from './sorting.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { RandomArr } from '../../utils/random';
import { checkedRadio } from '../../types/types';

export const SortingPage: React.FC = () => {

  const {values, handleChange} = useForm({check: checkedRadio.Choice});
  const [list, setList] = useState<Array<number> | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [button, setButton] = useState<boolean>(false);
  const [numb, setNumb] = useState<Array<number>>([]);
  // const [checked, setChecked] = useState("choice");

  const handleClick = (e: {
    target: any; preventDefault: () => void;
}) => {
    e.preventDefault();
    console.log("e", e);
    console.log("values.numbers", values.numbers);
    // setChecked(e.target.value);
    // if(values.numbers) {
      setList(null);
      setSteps(0);
      // setButton(true);
      console.log(RandomArr());
      // setList(sortingAlg());
    // }
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
    }, 500);
  }, [steps, list])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sorting.sorting}>
        <form className={sorting.form} onSubmit={handleClick}>
          <div className={sorting.input}>
            <div className={sorting.radioInput}>
              <RadioInput onChange={handleChange} checked={values.check == checkedRadio.Choice ? true : false} label="Выбор" value="choice" name="sort" extraClass={`${sorting.radioInput_margin}`}/>
              <RadioInput onChange={handleChange} checked={values.check == checkedRadio.Bubble ? true : false} label="Пузырёк" value="bubble" name="sort" extraClass={`${sorting.radioInput_margin}`}/>
            </div>
            <div className={sorting.button}>
              <Button isLoader={button} type="button" text="По возрастанию" sorting={Direction.Ascending} extraClass={`${sorting.mr12}`}/>
              <Button isLoader={button} type="button" text="По убыванию" sorting={Direction.Descending} extraClass={`${sorting.mr80}`}/>
            </div>
            <Button isLoader={button} type="submit" text="Новый массив" />
          </div>
        </form>
        {list &&
          <div className={sorting.circle}>
            {
              // numb.map((item, index) => {
              //   return <Circle state={ElementStates.Default} letter={`${item}`} key={index} index={index} />
              // })
            }
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

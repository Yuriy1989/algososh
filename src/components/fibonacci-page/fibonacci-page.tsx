import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibonacci from "./fibonacci.module.css";
import { fibonacciAlg } from '../../utils/algorithms/fibonacci';

export const FibonacciPage: React.FC = () => {

  const {values, handleChange} = useForm({numbers: 0});
  const [list, setList] = useState<Array<number> | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [button, setButton] = useState<boolean>(false);
  const [numb, setNumb] = useState<Array<number>>([]);

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(values.numbers) {
      setList(null);
      setSteps(0);
      setButton(true);
      setList(fibonacciAlg(values.numbers));
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
    }, 500);
  }, [steps, list])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacci.fibonacci}>
        <form className={fibonacci.form} onSubmit={handleClick}>
          <div className={fibonacci.input}>
            <Input
              name={'numbers'}
              onChange={handleChange}
              value={`${values?.numbers}`}
              max={19}
              type={'number'}
              pattern={`[1]-[19]`}
            />
            <span>Максимальное число - 19</span>
          </div>
          <Button isLoader={button} type="submit" text="Рассчитать" />
        </form>
        {list &&
          <div className={fibonacci.circle}>
            {
              numb.map((item, index) => {
                return <Circle state={ElementStates.Default} letter={`${item}`} key={index} index={index} />
              })
            }
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

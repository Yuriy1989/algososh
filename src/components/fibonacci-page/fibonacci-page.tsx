import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibonacci from "./fibonacci.module.css";
import { fibonacciAlg } from '../../utils/algorithms/fibonacci';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_STRING } from "../../constants/input";
import { PATTERN_FIBONACCI } from "../../constants/pattern";

export const FibonacciPage: React.FC = () => {

  const {values, setValues} = useForm({numbers: null});
  const [list, setList] = useState<Array<number> | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [button, setButton] = useState<boolean>(false);
  const [numb, setNumb] = useState<Array<number>>([]);

  const handleChange = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { name, value } = e.target;
    setValues( { ...values, [name]: value} );
  }

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
    }, SHORT_DELAY_IN_MS);
    setValues({ numbers: null });
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
              max={MAX_LENGTH_STRING}
              type={'number'}
              pattern={`${PATTERN_FIBONACCI}`}
            />
            <span>Максимальное число - {MAX_LENGTH_STRING}</span>
          </div>
          <Button disabled={!values.numbers ? true : false} isLoader={button} type="submit" text="Рассчитать" />
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

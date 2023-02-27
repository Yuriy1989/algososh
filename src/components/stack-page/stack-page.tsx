import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stack from './stack.module.css';
import { IButton, IStackSteps } from "../../types/types";
import { Input } from "../ui/input/input";
import { newStack } from '../../utils/algorithms/stack';
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {

const {values, handleChange} = useForm({text: ''});
const [list, setList] = useState<Array<IStackSteps<String>> | null>(null);
const [newList, setNewList] = useState<Array<string> | null>(null);
const [steps, setSteps] = useState<number>(0);
const [button, setButton] = useState<IButton>({active: false, textbutton: ''});
const [numb, setNumb] = useState<Array<number>>([]);

const handleClickReset = () => {
  setList(null);
  setSteps(0);
}

interface IT {
  addArr: Array<string>,
  addNew: Array<string>
}

let t: IT = {
  addArr: [],
  addNew: [],
}

const [tt, seTt] = useState<Array<IT>>([])

const handleClickPush = () => {
  setList(null);
  setSteps(0);
  if(values.text) {
    // let arr: Array<string> = [];
    // let arrNew: Array<string> = [];
    // t.addArr.push(values.text);
    // console.log('t', t);
    // arr.push(values.text);
    // setList(arr);

    setList(newStack.push(values.text));
    console.log('t', t);
    newStack.show();
    console.log("peak getSize=", newStack.getSize());
    console.log("list=", list);
    // setTimeout(() => {
    //   if(values.text) {
    //     // arrNew.push(values.text);
    //     // setNewList(arrNew);
    //     // setList(null);
    //     // t.addNew.push(values.text);
    //   }
    // }, 500);
  }
  // console.log('t', t);

  // if(numb && values.check) {
    // setButton({active: true, textbutton: e.target.innerText});
    // setList(sortingArray(numb, values.check, e.target.innerText));
  // }
}
// console.log('t', t);

const handleClickPop = () => {
  setList(null);
  setSteps(0);
  const size = newStack.getSize();
  if(size) {
    // setButton({active: true, textbutton: e.target.innerText});
    newStack.pop();
    newStack.show();
  }
}

useEffect(() => {
  let index = list?.length ? list.length : 0;
  if (steps >= index-1) {
    // setButton({active: false, textbutton: ''});
    return;
  }

  setTimeout(() => {
    setSteps(steps+1);
  }, 500);
}, [steps, list])

  return (
    <SolutionLayout title="Стек">
      <div className={stack.stack}>
        <form className={stack.form}>
          <div className={stack.input}>
            <Input
              name={'text'}
              onChange={handleChange}
              value={`${values.text}`}
              placeholder={'Введите текст'}
              maxLength={4}
            />
            <span>Максимум - 4 символа</span>
          </div>
          <div className={stack.button}>
            <Button
              onClick={handleClickPush}
              // disabled={button.textbutton != "По возрастанию" && button.textbutton ? true : false}
              // isLoader={button.textbutton === "По возрастанию" ? true : false}
              type="button"
              text="Добавить"
              extraClass={`${stack.mr12}`}
            />
            <Button
              onClick={handleClickPop}
              // disabled={button.textbutton != "По убыванию" && button.textbutton ? true : false}
              // isLoader={button.textbutton === "По убыванию" ? true : false}
              type="button"
              text="Удалить"
              extraClass={`${stack.mr80}`}
            />
          </div>
          <Button
            onClick={handleClickReset}
            // disabled={button.textbutton != "Новый массивю" && button.textbutton ? true : false}
            // isLoader={button.textbutton === "Новый массив" ? true : false}
            type="reset"
            text="Очистить"
          />
        </form>
        {list &&
          <div className={stack.circle}>
            {
              list[steps].mas.map((item, index) => {
                return <Circle state={ElementStates.Default} letter={`${item}`} head={list[steps].mas.length ? "top" : null} index={index} key={index} />
              })
            }
          </div>
        }
        {/* {newList &&
          <div className={stack.circle}>
            {
              newList.map((item, index) => {
                return <Circle state={ElementStates.Default} letter={item} head={"top"} index={index} key={index} />
              })
            }
          </div>
        } */}
      </div>
    </SolutionLayout>
  );
};

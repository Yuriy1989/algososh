import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { IList } from "../../types/types";
import { listAlg } from "../../utils/algorithms/list";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyle from "./list.module.css";

export const ListPage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' , index: null});
  const [list, setList] = useState<Array<IList> | null>(null);
  const [steps, setSteps] = useState<boolean>(false);

  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { name, value} = e.target;
    setValues( { ...values, [name]: value} );
  }

  const handleClickPushHead = () => {
    if (values.text && list) {

      list[0].temp = values.text;
      list[0].top = values.text;
      setSteps(true);

      setTimeout(() => {
        if(values.text) {
          listAlg.prepend(values.text)
          getElements();
        }
      }, 500);
    }
  }

  const handleClickPushTail = () => {
    if (values.text) {
      listAlg.append(values.text)
      getElements();
    }
  }

  const handleClickDeleteHead = () => {
    listAlg.deleteHead();
    getElements();
  }

  const handleClickDeleteTail = () => {
    listAlg.deleteTail();
    getElements();
  }

  const handleClickPushOnIndex = () => {
    if (values.text && values.index) {
      console.log(listAlg.insertAt(values.text, Number(values.index)));
      getElements();
    }
  }

  const handleClickDeleteOnIndex = () => {
    if (values.index) {
      console.log(listAlg.deleteAt(Number(values.index)));
      console.log("getSize", listAlg.getSize());
      getElements();
    }
  }

  const createContent = () => {
    let content: JSX.Element[] = [];
    let i = 0;
    if (list) {
      list.map((item, index) => {
        content.push(
          <div key={index} className={listStyle.circle}>
            <Circle
              letter={`${item.value}`}
              state={item.state}
              index={index}
              key={index}
              head={
                item.top !== null ? <Circle
                letter={`${item.temp}`}
                isSmall={true}
                state={ElementStates.Changing}
              /> : index === 0 ? "head" : ""
              }
              tail={
                item.bottom !== null ? <Circle
                  letter={`${item.temp}`}
                  isSmall={true}
                  state={ElementStates.Changing}
                /> : index === list.length - 1 ? "tail" : ""
              }
            />
            {list.length-1 > index &&
              <div className={listStyle.arrow}>
                <ArrowIcon key={index}/>
              </div>
            }
          </div>
        );
      })
    }
    return content;
  }

  const getElements = () => {
    let temp: Array<IList> = [];
    listAlg.print().map((item, index) => {
      temp.push({
        value: item,
        index: index,
        state: ElementStates.Default,
        top: null,
        bottom: null,
        temp: null
      })
    })
    setList(temp);
    console.log(listAlg.getHeadTail());
  }

  useEffect(() => {
    listAlg.append(0);
    listAlg.append(34);
    listAlg.append(8);
    listAlg.append(1);
    getElements();
    setSteps(false);
  }, [])

  useEffect(() => {
    // getElements();
    setSteps(false);
  }, [steps])

  console.log("list = ", list);

  return (
    <SolutionLayout title="Связный список">
      <div className={listStyle.list}>
        <form className={listStyle.form}>
          <div className={listStyle.formValues}>
            <div className={listStyle.inputValues}>
              <Input
                name="text"
                onChange={onButtonActive}
                value={`${values.text}`}
                placeholder="Введите значение"
                maxLength={4}
                extraClass={`${listStyle.inputWidth}`}
              />
              <span>Максимум - 4 символа</span>
            </div>
            <div className={listStyle.button}>
              <Button
                // disabled={!values.text ? true : false}
                onClick={handleClickPushHead}
                type="button"
                text="Добавить в head"
                extraClass={`${listStyle.mr12}`}
              />
              <Button
                onClick={handleClickPushTail}
                // disabled={!list ? true : false}
                type="button"
                text="Добавить в tail"
                extraClass={`${listStyle.mr12}`}
              />
              <Button
                onClick={handleClickDeleteHead}
                // disabled={!list ? true : false}
                type="button"
                text="Удалить из head"
                extraClass={`${listStyle.mr12}`}
              />
              <Button
                onClick={handleClickDeleteTail}
                // disabled={!list ? true : false}
                type="button"
                text="Удалить из tail"
                extraClass={`${listStyle.mr12}`}
              />
            </div>
          </div>
          <div className={listStyle.formIndex}>
            <div className={listStyle.inputIndex}>
              <Input
                name="index"
                onChange={onButtonActive}
                value={values.index ? values.index : ''}
                placeholder="Введите индекс"
                extraClass={`${listStyle.inputWidth}`}
              />
            </div>
            <Button
              // disabled={!values.text ? true : false}
              onClick={handleClickPushOnIndex}
              type="button"
              text="Добавить по индексу"
              extraClass={`${listStyle.mr12} ${listStyle.indexButtonWidth}`}
            />
            <Button
              onClick={handleClickDeleteOnIndex}
              // disabled={!list ? true : false}
              type="button"
              text="Удалить по индексу"
              extraClass={`${listStyle.mr12} ${listStyle.indexButtonWidth}`}
            />
          </div>
        </form>
        {list &&
          <div className={listStyle.circles}>
            {createContent()}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};

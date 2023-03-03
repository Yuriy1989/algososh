import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { IList, listAlg } from "../../utils/algorithms/list";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyle from "./list.module.css";

export const ListPage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' , index: null});
  const [list, setList] = useState<Array<IList> | null>(null);

  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { name, value} = e.target;
    setValues( { ...values, [name]: value} );
  }

  const handleClickReset = () => {
    // setList(null);
    // setSteps(0);
    // newStack.clearContainet();
  }

  const handleClickPushHead = () => {

  }

  const handleClickPushTail = () => {

  }

  useEffect(() => {
    listAlg.append(0);
    listAlg.append(34);
    listAlg.append(8);
    listAlg.append(1);
    let temp: Array<IList> = [];
    listAlg.print().map((item, index) => {
      temp.push({
        value: item,
        index: index,
        head: listAlg.getHeadTail(),
      })
    })
    setList(temp);
    console.log(listAlg.getHeadTail());
  }, [])

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
                // onClick={handleClickPop}
                // disabled={!list ? true : false}
                type="button"
                text="Удалить из head"
                extraClass={`${listStyle.mr12}`}
              />
              <Button
                // onClick={handleClickPop}
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
              // onClick={handleClickPush}
              type="button"
              text="Добавить по индексу"
              extraClass={`${listStyle.mr12} ${listStyle.indexButtonWidth}`}
            />
            <Button
              // onClick={handleClickPop}
              // disabled={!list ? true : false}
              type="button"
              text="Удалить по индексу"
              extraClass={`${listStyle.mr12} ${listStyle.indexButtonWidth}`}
            />
          </div>
        </form>
        {/* {size && */}
        <>
          {/* <div className={queue.circle}>
              {test()}
            </div> */}
          {/* <div className={queue.circle}> */}
          {/* {test2()} */}
          {/* </div> */}
        </>
        {/* } */}
      </div>
    </SolutionLayout>
  );
};

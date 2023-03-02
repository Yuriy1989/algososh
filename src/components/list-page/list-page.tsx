import React from "react";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import list from "./list.module.css";

export const ListPage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' , index: null});

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

  return (
    <SolutionLayout title="Связный список">
      <div className={list.queue}>
        <form className={list.form}>
          <div className={list.formValues}>
            <div className={list.inputValues}>
              <Input
                name="text"
                onChange={onButtonActive}
                value={`${values.text}`}
                placeholder="Введите значение"
                maxLength={4}
              />
              <span>Максимум - 4 символа</span>
            </div>
            <div className={list.button}>
              <Button
                // disabled={!values.text ? true : false}
                // onClick={handleClickPush}
                type="button"
                text="Добавить в head"
                extraClass={`${list.mr12}`}
              />
              <Button
                // onClick={handleClickPop}
                // disabled={!list ? true : false}
                type="button"
                text="Добавить в tail"
                extraClass={`${list.mr12}`}
              />
              <Button
                // onClick={handleClickPop}
                // disabled={!list ? true : false}
                type="button"
                text="Удалить из head"
                extraClass={`${list.mr12}`}
              />
              <Button
                // onClick={handleClickPop}
                // disabled={!list ? true : false}
                type="button"
                text="Удалить из tail"
                extraClass={`${list.mr12}`}
              />
            </div>
          </div>
          <div className={list.formIndex}>
            <div className={list.inputIndex}>
              <Input
                name="index"
                onChange={onButtonActive}
                value={values.index ? values.index : ''}
                placeholder="Введите индекс"
              />
            </div>
            <Button
              // disabled={!values.text ? true : false}
              // onClick={handleClickPush}
              type="button"
              text="Добавить по индексу"
              extraClass={`${list.mr12}`}
            />
            <Button
              // onClick={handleClickPop}
              // disabled={!list ? true : false}
              type="button"
              text="Удалить по индексу"
              extraClass={`${list.mr12}`}
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

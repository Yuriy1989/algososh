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

  async function animation(task: string, indexSearch?: number, text?: string, list?: Array<IList> ) {
    if(task === "pushHead") {
      await waitFor(500);
      animationPushHead1();

      await waitFor(500);
      animationPushHead2();
    }

    if(task === "pushTail") {
      await waitFor(500);
      animationPushTail1();

      await waitFor(500);
      animationPushTail2();
    }

    if(task === "deleteHead") {
      await waitFor(500);
      animationDeleteHead();
    }

    if(task === "deleteTail") {
      await waitFor(500);
      animationDeleteTail();
    }

    if(task === "pushOnIndex") {

      let i = 0;
      if (indexSearch) {
        while(i <= indexSearch) {
          console.log("i=", i, "index = ", indexSearch);

          list?.map(async (item, index) => {
            if(index === 0) {
              return
            } else {
              await waitFor(500);
              animationPushOnIndex1(item, index);
            }
          })
          i++;
        }
      }

      // await waitFor(500);
      // animationPushOnIndex1();

      await waitFor(500);
      animationPushOnIndex2();
    }

    if(task === "deleteOnIndex") {
      await waitFor(500);
      // animationDeleteOnIndex();
    }
  }

  function animationPushHead1() {
    if(list) {
      list[0].temp = null;
      list[0].top = null;

      list.unshift({
        value: values.text,
        state: ElementStates.Modified,
        top: null,
        bottom: null,
        temp: null
      })
      setList(list);
      setSteps(true);
    }
  }

  function animationPushHead2() {
    if (values.text) {
      listAlg.prepend(values.text)
      getElements();
    }
  }

  function animationPushOnIndex1(item: IList, index: number) {
    if(list) {
      list[index-1].temp = null;
      list[index-1].top = null;
      list[index-1].state = ElementStates.Modified;
      list[index].temp = values.text;
      list[index].top = values.text;

      // list.unshift({
      //   value: values.text,
      //   state: ElementStates.Modified,
      //   top: null,
      //   bottom: null,
      //   temp: null
      // })
      setList(list);
      setSteps(true);
    }
  }

  function animationPushOnIndex2() {
    if (values.text && values.index) {
      listAlg.insertAt(values.text, Number(values.index));
      getElements();
    }
  }

  function animationPushTail1() {
    if(list) {
      list[list.length-1].temp = null;
      list[list.length-1].top = null;

      list.push({
        value: values.text,
        state: ElementStates.Modified,
        top: null,
        bottom: null,
        temp: null
      })
      setList(list);
      setSteps(true);
    }
  }

  function animationPushTail2() {
    if (values.text) {
      listAlg.append(values.text)
      getElements();
    }
  }

  function animationDeleteHead() {
    listAlg.deleteHead();
    getElements();
  }

  function animationDeleteTail() {
    listAlg.deleteTail();
    getElements();
  }

  function waitFor(msec: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, msec))
  }

  const handleClickPushHead = () => {
    if (values.text && list) {
      if (listAlg.getSize()) {
        const pushHead = "pushHead";
        list[0].temp = values.text;
        list[0].top = values.text;
        setSteps(true);
        animation(pushHead);
      } else {
        if (values.text) {
          listAlg.prepend(values.text)
          getElements();
        }
      }
    }
  }

  const handleClickPushTail = () => {
    if (values.text && list) {
      if (listAlg.getSize()) {
        const pushTail = "pushTail";
        list[list.length - 1].temp = values.text;
        list[list.length - 1].top = values.text;
        setSteps(true);
        animation(pushTail);
      } else {
        if (values.text) {
          listAlg.append(values.text)
          getElements();
        }
      }
    }
  }

  const handleClickDeleteHead = () => {
    if (list) {
      const deleteHead = "deleteHead";
      list[0].temp = list[0].value;
      list[0].bottom = list[0].value;
      list[0].value = null;
      setSteps(true);

      animation(deleteHead);
    }
  }

  const handleClickDeleteTail = () => {
    if (list) {
      const deleteTail = "deleteTail";
      list[list.length-1].temp = list[list.length-1].value;
      list[list.length-1].bottom = list[list.length-1].value;
      list[list.length-1].value = null;
      setSteps(true);

      animation(deleteTail);
    }
  }

  const handleClickPushOnIndex = () => {
    if (list && values.text && values.index) {
      if (listAlg.getSize()) {
        const pushOnIndex = "pushOnIndex";
        list[0].temp = values.text;
        list[0].top = values.text;
        setSteps(true);
        animation(pushOnIndex, values.index, values.text, list);
      } else {
        if (values.text && values.index === 0) {
          listAlg.prepend(values.text)
          getElements();
        }
      }
    }
  }

  const handleClickDeleteOnIndex = () => {
    if (values.index) {
      listAlg.deleteAt(Number(values.index));
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
              letter={item.value !== null ? `${item.value}` : ''}
              state={item.state}
              index={index}
              key={index}
              head={
                item.top !== null ? <Circle
                letter={`${item.temp}`}
                isSmall={true}
                state={ElementStates.Changing}
              /> : (index === 0 && item.value !== null) ? "head" : ""
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

import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { SHORT_MAX_LENGTH_STRING } from "../../constants/input";
import { ElementStates } from "../../types/element-states";
import { IList, tasks } from "../../types/types";
import { listAlg } from "../../utils/algorithms/list";
import { useForm } from "../../utils/hooks";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listStyle from "./list.module.css";

export const ListPage: React.FC = () => {

  const { values, setValues } = useForm({ text: '' , index: null}); //сбор данных с input
  const [list, setList] = useState<Array<IList> | null>(null); //массив объектов из связанного списка
  const [steps, setSteps] = useState<boolean>(false); // включение анимации
  const [loading, setLoading] = useState<boolean>(false); // включение лоадера кнопки
  const [task, setTask] = useState<tasks | null>(null); // тип задачи для запуска определенного лоадера на кнопке

  const onButtonActive = (e: {
    target: any; preventDefault: () => void;
  }) => {
    const { name, value} = e.target;
    setValues( { ...values, [name]: value} );
  }

  //создание анимации в свазивисимости от задачи
  async function animation(task: tasks, indexSearch?: number, text?: string, list?: Array<IList> ) {
    if(task === tasks.PushHead) {
      await waitFor(SHORT_DELAY_IN_MS);
      animationPushHead1();

      await waitFor(SHORT_DELAY_IN_MS);
      animationPushHead2();
    }

    if(task === tasks.PushTail) {
      await waitFor(SHORT_DELAY_IN_MS);
      animationPushTail1();

      await waitFor(SHORT_DELAY_IN_MS);
      animationPushTail2();
    }

    if(task === tasks.DeleteHead) {
      await waitFor(SHORT_DELAY_IN_MS);
      animationDeleteHead();
    }

    if(task === tasks.DeleteTail) {
      await waitFor(SHORT_DELAY_IN_MS);
      animationDeleteTail();
    }

    if (task === tasks.PushOnIndex) {
      if (indexSearch && list) {
        let i = 0;
        while (i <= indexSearch) {
          await waitFor(SHORT_DELAY_IN_MS);
          animationPushOnIndex1(list[i], i);
          i++;
        }
      }

      await waitFor(SHORT_DELAY_IN_MS);
      animationPushOnIndex2(indexSearch);

      await waitFor(SHORT_DELAY_IN_MS);
      animationPushOnIndex3();
    }

    if (task === tasks.DeleteOnIndex) {
      if (indexSearch && list) {
        let i = 0;
        while (i <= indexSearch) {
          await waitFor(SHORT_DELAY_IN_MS);
          animationDeleteOnIndex1(list[i], i);
          i++;
        }
      }

      await waitFor(SHORT_DELAY_IN_MS);
      animationDeleteOnIndex2(indexSearch);

      await waitFor(SHORT_DELAY_IN_MS);
      animationDeleteOnIndex3();
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
    setLoading(false);
  }

  function animationPushOnIndex1(item: IList, index: number) {
    if(list) {
      if(index !== 0) {
        list[index-1].temp = null;
        list[index-1].top = null;
        list[index-1].state = ElementStates.Changing;
        list[index].temp = values.text;
        list[index].top = values.text;
      } else {
        list[index].temp = values.text;
        list[index].top = values.text;
      }

      setList(list);
      setSteps(true);
    }
  }

  function animationPushOnIndex2(indexSearch: number | undefined) {
    if(list && indexSearch) {
      let i = 0;
      while(i < indexSearch) {
        list[i].state = ElementStates.Default;
        i++;
      }
      list[indexSearch].temp = null;
      list[indexSearch].top = null;
      list.splice(indexSearch, 0, {
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

  function animationPushOnIndex3() {
    if (values.text && values.index) {
      listAlg.insertAt(values.text, Number(values.index));
      getElements();
    }
    setLoading(false);
  }

  function animationDeleteOnIndex1(item: IList, index: number) {
    if (list) {
      list[index].state = ElementStates.Changing;
      setList(list);
      setSteps(true);
    }
  }

  function animationDeleteOnIndex2(indexSearch: number | undefined) {
    if(list && indexSearch) {
      list[indexSearch].state = ElementStates.Default;
      list[indexSearch].temp = list[indexSearch].value;
      list[indexSearch].bottom = list[indexSearch].value;
      list[indexSearch].value = null;

      setList(list);
      setSteps(true);
    }
  }

  function animationDeleteOnIndex3() {
    if (values.index) {
      listAlg.deleteAt(Number(values.index));
      getElements();
    }
    setLoading(false);
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
    setLoading(false);
  }

  function animationDeleteHead() {
    listAlg.deleteHead();
    getElements();
    setLoading(false);
  }

  function animationDeleteTail() {
    listAlg.deleteTail();
    getElements();
    setLoading(false);
  }

  function waitFor(msec: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, msec))
  }

  const handleClickPushHead = () => {
    if (values.text && list) {
      if (listAlg.getSize()) {
        list[0].temp = values.text;
        list[0].top = values.text;
        setSteps(true);
        setTask(tasks.PushHead);
        setLoading(true);
        animation(tasks.PushHead);
      } else {
        if (values.text) {
          listAlg.prepend(values.text)
          getElements();
        }
      }
    }
    setValues({text: '', index: null});
  }

  const handleClickPushTail = () => {
    if (values.text && list) {
      if (listAlg.getSize()) {
        list[list.length - 1].temp = values.text;
        list[list.length - 1].top = values.text;
        setSteps(true);
        animation(tasks.PushTail);
      } else {
        if (values.text) {
          listAlg.append(values.text)
          getElements();
        }
      }
    }
    setValues({text: '', index: null});
    setLoading(true);
    setTask(tasks.PushTail);
  }

  const handleClickDeleteHead = () => {
    if (list) {
      list[0].temp = list[0].value;
      list[0].bottom = list[0].value;
      list[0].value = null;
      setSteps(true);

      animation(tasks.DeleteHead);
      setLoading(true);
      setTask(tasks.DeleteHead);
    }
    setValues({text: '', index: null});
  }

  const handleClickDeleteTail = () => {
    if (list) {
      list[list.length-1].temp = list[list.length-1].value;
      list[list.length-1].bottom = list[list.length-1].value;
      list[list.length-1].value = null;
      setSteps(true);

      animation(tasks.DeleteTail);
      setLoading(true);
      setTask(tasks.DeleteTail);
    }
    setValues({text: '', index: null});
  }

  const handleClickPushOnIndex = () => {
    if (list && values.text && values.index) {
      if (listAlg.getSize()) {
        list[0].temp = values.text;
        list[0].top = values.text;
        setSteps(true);
        animation(tasks.PushOnIndex, values.index, values.text, list);
      } else {
        if (values.text && values.index === 0) {
          listAlg.prepend(values.text)
          getElements();
        }
      }
    }
    setValues({text: '', index: null});
    setLoading(true);
    setTask(tasks.PushOnIndex);
  }

  const handleClickDeleteOnIndex = () => {
    if (list && values.index) {
      if (listAlg.getSize() && values.index <= listAlg.getSize()-1) {
        animation(tasks.DeleteOnIndex, values.index, values.text, list);
      } else {
        if (values.text && values.index === 0) {
          listAlg.prepend(values.text)
          getElements();
        }
      }
    }
    setValues({text: '', index: null});
    setLoading(true);
    setTask(tasks.DeleteOnIndex);
  }

  const createContent = () => {
    let content: JSX.Element[] = [];
    let i = 0;
    if (list) {
      list.forEach((item, index) => {
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
              /> : (index === 0 && item.value !== null) ? `${HEAD}` : ""
              }
              tail={
                item.bottom !== null ? <Circle
                  letter={`${item.temp}`}
                  isSmall={true}
                  state={ElementStates.Changing}
                /> : index === list.length - 1 ? `${TAIL}` : ""
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

  //Выгрузка всех элементов из связанного списка
  const getElements = () => {
    let temp: Array<IList> = [];
    listAlg.print().forEach((item, index) => {
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
    setTask(null);
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
                maxLength={SHORT_MAX_LENGTH_STRING}
                extraClass={`${listStyle.inputWidth}`}
              />
              <span>Максимум - 4 символа</span>
            </div>
            <div className={listStyle.button}>
              <Button
                disabled={!values.text || loading ? true : false}
                onClick={handleClickPushHead}
                type="button"
                text="Добавить в head"
                extraClass={`${listStyle.mr12}`}
                isLoader={loading && task === tasks.PushHead}
              />
              <Button
                onClick={handleClickPushTail}
                disabled={!values.text || loading ? true : false}
                type="button"
                text="Добавить в tail"
                extraClass={`${listStyle.mr12}`}
                isLoader={loading && task === tasks.PushTail}
              />
              <Button
                onClick={handleClickDeleteHead}
                disabled={!listAlg.getSize() || loading ? true : false}
                type="button"
                text="Удалить из head"
                extraClass={`${listStyle.mr12}`}
                isLoader={loading && task === tasks.DeleteHead}
              />
              <Button
                onClick={handleClickDeleteTail}
                disabled={!listAlg.getSize() || loading ? true : false}
                type="button"
                text="Удалить из tail"
                extraClass={`${listStyle.mr12}`}
                isLoader={loading && task === tasks.DeleteTail}
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
                type={'number'}
                max={listAlg.getSize()-1}
                min={0}
                pattern={`^[0-9]+$`}
              />
            </div>
            <Button
              disabled={(!values.index || !values.text || loading) ? true : false}
              onClick={handleClickPushOnIndex}
              type="button"
              text="Добавить по индексу"
              extraClass={`${listStyle.mr12} ${listStyle.indexButtonWidth}`}
              isLoader={loading && task === tasks.PushOnIndex}
            />
            <Button
              onClick={handleClickDeleteOnIndex}
              disabled={!values.index || loading ? true : false}
              type="button"
              text="Удалить по индексу"
              extraClass={`${listStyle.mr12} ${listStyle.indexButtonWidth}`}
              isLoader={loading && task === tasks.DeleteOnIndex}
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

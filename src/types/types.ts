import { ElementStates } from "./element-states";

export interface ISteps {
  mas: Array<string>,
  changing?: Array<number>,
  modified?: Array<number>,
  default?: Array<number>,
}

export interface IStepsSorting {
  mas: Array<number>,
  changing?: Array<number>,
  modified?: Array<number>,
  default?: Array<number>,
}

export enum checkedRadio {
  Choice = "choice",
  Bubble = "bubble",
}

export enum actions {
  Push = "push",
  Pop = "pop",
}

export interface IButton {
  active: boolean,
  textbutton : string,
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export interface IStackSteps<T> {
  mas: Array<T>,
  changing?: Array<number>,
  modified?: Array<number>,
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export interface IQueueElements {
  value?: string | null,
  index?: number | null,
  head?: number | null,
  tail?: number | null,
  state?: ElementStates,
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}


export interface IList{
  value?: string | number | null,
  index?: number | null,
  top?: string | number | null,
  bottom?: string | number | null,
  temp?: string | number | null,
  state?: ElementStates,
}

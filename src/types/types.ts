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

export interface ISteps {
  mas: Array<string>,
  changing?: Array<number>,
  modified?: Array<number>,
  default?: Array<number>,
}

export enum checkedRadio {
  Choice = "choice",
  Bubble = "bubble",
}

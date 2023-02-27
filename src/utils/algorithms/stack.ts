import { IStack, IStackSteps } from "../../types/types";

  export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    public steps: Array<IStackSteps<T>> = [];

    push = (item: T): Array<IStackSteps<T>> => {
      this.container.push(item)
      this._steps();
      return this.steps;
    };

    show = (): void => {
      console.log("container", this.container);
      console.log("steps", this.steps);
    };

    pop = (): Array<IStackSteps<T>> => {
      if(this.getSize()) {
        this.container.pop()
      }
      this._steps();
      return this.steps;
    };

    peak = (): T | null => {
      if(this.getSize()) {
        return this.container[this.getSize()-1]
      }
      return null;
    };

    getSize = () => this.container.length;

    _steps = () => {
      let chan: Array<number> = [];
      chan.push(this.getSize()-1)
      this.steps.push({
        mas: this.container,
        changing: [...chan],
      })
      let mod: Array<number> = [];
      mod.push(this.getSize()-1)
      this.steps.push({
        mas: this.container,
        modified: [...mod],
      })
    }
  }

  export const newStack = new Stack<string>();

import { IStack, IStackSteps } from "../../types/types";

  class Stack<T> implements IStack<T> {
    private container: T[] = [];
    public steps: Array<IStackSteps<T>> = [];

    push = (item: T): Array<IStackSteps<T>> => {
      this.container.push(item)
      this._steps();
      return this.steps;
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

    clearContainet = () : void => {
      this.container = [];
    }

    _steps = () => {
      let chan: Array<number> = [];
      chan.push(this.getSize()-1)
      this.steps=[({
        mas: this.container,
        changing: chan,
      })]
    }
  }

  export const newStack = new Stack<string>();

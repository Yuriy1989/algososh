import { IStack } from "../../types/types";

  export class Stack<T> implements IStack<T> {
    container: T[] = [];

    push = (item: T): void => {
      this.container.push(item)
    };

    show = (): void => {
      console.log("container", this.container);
    };

    pop = (): void => {
      if(this.getSize()) {
        this.container.pop()
      }
    };

    peak = (): T | null => {
      if(this.getSize()) {
        return this.container[this.getSize()-1]
      }
      return null;
    };

    getSize = () => this.container.length;

  }

  export const newStack = new Stack<string>();
  // newStack.push("прив");
  // st.push("как");
  // st.push("сам?");
  // st.pop();
  // console.log(newStack.peak()); // как
  // st.push("дела?");
  // console.log(st.peak()); // дела?

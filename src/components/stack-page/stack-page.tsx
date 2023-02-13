import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {

  interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
  }
  
  class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
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
  
  const st = new Stack<string>();
  st.push("прив");
  st.push("как");
  st.push("сам?");
  st.pop();
  console.log(st.peak()); // как
  st.push("дела?");
  console.log(st.peak()); // дела?


  return (
    <SolutionLayout title="Стек">

    </SolutionLayout>
  );
};

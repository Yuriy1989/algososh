import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {

  // interface IQueue<T> {
  //   enqueue: (item: T) => void;
  //   dequeue: () => void;
  //   peak: () => T | null;
  // }
  
  // class Queue<T> implements IQueue<T> {
  //   private container: (T | null)[] = [];
  //   private head = 0;
  //   private tail = 0;
  //   private readonly size: number = 0;
  //   private length: number = 0;
  
  //   constructor(size: number) {
  //     this.size = size;
  //     this.container = Array(size);
  //   }
  
  //   enqueue = (item: T) => {
  //     if (this.length >= this.size) {
  //       throw new Error("Maximum length exceeded");
  //     }

  //     this.container[this.tail % this.size] = item;
  //     this.tail++;
  //     this.length++;
  //   };
  
  //   dequeue = () => {
  //     if (this.isEmpty()) {
  //       throw new Error("No elements in the queue");
  //     }
  
  //     this.container[this.head % this.size] = null;
  //     this.head++;
  //     this.length--;
  //   };
  
  //   peak = (): T | null => {
  //     if (this.isEmpty()) {
  //       throw new Error("No elements in the queue");
  //     }
  //     return this.container[this.head % this.size];
  //   };
  
  //   isEmpty = () => this.length === 0;
  // }
  
  // const queue = new Queue<number>(4);
  // queue.enqueue(12);
  // queue.enqueue(3);
  // queue.enqueue(33);
  // console.log(`peak ${queue.peak()}`); // 12
  // queue.dequeue();
  // queue.dequeue();
  // queue.enqueue(1);
  // queue.enqueue(2);
  // console.log(`peak ${queue.peak()}`); // 33


  interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
  }
  
  class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = next === undefined ? null : next;
    }
  }
  
  class Stack<T> implements IStack<T> {
    private top: Node<T> | null = null;
  
    constructor(node: Node<T>) {
      this.top = node;
    }
    push = (item: T): void => {
      
      // this.top = item;
    };
  
    pop = (): void => {
      if (this.isEmpty()) {
        throw new Error("stack is empty");
      }
      // Ваш код
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("stack is empty");
      }
      return this.top?.value || null;
    };
  
    isEmpty = (): boolean => {
      return this.top === null;
    };
  }
  
  const st = new Stack<string>(new Node("Йоу!"));
  st.push("как");
  st.push("сам?");
  st.pop();
  console.log(st.peak()); // как
  st.push("дела?");
  console.log(st.peak()); // дела?
  

  return (
    <SolutionLayout title="Очередь">

    </SolutionLayout>
  );
};

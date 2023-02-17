import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const ListPage: React.FC = () => {

  // class Node<T> {
  //   value: T
  //   next: Node<T> | null
  //   constructor(value: T, next?: Node<T> | null) {
  //     this.value = value;
  //     this.next = (next === undefined ? null : next);
  //   }
  // }
  
  // interface ILinkedList<T> {
  //   append: (element: T) => void;
  //   getSize: () => number;
  //   print: () => void;
  // }
  
  // class LinkedList<T> implements ILinkedList<T> {
  //   private head: Node<T> | null;
  //   private size: number;
  //   constructor() {
  //     this.head = null;
  //     this.size = 0;
  //   }
  
  //   append(element: T) {
  //     console.log("element = ", element);
  //     const node = new Node(element);
      
  //     if (this.size === 0) {
  //       this.head = node; 
  //   } else {
  //       let current = this.head;
  //       console.log("node = ", node, "this.size = ", this.size, "this.head = ", this.head,"current = ", current, "node.next = ", node.next);
  //       while(current?.next) {
  //           current = current.next;
  //       }

  //       if(current) {
  //         current.next = new Node(element);
  //       }
  //   }
  //     this.size++;
  //   }
  
  //   getSize() {
  //     return this.size;
  //   }
  
  //   print() {
  //     let curr = this.head;
  //     let res = '';
  //     while (curr) {
  //       res += `${curr.value} `;
  //       curr = curr.next;
  //     }
  //     console.log(res);
  //   }
  // }
  
  // const list = new LinkedList<number>();
  // list.append(12);
  // list.append(13);
  // list.append(14);
  // list.print(); // 12 13 14

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
      // Ваш код
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


  class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }
  
  interface ILinkedList<T> {
    append: (element: T) => void;
    getSize: () => number;
    print: () => void;
  }
  
  class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
      this.head = null;
      this.size = 0;
    }
  
    append(element: T) {
      const node = new Node(element);
      let curr = this.head;

      while(curr?.next) {
        if(curr.next === null){
          curr=node;
        }
      };
      console.log("node.head = ",this.head, "node.value = ",node.value, "node.next = ",node.next);
      console.log();
      // ваш код
      // for(let i = 0; i < this.size; i++){
      //   ifnode.next = element;
      // }
      this.size++;
    }
  
    getSize() {
      return this.size;
    }
  
    print() {
      let curr = this.head;
      let res = '';
      while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
      }
      console.log(res);
    }
  }
  
  const list = new LinkedList<number>();
  list.append(12);
  list.append(13);
  list.append(14);
  list.print(); // 12 13 14

  return (
    <SolutionLayout title="Связный список">

    </SolutionLayout>
  );
};

import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const ListPage: React.FC = () => {

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

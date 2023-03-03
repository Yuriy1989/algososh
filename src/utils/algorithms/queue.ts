import { IQueue } from "../../types/types";

  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
      this.size = size;
      this.container = Array(size).fill(null);
    }

    getContainer = () => {
      if(this.container) {
        return this.container;
      }
    }

    getHeadTail = () => {
      const headTail = {
        head: this.head,
        tail: this.tail,
      }
      return headTail;
    };

    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      }

      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    };

    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }

      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    };

    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      return this.container[this.head % this.size];
    };

    isEmpty = () => this.length === 0;

    clearContainet = () : void => {
      this.container = [];
      this.head = 0;
      this.tail = 0;
      this.length = 0;
      newQueue = new Queue<string>(7);
    }
  }

  export let newQueue = new Queue<string>(7);

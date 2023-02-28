import { IQueue } from "../../types/types";

  class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }

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
  }

  export const newQueue = new Queue<number>(4);
  newQueue.enqueue(12);
  newQueue.enqueue(3);
  newQueue.enqueue(33);
  console.log(`peak ${newQueue.peak()}`); // 12
  newQueue.dequeue();
  newQueue.dequeue();
  newQueue.enqueue(1);
  newQueue.enqueue(2);
  console.log(`peak ${newQueue.peak()}`); // 33

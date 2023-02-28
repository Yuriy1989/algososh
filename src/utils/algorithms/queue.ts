import { IQueue, IStackSteps } from "../../types/types";

  class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
    public steps: Array<IStackSteps<T>> = [];

    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }

    getSize = () => {
      console.log(this.container );
      return this.size;
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

    _steps = () => {
      let chan: Array<number> = [];
      chan.push(this.getSize()-1)
      this.steps=[({
        mas: this.container,
        changing: chan,
      })]
    }
  }

  export const newQueue = new Queue<string>(7);

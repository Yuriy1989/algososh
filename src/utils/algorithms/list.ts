import { ILinkedList } from "../../types/types";

  class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }

  class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    prepend(element: T) {
      let node = new Node(element, this.head);
      this.head = node;
      this.size++;

      if(!this.head) this.tail = node;
    }

    append(element: T) {
      const node = new Node(element);
      let current;

      if (this.head === null) {
        this.head = node;
      } else {
        current = this.head;
        while (current.next) {
          current = current.next;
        }

        current.next = node;
      }
      this.tail = node;
      this.size++;
    }

    deleteHead () {
      if(!this.head) return

      if(this.head.next){
        this.head = this.head.next;
        this.size--;
      } else {
        this.head = null;
        this.tail = null;
        this.size--;
      }
    }

    deleteTail () {
      const deletedTail = this.tail;
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        this.size--;
        return deletedTail;
      }
      let current = this.head;
      if(current) {
        while(current.next) {
          if(!current.next.next) {
            current.next = null;
          } else {
            current = current.next;
          }
        }
        this.tail = current;
        this.size--;
      }
    }

    insertAt(element: T, index: number) {
      if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
        return;
      } else {
        const node = new Node(element);
        if (index === 0) {
          node.next = this.head;
          this.head = node;
        } else {
          let curr = this.head;
          let currIndex = 0;
          while (currIndex < index-1) {
            currIndex++;
            if (curr?.next && currIndex !== index) {
              curr = curr.next;
            }
          }
          if (curr) {
            node.next = curr.next;
            curr.next = node;
          }
        }
        this.size++;
      }
    }

    deleteAt(index: number) {
      if (index < 0 || index > this.size) {
        return;
      }
      if (index === 0) {
        this.deleteHead();
      } else {
        let curr = this.head;
        let beforeNodeToDelete = null;
        let nodeToDelete = null;
        let currIndex = 0;
        while (currIndex < index) {
          if (curr && currIndex !== index) {
            beforeNodeToDelete = curr;
            nodeToDelete = curr.next;
            curr = curr.next;
            currIndex++;
          }
        }
        if (curr) {
          if (beforeNodeToDelete && nodeToDelete) {
            beforeNodeToDelete.next = nodeToDelete.next;
            nodeToDelete = null;
            this.tail = beforeNodeToDelete.next;
          }
        }
      }
      this.size--;
    }

    getSize() {
      return this.size;
    }

    print() {
      let curr = this.head;
      let res = [];
      while (curr) {
        res.push(curr.value);
        curr = curr.next;
      }
      return(res);
    }

    getHeadTail() {
      return this.head
    }

  }

  export const listAlg = new LinkedList<string | number>();

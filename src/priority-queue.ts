/**
 * Also known as a binary heap. The elements of the queue are ordered by a comparator. The head of the queue is the
 * least element with respect to the specified ordering.
 */
export class PriorityQueue<T> {

  private readonly data: T[] = [];
  private readonly comparator: (a: T, o: T) => number;

  public get size(): number {
    return this.data.length;
  }

  public constructor(comparator?: (a: T, o: T) => number) {
    this.comparator = comparator ? comparator :
      (a: T, o: T) => {
        const typeOfA = typeof a;
        const typeOfO = typeof o;

        if (typeOfA !== typeOfO) {
          throw Error(`Could not compare values of differing types: '${typeOfA}' and '${typeOfO}'.`);
        }

        if (typeof a === 'number' && typeof o === 'number') return o - a;
        if (typeof a === 'string' && typeof o === 'string') return o.localeCompare(a);

        throw Error(`Unable to compare values of type ${typeOfA}. No comparator was provided.`);
      };
  }

  public push(item: T): void {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  public peek(): T | undefined {
    return this.data[0];
  }

  public pop(): T | undefined {
    const result = this.data[0];
    const end = this.data.pop();
    if (end == null) return end;

    if (this.data.length > 0) {
      this.data[0] = end;
      this.sinkDown(0);
    }

    return result;
  }

  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  public remove(item: T) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== item) continue;

      const end = this.data.pop();
      if (i === this.data.length - 1) break;

      this.data[i] = end!;
      this.bubbleUp(i);
      this.sinkDown(i);

      break;
    }
  }

  public toArray(): T[] {
    const result: T[] = [];
    while (!this.isEmpty()) {
      result.push(this.pop()!);
    }
    return result;
  }

  private bubbleUp(index: number): void {
    if (index === 0) return;

    const c = this.indexComparator;

    const parentIndex = Math.floor(index / 2);
    if (c(parentIndex, index) < 0) {
      const current = this.data[index];
      this.data[index] = this.data[parentIndex];
      this.data[parentIndex] = current;
      this.bubbleUp(parentIndex);
    }
  }

  private sinkDown(index: number): void {
    const c = this.indexComparator;

    const leftIdx = index * 2;
    const rightIdx = index * 2 + 1;

    let idxOfLeastChildLessThanCurrent: number | null = null;

    if (leftIdx < this.data.length && c(index, leftIdx) < 0) {
      idxOfLeastChildLessThanCurrent = leftIdx;
    }

    if (rightIdx < this.data.length && c(index, rightIdx) < 0) {
      idxOfLeastChildLessThanCurrent = leftIdx < this.data.length && c(leftIdx, rightIdx) < 0 ? 
        rightIdx : leftIdx;
    }

    if (idxOfLeastChildLessThanCurrent == null) return;

    const current = this.data[index];
    this.data[index] = this.data[idxOfLeastChildLessThanCurrent];
    this.data[idxOfLeastChildLessThanCurrent] = current;
    
    this.sinkDown(idxOfLeastChildLessThanCurrent);
  }

  private indexComparator = (i: number, o: number) => {
    return this.comparator(this.data[i], this.data[o]);
  }
}

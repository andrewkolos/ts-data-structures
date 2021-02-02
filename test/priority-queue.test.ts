import { PriorityQueue } from '../src/priority-queue';

describe('priority queue', () => {

  it('gives the min priority element after many insertions', () => {
    const pq = new PriorityQueue<number>();
    [38, 23, 36, 32, 10, 45, 57].forEach(n => pq.push(n));
    const result: number[] = pq.toArray();
    expect(result).toEqual([10, 23, 32, 36, 38, 45, 57]);
  });

  it('removes a specific element', () => {
    const pq = new PriorityQueue<number>();
    [1, 2, 3, 4, 5].forEach(n => pq.push(n));
    pq.remove(3);
    expect(pq.toArray()).toEqual([1, 2, 4, 5]);
  });

  it('gives the correct size of the queue', () => {
    const pq = new PriorityQueue<number>();
    [1, 2, 3, 4, 5].forEach(n => pq.push(n));
    expect(pq.size).toBe(5);
    pq.pop();
    expect(pq.size).toBe(4);
    expect(pq.remove(3));
    expect(pq.size).toBe(3);
  });

  it('uses a comparator to sort when given', () => {
    const maxPq = new PriorityQueue<number>((a, b) => a - b);
    [1, 2, 3, 4, 5].forEach(n => maxPq.push(n));
    expect(maxPq.toArray()).toEqual([5, 4, 3, 2, 1]);
  });
});
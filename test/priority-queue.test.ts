import { PriorityQueue } from '../src/priority-queue';

describe('priority queue', () => {

  it('correctly gives the min priority element after many insertions', () => {
    const pq = new PriorityQueue<number>();
    [38, 23, 36, 32, 10, 45, 57].forEach(n => pq.push(n));
    const result: number[] = [];
    while (!pq.isEmpty()) {
      const next = pq.pop()!;
      result.push(next);
    }

    expect(result).toEqual([10, 23, 32, 36, 38, 45, 57]);
  });
});
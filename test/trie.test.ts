import { Trie } from '../src/trie';

describe('trie', () => {
  it(`can find a word that's been inserted`, () => {
    const trie = new Trie();
    trie.insert('word');
    expect(trie.contains('word')).toBe(true);
  });

  it('correctly identifies that a word is not stored', () => {
    const trie = new Trie();
    trie.insert('word');
    expect(trie.contains('word')).toBe(true);
    expect(trie.contains('otherWord')).toBe(false);
  });

  it('can find words that overlap', () => {
    const trie = new Trie();
    trie.insert('word');
    trie.insert('wordagain');
    expect(trie.contains('word')).toBe(true);
    expect(trie.contains('worda')).toBe(false);
    expect(trie.contains('wordagain')).toBe(true);
  });
});

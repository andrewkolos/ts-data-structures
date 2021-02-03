class TrieNode {

  private readonly _children = new Map<String, TrieNode>();

  public isEndOfWord: boolean = false;

  public constructor(public readonly parent: TrieNode | null = null) {}

  public addChild(char: string): TrieNode {
    if (char.length > 1) {
      throw Error(`A node may only represent a single character.`);
    }

    if (!this._children.has(char)) {
      this._children.set(char, new TrieNode(this));
    }

    return this._children.get(char)!;
  }

  public hasChild(char: string): boolean {
    return this._children.has(char);
  }

  public getChild(char: string): TrieNode {
    return this._children.get(char)!;
  }

}

export class Trie {
  private readonly root = new TrieNode();

  public insert(word: string) {
    let curr = this.root;
    [...word].forEach((c, i) => {
      curr = curr.addChild(c);
      if (i === word.length - 1) {
        curr.isEndOfWord = true;
      }
    })
  }

  public contains(word: string) {
    const endNode = this.travelToNode(word);

    if (!endNode) return false;

    return endNode.isEndOfWord;
  }

  public delete(word: string): boolean {
    const endNode = this.travelToNode(word);
    if (!endNode) return false;

    const wordExisted = endNode.isEndOfWord;
    endNode.isEndOfWord = false;

    return wordExisted;
  }

  private travelToNode(prefix: string): TrieNode | undefined {
    let curr = this.root;
    [...prefix].forEach(c => {
      if (curr.hasChild(c)) {
        curr = curr.getChild(c);
      } else {
        return undefined;
      }
    });

    return curr;
  }
}


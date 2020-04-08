import React from "react";
import Queue from "./Queue";

export default class BinarySearchTree extends React.Component {
  constructor(key = null, value = null, parent = null) {
    super();
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else if (key > this.key) {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      return new Error();
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this.replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.right = node.right;
        this.left = node.left;
      } else {
        this.key = null;
        this.value = null;
        this.right = null;
        this.left = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfs(values = []) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  //__________________IN-ORDER TRAVERSAL___________________
  inOrder(values = []) {
    if (this.left) {
      values = this.left.inOrder(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }

  //______________PRE-ORDER TRAVERSAL___________________
  preOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.preOrder(values);
    }

    if (this.right) {
      values = this.right.preOrder(values);
    }
    return values;
  }

  //___________________POST-ORDER TRAVERSAL__________________________
  postOrder(values = []) {
    if (this.left) {
      values = this.left.postOrder(values);
    }

    if (this.right) {
      values = this.right.postOrder(values);
    }
    values.push(this.value);
    return values;
  }

  render() {
    return <div>BinarySearchTree</div>;
  }

  //____________________LEVEL-ORDER TRAVERSAL_______________________
  levelOrder(values = []) {
    let q = new Queue();
    q.enqueue(this);
    while (!q.isEmpty()) {
      const node = q.dequeue();
      values.push(node.value);
      if (node.left) {
        q.enqueue(node.left);
      }
      if (node.right) {
        q.enqueue(node.right);
      }
    }
    return values.join(" > ");
  }
}

import React from "react";
import BinarySearchTree from "./BinarySearchTree";
import "./App.css";
import Queue from "./Queue";

function App() {
  const exampleDataset =
    "89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5";
  // Setup dataset for tree traversal functions
  const traversalDataset = "25 15 50 10 24 35 70 4 12 18 31 44 66 90 22";
  const splitDataset = traversalDataset.split(" ");
  const BST = new BinarySearchTree();
  splitDataset.forEach((data) => {
    BST.insert(parseInt(data), data);
  });
  // console.log(BST.inOrder());
  // console.log(BST.preOrder());
  // console.log(BST.postOrder());

  // Setup dataset for level-order traversal
  const starTrekBST = new BinarySearchTree();
  starTrekBST.insert(5, "Captain Picard");
  starTrekBST.insert(3, "Commander Riker");
  starTrekBST.insert(6, "Commander Data");
  starTrekBST.insert(2, "Lt. Cmdr. Worf");
  starTrekBST.insert(4, "Lt. Cmdr. LaForge");
  starTrekBST.insert(1, "Lieutenant security-officer");
  starTrekBST.insert(8, "Lt. Cmdr. Crusher");
  starTrekBST.insert(7, "Lieutenant Selar");
  // console.log(starTrekBST);
  console.log(starTrekBST.levelOrder());

  // Testing .isEmpty() method
  const testQueue = new Queue();
  testQueue.enqueue(4);
  // console.log(testQueue.isEmpty());

  //_________________LINEAR SEARCH W/ COUNTER____________________________
  const linearSearch = (array, value) => {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
      counter++;
      if (parseInt(array[i]) === parseInt(value)) {
        console.log(`found "${value}" at position ${i}`);
        console.log(`search completed in ${counter} searches`);
        return i;
      } else if (
        parseInt(array[i]) !== parseInt(value) &&
        i === array.length - 1
      ) {
        console.log(`didnt't find "${value}" in the given dataset`);
      }
    }
    console.log(`search completed in ${counter} searches`);
    return -1;
  };

  //_____________________BINARY SEARCH W/ COUNTER__________________________
  let counter = 0;
  const binarySearch = (array, value, start, end) => {
    if (start === end) {
      console.log(`didn't find search item`);
      console.log(`search completed in ${counter} searches`);
      return -1;
    }
    console.log(start, end);
    const index = Math.floor((start + end) / 2);
    const item = parseInt(array[index]);

    // I don't think this if statement is working
    if (parseInt(item) === parseInt(value)) {
      counter++;
      console.log(`found "${value}" at position ${index}`);
      console.log(`search completed in ${counter} searches`);
      return index;
    } else if (item < value) {
      counter++;
      return binarySearch(array, value, index + 1, end);
    } else if (item > value) {
      counter++;
      return binarySearch(array, value, start, index - 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let dataset = e.target.dataset.value || exampleDataset;
    const search = parseInt(e.target.search.value);
    dataset = dataset.split(" ");
    // linearSearch(dataset.split(" "), search);
    binarySearch(dataset.sort(), search, 0, dataset.length);
  };

  return (
    <div className="App">
      <h1>Search Type Tester</h1>
      <form onSubmit={(e) => handleSearch(e)}>
        <label htmlFor="dataset">Data</label>
        <textarea
          type="text"
          rows="20"
          columns="50"
          name="dataset"
          id="dataset"
        ></textarea>
        <label htmlFor="search">Search</label>
        <input type="text" name="search" id="search" />
        <button type="submit">Search</button>
      </form>
      <BinarySearchTree />
    </div>
  );
}

export default App;

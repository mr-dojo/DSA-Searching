import React from "react";
import "./App.css";

function App() {
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

  const handleSearch = (e) => {
    e.preventDefault();
    const dataset = e.target.dataset.value.split(" ");
    const search = e.target.search.value;
    linearSearch(dataset, search);
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
    </div>
  );
}

export default App;

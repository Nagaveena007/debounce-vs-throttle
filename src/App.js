import React, { useState, useCallback} from "react";
import {debounce} from "lodash-es";
import "./App.css";

function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay] 
  );
  return debouncedFn;
}

function App() {
  const [value, setValue] = useState("");
  const [dbValue, setDbValue] = useState(""); 

  const debouncedSave = useDebounce((nextValue) => setDbValue(nextValue), 1000);

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };

  return (
    <main>
      <h1>Editor</h1>
      <textarea value={value} onChange={handleChange} rows={5} cols={50} />
      <section className="panels">
        <div>
          <h2>(without debounce)</h2>
          {value}
        </div>
        <div>
          <h2>debounce</h2>
          {dbValue}
        </div>
      </section>
    </main>
  );
}

export default App;

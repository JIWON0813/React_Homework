import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [value, SetValue] = useState(0);

  const IncreaseHandle = () =>{
    SetValue(value + 1);
  }

  const DecreaseHandle = () =>{
    SetValue(value - 1);
  }

  return (
    <div>
      <p>{value}</p>
      <button onClick={IncreaseHandle}>
        올림
      </button>
      <button onClick={DecreaseHandle}>
        내림
      </button>
    </div>
  );
}

export default App;

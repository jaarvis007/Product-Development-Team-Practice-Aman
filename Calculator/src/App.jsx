import { useState } from 'react';
import {Header} from './components/Header'
import './App.css'
import { DataStore } from './store/DataContext';

function App() {
  
  const [name,setName]=useState('aman');
  const [displayText,setDisplayText]=useState("0");
  const button = ["C", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "/", "*","="];

  const updateText = (event) => {
    const value = event.target.textContent;
    if (value === "C") {
        setDisplayText("0");
    } else if (value === "=") {
        try {
            setDisplayText(eval(displayText)); 
        } catch {
            setDisplayText("Error");
        }
    } else {
        setDisplayText((prev) => (prev === "0" ? value : prev + value));
    }
};


  return (
    <DataStore.Provider value={name}>
      <>
    <Header/>
    <div className='main-cal'>
  
      <input type="text" className='input-cont' value={displayText}/>
      <div className='button-cont'>
        {
          button.map((item,index)=>(
            <button 
            key={index} 
            onClick={updateText}
            value={item}
            >
              {item}
            </button>
          ))
        }
      </div>
    </div>
    </>
    </DataStore.Provider>

    
    
  )
}
export default App

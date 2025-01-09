import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time,setTime]=useState(Date());
  console.log(1);

  useEffect(()=>{

    setInterval(() => {
      setTime(Date());
    }, 1000);
  },[])
  
  
  return (
    <center>
      Date And Time is {time}
    </center>
  )
}

export default App

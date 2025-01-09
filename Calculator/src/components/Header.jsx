import { useContext } from "react";
import { DataStore } from "../store/DataContext";



export function Header(){
  const dataFromStore=useContext(DataStore);


  return <div>Hi {dataFromStore}</div>;
};


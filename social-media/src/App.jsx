
import './App.css'
import {Header} from './components/Header'
import {Sider} from './components/Sider'
import {Form} from './components/Form'
import {PostList} from './components/PostList'
import { useState } from 'react'
import PostListProvider from './store/postList-store'


function App() {

  const [selected,setSelected]=useState("Home");

  const handleSelected=()=>{
    if(selected==="Home") setSelected("Create Post");
    else setSelected("Home")
  }

  return (
    <PostListProvider>
      <div className='main-cont'>
        <Sider className='Sider' selected={selected} setSelected={setSelected} handleSelected={handleSelected}></Sider>
        <div className='content'>
        <Header className='header'></Header>
        {selected==="Home" &&<PostList></PostList>}
        {selected!=="Home" && <Form></Form>}        
        </div>
      </div>
    </PostListProvider>
    
  )
}

export default App

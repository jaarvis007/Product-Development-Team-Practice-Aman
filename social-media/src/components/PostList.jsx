
import { useContext } from 'react'
import {Post} from './Post'
import {PostList as PostListData} from '../store/postList-store'

export const PostList = () => {


  const ListData=useContext(PostListData).postList;


  return (
    <div>
      {ListData.map((post)=><Post key={post.id} post={post}/>)}
    </div>
  )
}

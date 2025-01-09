import { MdDelete } from "react-icons/md";
import { PostList } from "../store/postList-store";
import { useContext } from "react";
export const Post = ({post}) => {

  const deletePost=useContext(PostList).deletePost;

  return (
    <div className="card post-card" style={{width: "30rem"}}>
    
    <div className="card-body">
      <h5 className="card-title">{post.title}
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      onClick={()=>deletePost(post.id)}
      >
    
      <MdDelete />
    
  </span>
      </h5>
      
      <p className="card-text">{post.body}</p>
     
      {post.tags.map((tag) => (
      <button type="button" key={tag} className="btn btn-primary btn-sm post-tags">{tag}
      </button>
    ))}
     
    </div>

    <div className="alert alert-success reactions"  role="alert" style={{width: "95%"}}>
  You got {post.reactions} Likes
</div>
  </div>
  )
}

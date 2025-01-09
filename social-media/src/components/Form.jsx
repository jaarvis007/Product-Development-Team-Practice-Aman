import React, { useContext, useRef } from "react";
import { PostList } from "../store/postList-store";

export const Form = () => {
  const userID = useRef();
  const postTitle = useRef();
  const postContent = useRef();
  const reactions = useRef();
  const postTags = useRef();

  const addPost = useContext(PostList).addPost;

  const handleSubmit = (e) => {
    e.preventDefault;

    addPost(
      userID.current.value,
      postTitle.current.value,
      postContent.current.value,
      reactions.current.value,
      postTags.current.value.split(" ")
    );
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="UserId" className="form-label">
          UserID
        </label>
        <input
          ref={userID}
          type="text"
          className="form-control"
          id="UserId"
          aria-describedby="emailHelp"
          placeholder="Your UserID"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          ref={postTitle}
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          placeholder="Write the title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={postContent}
          type="text"
          className="form-control"
          id="body"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number Of Reactions
        </label>
        <input
          ref={reactions}
          type="number"
          className="form-control"
          id="reactions"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          ref={postTags}
          type="text"
          className="form-control"
          id="tags"
          aria-describedby="emailHelp"
          placeholder="input multiple tags separted by space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

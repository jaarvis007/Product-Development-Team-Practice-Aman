import { useReducer, createContext, act } from "react";

const DEFAULT_TASKS = [
  {
    id: "1",
    title: "Going to GOA",
    body: "Ghumnee Chalooooooooo",
    reactions: 4,
    userID: "user9",
    tags: ["Enjoy", "Vacations"],
  },
  {
    id: "2",
    title: "PAss Hogyeee",
    body: "kjfhdekjd",
    reactions: 100,
    userID: "user10",
    tags: ["ce", "cdscsd"],
  },
];

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const PostListReducer = (currPostList, action) => {
  let newPostList = currPostList;

  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postID
    );
  }

  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    PostListReducer,
    DEFAULT_TASKS
  );

  const addPost = (userID, postTitle, postContent, reactions, postTags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postContent,
        reactions: reactions,
        userID: userID,
        tags: postTags,
      },
    });
  };

  const deletePost = (postID) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postID: postID,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;

import React from "react";
import Skeleton from "./Skeleton";
const Feed = () => {
  return (
    <div>
      <Skeleton value={<Posts />} />
    </div>
  );
};

export default Feed;

const Posts = () => {
  return (
    <>
      <Post />
    </>
  );
};

const Post = () => {
  const arr = [1];

  return (
    <>
      {arr.map((p, i) => (
        <div key={i}>post</div>
      ))}
    </>
  );
};

import React from "react";
import Post from "./Post/Post";

const PostSection = ({posts, title="Get started with our best stories"}) => {
  return (
    <section className="border-t border-gray-300 my-10">
        <h2 className="text-2xl font-semibold my-3">{title}</h2>
      <div className="grid grid-cols-3 gap-6">
        {posts?.map((post)=><Post post={post} key={post._id}/>)}
      </div>
    </section>
  );
};

export default PostSection;

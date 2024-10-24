import { htmlToText } from "html-to-text";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`}>
      <article className="max-w-[25rem] cursor-pointer">
        <div className=" max-w-[25rem] rounded-2xl overflow-hidden h-[30rem]">
          <img src={post?.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className=" p-2 space-y-2">
          <p className="text-3xl font-bold">{post?.title}</p>
          <p className="text-lg text-gray-600 my-2">
          {htmlToText(post?.description).substring(0, 125)}...
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Post;

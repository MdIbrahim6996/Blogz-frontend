import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostDetailsAction,
  toggleAddDisLikesToPost,
  toggleAddLikesToPost,
} from "../../redux/slices/posts/postSlices";

import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import PostDetailSkeleton from "./PostDetailSkeleton";

const src = `https://basho.fueko.net/content/images/size/w1200/2022/03/photo-1644478509397-27d9b27771fe.jpeg`;

const PostDetail = () => {
  const dispatch = useDispatch();
  const { postDetails, loading } = useSelector((state) => state.post);
  const { userAuth } = useSelector((state) => state.users);
  const { likes, dislikes } = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, likes, dislikes]);

  return (
    <div>
      {loading ? (
        <PostDetailSkeleton />
      ) : (
        <div>
          <section className="flex justify-between my-10">
            <div className="w-[60%] transition-all duration-1000">
              <div className="flex space-x-1 text-sm mb-4">
                <span className="capitalize bg-gray-200 py-1 px-5 rounded-full">
                  {postDetails?.category}
                </span>
              </div>
              <h1 className="text-7xl font-bold hover:underline">
                {postDetails?.title}
              </h1>
              <p className="text-2xl mt-10 font-semibold text-gray-800">
                {postDetails?.description.substring(0, 200)}...
              </p>

              <div className="space-x-3 my-4 flex">
                <div className="text-center">
                  <ThumbUpIcon
                    onClick={() =>
                      dispatch(toggleAddLikesToPost(postDetails?.id))
                    }
                    className={`h-7 ${
                      postDetails?.likes[0] === userAuth?._id
                        ? "bg-sky-500 text-white"
                        : "text-sky-500"
                    } border border-sky-500 cursor-pointer px-6 py-1 rounded-md`}
                  />
                  <p className="text-gray-500">
                    {postDetails?.likes?.length} likes
                  </p>
                </div>
                <div className="text-center">
                  <ThumbDownIcon
                    onClick={() =>
                      dispatch(toggleAddDisLikesToPost(postDetails?.id))
                    }
                    className={`h-7 ${
                      postDetails?.disLikes[0] === userAuth?._id
                        ? "bg-red-500 text-white"
                        : "text-red-500"
                    } border border-red-500 cursor-pointer px-6 py-1 rounded-md`}
                  />
                  <p className="text-gray-500">
                    {postDetails?.disLikes?.length} dislikes
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={postDetails?.user?.profilePhoto} alt="" />
                </div>

                <div className="flex flex-col text-sm -space-y-1">
                  <Link to={`/user/${postDetails?.user?._id}`}>
                    <p className="capitalize font-semibold cursor-pointer hover:underline">
                      {postDetails?.user?.firstName}{" "}
                      {postDetails?.user?.lastName}
                    </p>
                  </Link>
                  <p>{dayjs(postDetails?.createdAt).format("D MMM YYYY")}</p>
                </div>
              </div>
            </div>
            <div className="w-[27rem] h-[35rem] rounded-3xl overflow-hidden">
              <img
                src={postDetails?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="my-20 w-[55%] mx-auto">
            <p className="text-xl text-center mb-10">
              {postDetails?.description}
            </p>

            <Comments />
          </section>
        </div>
      )}
    </div>
  );
};

export default PostDetail;

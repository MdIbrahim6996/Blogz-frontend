import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  fetchCommentAction,
} from "../../redux/slices/comments/commentSlices";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Comments = () => {
  const dispatch = useDispatch();
  const { loading, commentDetails, appErr, serverErr } = useSelector(
    (state) => state.comment
  );
  const { userAuth } = useSelector((state) => state.users);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [id, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(createCommentAction({ comment: data.comment, postId: id }));
    dispatch(fetchCommentAction(id));
    reset();
  };
  return (
    <div>
      <h2 className="text-xl font-semibold capitalize">
        comments {commentDetails?.length}
      </h2>
      {userAuth && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col my-4">
            {/* <label htmlFor="comment" className="font-semibold text-lg capitalize">
            comment
          </label> */}
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Create a new comment"
              className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
              {...register("comment", {
                required: "Text is required",
                minLength: 1,
              })}
            />

            {errors?.comment ? (
              <p className="text-red-500 mt-1">{errors?.comment?.message}</p>
            ) : (
              <p></p>
            )}
            {errors?.comment?.type === "minLength" ? (
              <p className="text-red-500 mt-1">
                Comment should be at least 1 character
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <button
            type="submit"
            className="bg-violet-500 text-white capitalize py-2 px-16 font-semibold rounded-md "
          >
            create
          </button>
        </form>
      )}
      <div className="my-4 space-y-3">
        {commentDetails && commentDetails?.length > 0 ? (
          commentDetails.map((comment) => (
            <article
              key={comment?._id}
              className="border rounded-md p-4 shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12">
                  <img
                    src={comment?.user?.profilePhoto}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="-space-y-1">
                  <Link to={`/user/${comment?.user?._id}`}>
                    <p className="capitalize font-semibold cursor-pointer hover:underline">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </p>
                  </Link>
                  <p className="capitalize text-gray-500">
                    {dayjs(comment?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              {comment?.user?._id === userAuth?._id && (
                <div className="space-x-1 my-4">
                  <span className="bg-sky-500 cursor-pointer text-white px-6 py-1 text-sm rounded-md">
                    Edit
                  </span>
                  <span className="bg-red-500 cursor-pointer text-white px-6 py-1 text-sm rounded-md">
                    Delete
                  </span>
                </div>
              )}
              <p className="mt-2">{comment?.description}</p>
            </article>
          ))
        ) : (
          <p>No Comments to Show</p>
        )}
      </div>
    </div>
  );
};

export default Comments;

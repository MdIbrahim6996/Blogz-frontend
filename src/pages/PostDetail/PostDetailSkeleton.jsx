import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostDetailSkeleton = () => {
  return (
    <>
      <section className="flex justify-between my-10">
        <div className="w-[60%] ">
          <div className="flex space-x-1 mb-4">
            <span className="w-16">
              <Skeleton height={25} />
            </span>
            <span className="w-16">
              <Skeleton height={25} />
            </span>
            <span className="w-16">
              <Skeleton height={25} />
            </span>
            <span className="w-16">
              <Skeleton height={25} />
            </span>
          </div>
          <h1>
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </h1>
          <p className="text-2xl mt-10 font-semibold text-gray-800">
            <Skeleton count={5} />
          </p>

          {/* <div className="space-x-3 my-4 flex">
            <div className="text-center">
              <ThumbUpIcon
                onClick={() => dispatch(toggleAddLikesToPost(postDetails?.id))}
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
                  {postDetails?.user?.firstName} {postDetails?.user?.lastName}
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
        </div> */}
        </div>
        <div className="w-[27rem] h-[35rem]">
          <Skeleton height={500} />
        </div>
      </section>

      <section className="my-5 w-[55%] mx-auto">
        <Skeleton count={25}/>
      </section>
    </>
  );
};

export default PostDetailSkeleton;

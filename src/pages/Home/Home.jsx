import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction } from "../../redux/slices/posts/postSlices";
import Post from "../../components/PostSection/Post/Post";

const Home = () => {
  const { postLists, loading } = useSelector((state) => state.post);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction({ page, category }));
  }, [page]);
  return (
    <div>
      <section className="lg:mt-16 mt-10">
        <h1 className="lg:text-8xl text-5xl">
          <span className="font-bold">Hey, we’re Blogerz.</span>
          <span> See our thoughts, stories and ideas.</span>
        </h1>

        <div className="lg:my-24 my-10 space-y-3">
          <div className="bg-gray-200 lg:w-[35rem] flex rounded-full">
            <input
              type="text"
              className="lg:text-2xl text-lg py-2 lg:py-4 px-7 rounded-lg w-full bg-transparent outline-none"
              placeholder="Newsletter..."
            />

            <button className="capitalize bg-black lg:py-4 py-2 lg:px-14 px-4 rounded-full text-white lg:text-2xl text-lg font-medium">
              subscribe
            </button>
          </div>
          <p className="mx-3 text-lg">
            Get the email newsletter and unlock access to members-only content
            and updates
          </p>
        </div>
      </section>

      {loading ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Skeleton className="h-[27rem] mb-5 rounded-md" />
            <Skeleton count={5} />
          </div>
          <div>
            <Skeleton className="h-[27rem] mb-5 rounded-md" />
            <Skeleton count={5} />
          </div>
          <div>
            <Skeleton className="h-[27rem] mb-5 rounded-md" />
            <Skeleton count={5} />
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-4xl font-semibold my-3 capitalize underline">
            latest posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postLists?.posts?.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
          {postLists?.totalPages > 1 && (
            <div className="space-x-3 flex items-center justify-center">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                className="bg-red-500 disabled:bg-red-500/50 py-1 px-4 cursor-pointer rounded-md text-white my-2"
                disabled={page <= 1}
              >
                Prev
              </button>
              <p className="text-xl font-semibold">{page}</p>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-sky-500 disabled:bg-sky-500/50 py-1 px-4 rounded-md text-white  my-2"
                disabled={page >= postLists?.totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;

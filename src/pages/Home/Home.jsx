import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction } from "../../redux/slices/posts/postSlices";
import Post from "../../components/PostSection/Post/Post";

const Home = () => {
  const { postLists, loading } = useSelector((state) => state.post);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction({page, category}));
  }, [page]);
  return (
    <div>
      <section className="mt-16">
        <h1 className="text-8xl">
          <span className="font-bold">Hey, we’re Blogerz.</span>
          <span> See our thoughts, stories and ideas.</span>
        </h1>

        <div className="my-24 space-y-3">
          <div className="bg-gray-200 w-[35rem] flex rounded-full">
            <input
              type="text"
              className="text-2xl py-4 px-7 rounded-lg w-full bg-transparent outline-none"
              placeholder="Newsletter..."
            />

            <button className="capitalize bg-black py-4 px-14 rounded-full text-white text-2xl font-medium">
              subscribe
            </button>
          </div>
          <p className=" mx-3 text-lg">
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
          <h2 className="text-4xl font-semibold my-3 ">This is latest posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postLists?.posts?.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-sky-500 py-1 px-4 rounded-md text-white text-sm my-2"
          >
            next
          </button>
        </section>
      )}
    </div>
  );
};

export default Home;

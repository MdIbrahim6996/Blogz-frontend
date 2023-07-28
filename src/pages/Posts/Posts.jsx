import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchPostsAction } from "../../redux/slices/posts/postSlices";
import Post from "../../components/PostSection/Post/Post";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

const Posts = () => {
  const [page, setPage] = useState(1);
  const [category, setcategory] = useState("All");
  const { postLists, loading } = useSelector((state) => state.post);
  const { categoryList } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction({ page, category }));
  }, [page, category]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  return (
    <main className="flex gap-4">
      {loading ? (
        <div className="flex-1 mt-16">
          <Skeleton height={200} />{" "}
        </div>
      ) : (
        <div className="flex-1 ">
          <h2 className="text-2xl font-semibold my-3 mb-4 underline">
            Filter by Categories
          </h2>

          <ul className="space-y-2  bg-black rounded-lg h-fit p-4">
            <li
              onClick={() => setcategory("All")}
              className="bg-white hover:pl-5 duration-300 p-2 rounded-sm font-semibold cursor-pointer hover:bg-gray-200 italic transition-all"
            >
              All
            </li>
            {categoryList?.map((cat) => (
              <li
                key={cat?._id}
                onClick={() => setcategory(cat?.title)}
                className="bg-white p-2 hover:pl-5 italic rounded-sm font-semibold cursor-pointer hover:bg-gray-200 transition-all"
              >
                {cat?.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      <section className="flex-[5] my-1">
        <h2 className="text-2xl font-semibold my-3 underline">Latest Blog Posts</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postLists?.posts?.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
        )}
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
      </section>
    </main>
  );
};

export default Posts;

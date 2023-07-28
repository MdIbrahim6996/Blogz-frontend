import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

const Categories = () => {
  const { categoryList, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  return (
    <main className="flex gap-4 min-h-screen">
      <section className="flex-[5] my-1">
        <h2 className="text-2xl font-semibold my-3 underline">All Categories</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-20 mb-5 rounded-md" />
            <Skeleton className="h-20 mb-5 rounded-md" />
            <Skeleton className="h-20 mb-5 rounded-md" />
            <Skeleton className="h-20 mb-5 rounded-md" />
            <Skeleton className="h-20 mb-5 rounded-md" />
            <Skeleton className="h-20 mb-5 rounded-md" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryList?.map((category) => (
              <div className="bg-black cursor-pointer text-lg font-semibold text-white rounded-md text-center p-5 hover:bg-transparent hover:text-black border transition-all duration-200 border-black">
                {category?.title}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Categories;

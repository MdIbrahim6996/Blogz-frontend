import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";

import {
  createCategoryAction,
  deleteCategoriesAction,
  fetchCategoriesAction,
} from "../../../redux/slices/category/categorySlice";
import { useEffect, useState } from "react";

const Category = () => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const deleteCategory = async (id) => {
    await dispatch(deleteCategoriesAction(id));
    dispatch(fetchCategoriesAction());
  };

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const onSubmit = async (data) => {
   await dispatch(createCategoryAction(data?.category));
    dispatch(fetchCategoriesAction());
    reset();
  };

  return (
    <section className="relative h-screen">
      <div className="w-[40%] relative top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white">
        <h1 className="text-4xl font-semibold capitalize">create category</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col my-4">
            <label
              htmlFor="category"
              className="font-semibold text-lg capitalize"
            >
              category name
            </label>
            <input
              type="category"
              name="category"
              id="category"
              className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
              {...register("category", {
                required: "Category name is required",
                minLength: 2,
              })}
            />

            {errors?.category ? (
              <p className="text-red-500 mt-1">{errors?.category?.message}</p>
            ) : (
              <p></p>
            )}
            {errors?.category?.type === "minLength" ? (
              <p className="text-red-500 mt-1">Category name is too short</p>
            ) : (
              <p></p>
            )}
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white capitalize py-2 px-16 font-semibold rounded-md my-4"
          >
            create
          </button>
        </form>

        <div className="my-5 flex flex-wrap gap-2">
          {categoryList?.length > 0 ? (
            categoryList?.map((category) => (
              <p
                key={category._id}
                className="bg-gray-200 rounded-lg py-2 px-4 capitalize font-semibold"
              >
                {category?.title}
                <span
                  onClick={() => deleteCategory(category._id)}
                  className="bg-red-500 text-white ml-2 px-2 text-xs rounded-md cursor-pointer"
                >
                  X
                </span>
              </p>
            ))
          ) : (
            <p className="text-gray-500">No categories to show</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Category;

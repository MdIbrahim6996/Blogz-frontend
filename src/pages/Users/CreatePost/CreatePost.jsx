import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createpostAction } from "../../../redux/slices/posts/postSlices";
import Select from "react-select";
import { fetchCategoriesAction } from "../../../redux/slices/category/categorySlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);
  const { categoryList } = useSelector((state) => state.category);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const options = categoryList?.map((cat) => ({
    value: cat?.title,
    label: cat?.title,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleFileChange = async (e) => {
    setErr("");
    if (!e.target.files) return;
    const file = e.target.files[0];
    // console.log(file);
    if (file.size > 10000000) {
      setErr("Image size should be less than 10mb");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
  };

  const onSubmit = (data) => {
    console.log({ ...data, image, category });
    dispatch(createpostAction({ ...data, image, category:category?.value }));
    reset();
    setImage("");
    // navigate("/");
  };

  return (
    <section className="flex min-h-screen">
      <div className="bg-white w-full flex justify-center items-center">
        <div className="w-[40%] mt-5">
          <h1 className="text-4xl font-semibold">Create Post</h1>
          {state?.appErr && (
            <p className="text-red-500 mt-1">{state?.appErr}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col my-4">
              <label
                htmlFor="title"
                className="font-semibold text-lg capitalize"
              >
                title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                autoFocus={true}
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("title", {
                  required: "Title is required",
                  minLength: 20,
                  maxLength: 200,
                })}
              />

              {errors?.title ? (
                <p className="text-red-500 mt-1">{errors?.title?.message}</p>
              ) : (
                <p></p>
              )}
              {errors?.title?.type === "minLength" ||
              errors?.title?.type === "maxLength" ? (
                <p className="text-red-500 mt-1">
                  Title should be between 20 and 200 characters long
                </p>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex flex-col my-4">
              <label
                htmlFor="description"
                className="font-semibold text-lg capitalize"
              >
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                rows={10}
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("description", {
                  required: "Description is required",
                  minLength: 50,
                })}
              />

              {errors?.description ? (
                <p className="text-red-500 mt-1">
                  {errors?.description?.message}
                </p>
              ) : (
                <p></p>
              )}
              {errors?.description?.type === "minLength" ? (
                <p className="text-red-500 mt-1">
                  Description should be minimum 50 characters long
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <Select
              isClearable={true}
              name="category"
              options={options}
              onChange={(value) => setCategory(value)}
              className="mb-5"
            />
            <label
              htmlFor="image"
              className="border border-black py-2 px-10 text-center w-full rounded-md"
            >
              Select a Photo
            </label>
            <input
              type="file"
              name="image"
              id="image"
              hidden
              accept="image/*"
              onChange={handleFileChange}
              className="my-3"
            />
            {err && <p className="text-red-500 my-2">{err}</p>}

            {image && (
              <div className="relative w-full my-1 mt-4">
                <img
                  src={image}
                  alt="image"
                  className="w-full h-64 object-cover rounded-md"
                />
                <div
                  className="absolute top-2 cursor-pointer right-2 rounded-full text-white bg-black/70 p-2 font-bold z-10"
                  onClick={(e) => {
                    setImage(null);
                    e.target.files = null;
                  }}
                >
                  X
                </div>
              </div>
            )}

            <button className="bg-pink-500 text-white capitalize py-2 px-10 font-semibold rounded-md my-4">
              create post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostDetailsAction,
  updatePostAction,
} from "../../../redux/slices/posts/postSlices";
import Select from "react-select";
import { fetchCategoriesAction } from "../../../redux/slices/category/categorySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const state = useSelector((state) => state.users);
  const { postDetails } = useSelector((state) => state.post);

  const { categoryList } = useSelector((state) => state.category);
  const [err, setErr] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(postDetails?.image);
  const [value, setValue] = useState(postDetails?.description);

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    reset({
      title: postDetails?.title,
    });
    setImage(postDetails?.image);
    setValue(postDetails?.description);
    setCategory(postDetails?.category);
  }, [postDetails]);
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
    if (file.size > 10000000) {
      setErr("Image size should be less than 10mb");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onSubmit = (data) => {
    if (!category) {
      setErr("No Category Selected :(");
      return;
    }
    dispatch(
      updatePostAction({
        ...data,
        image,
        category: category?.value,
        description: value,
        id,
      })
    );
    reset();
    setErr("");
    setImage("");
    setValue("");
    setCategory("");
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

            <div className="flex flex-col my-4">
              <label
                htmlFor="description"
                className="font-semibold text-lg capitalize"
              >
                Description
              </label>
              <div className="mb-4">
                <ReactQuill
                  value={value}
                  onChange={setValue}
                  className="h-[20rem]"
                />
              </div>

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

            <button className="bg-pink-500 text-white capitalize py-2 px-10 font-semibold rounded-md my-4">
              update post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePost;

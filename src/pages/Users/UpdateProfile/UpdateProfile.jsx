import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../../redux/slices/users/usersSlices";
import { useEffect } from "react";

const UploadProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUserAction(data));
    reset();
    // navigate("/");
  };
  return (
    <section className="flex h-screen">
      <div className="bg-white w-full flex justify-center items-center">
        <div className="w-[40%] mt-5">
          <h1 className="text-4xl font-semibold">Update Profile</h1>
          {state?.appErr && (
            <p className="text-red-500 mt-1">{state?.appErr}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
            <div className="flex flex-col my-4">
              <label
                htmlFor="firstName"
                className="font-semibold text-lg capitalize"
              >
                first name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoFocus={true}
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("firstName", {
                  minLength: 3,
                  maxLength: 32,
                })}
              />

              {errors?.firstName ? (
                <p className="text-red-500 mt-1">
                  {errors?.firstName?.message}
                </p>
              ) : (
                <p></p>
              )}
              {errors?.firstName?.type === "minLength" ||
              errors?.firstName?.type === "maxLength" ? (
                <p className="text-red-500 mt-1">
                  First name should be between 3 and 32 characters long
                </p>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex flex-col my-4">
              <label
                htmlFor="lastName"
                className="font-semibold text-lg capitalize"
              >
                last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("lastName", {
                  minLength: 3,
                  maxLength: 32,
                })}
              />

              {errors?.lastName ? (
                <p className="text-red-500 mt-1">{errors?.lastName?.message}</p>
              ) : (
                <p></p>
              )}
              {errors?.lastName?.type === "minLength" ||
              errors?.lastName?.type === "maxLength" ? (
                <p className="text-red-500 mt-1">
                  Last name should be between 3 and 32 characters long
                </p>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex flex-col my-4">
              <label
                htmlFor="email"
                className="font-semibold text-lg capitalize"
              >
                email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("email", {
                })}
              />

              {errors?.email ? (
                <p className="text-red-500 mt-1">{errors?.email?.message}</p>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex flex-col my-4">
              <label
                htmlFor="password"
                className="font-semibold text-lg capitalize"
              >
                new password
              </label>
              <input
                type="password"
                name="NewPassword"
                id="password"
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("NewPassword", {
                  required: "Password is required",
                })}
              />

              {errors?.password ? (
                <p className="text-red-500 mt-1">{errors?.password?.message}</p>
              ) : (
                <p></p>
              )}
            </div>

            {/* <div className="flex flex-col my-4">
              <label
                htmlFor="oldPassword"
                className="font-semibold text-lg capitalize"
              >
                old password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("oldPassword", {
                  required: "Old assword is required",
                })}
              />

              {errors?.oldPassword ? (
                <p className="text-red-500 mt-1">{errors?.oldPassword?.message}</p>
              ) : (
                <p></p>
              )}
            </div> */}

            <Link to="/auth/login">
              <p>
                Already a member ?{" "}
                <span className="text-blue-600 capitalize">Sign in</span>
              </p>
            </Link>

            <button className="bg-pink-500 text-white capitalize py-2 px-10 font-semibold rounded-md my-4">
              update profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadProfile;

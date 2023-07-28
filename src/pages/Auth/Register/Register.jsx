import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";

const address =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_2Rfr-WwwMFEmy19tl00TlTUcmIhNUdomw&usqp=CAU";
const Register = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUserAction(data));
    reset();
  };
  return (
    <section className="flex h-screen">
      {/* LEFT */}
      <div className="flex bg-pink-200 p-16 flex-col w-[45%]">
        <p className="font-bold italic text-2xl text-gray-400 opacity-80">
          dribbble
        </p>
        <p className="my-5 text-4xl font-bold  text-gray-500 ">
          Discover the world’s top Designers & Creatives.
        </p>
        <img src={address} className="rounded-xl" />
      </div>
      {/* END LEFT */}

      <div className="bg-white w-full flex justify-center items-center ">
        <div className="w-[40%]">
          <h1 className="text-4xl font-semibold">Sign up to Dribbble</h1>
          {state?.appErr && <p className="text-red-500 mt-1">{state?.appErr}</p>}
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
                  required: "First name is required",
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
                  required: "Last name is required",
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
                  required: "Email is required",
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
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors?.password ? (
                <p className="text-red-500 mt-1">{errors?.password?.message}</p>
              ) : (
                <p></p>
              )}
            </div>

            <Link to="/auth/login">
              <p>
                Already a member ?{" "}
                <span className="text-blue-600 capitalize">Sign in</span>
              </p>
            </Link>

            <button className="bg-pink-500 text-white capitalize py-2 px-16 font-semibold rounded-md my-4">
              signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

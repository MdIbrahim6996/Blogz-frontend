import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import { useEffect } from "react";

const address =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_2Rfr-WwwMFEmy19tl00TlTUcmIhNUdomw&usqp=CAU";
const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth) {
      navigate(-1);
    } else {
      return;
    }
  }, [userAuth]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUserAction(data));
    reset();
  };
  return (
    <section className="flex h-screen">
      {/* LEFT */}
      <div className="flex bg-gradient-to-br from-black to-black/80 p-16 flex-col w-[45%]">
        <p className="font-bold italic text-2xl text-white">Blogz</p>
        <p className="my-5 text-4xl font-bold  text-white ">
          Discover the world’s top Designers & Creatives.
        </p>
        <img src={address} className="rounded-xl" />
      </div>
      {/* END LEFT */}

      <div className="bg-white w-full flex justify-center items-center ">
        <div className="w-[40%]">
          <h1 className="text-4xl font-semibold">Sign in to Blogz</h1>
          {state?.appErr && (
            <p className="text-red-500 mt-1">{state?.appErr}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
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
                autoFocus={true}
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-black/30 focus:bg-white outline-none"
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
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-black/30 focus:bg-white outline-none"
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

            <Link to="/auth/forgot-password">
              <p className="text-blue-600 capitalize">forgot password</p>
            </Link>

            <Link to="/auth/register">
              <p>
                Not a member ?{" "}
                <span className="text-blue-600 capitalize">Sign up</span>
              </p>
            </Link>

            <button className="bg-black text-white capitalize py-2 px-16 font-semibold rounded-md my-2">
              signin
            </button>
            <button
              onClick={() => {
                reset({
                  email: "user@email.com",
                  password: "123456",
                });
                handleSubmit(onSubmit);
              }}
              className="bg-black text-white capitalize py-2 px-16 font-semibold rounded-md my-"
            >
              signin with demo credentials
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { passwordResetAction } from "../../../redux/slices/users/usersSlices";

const address =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_2Rfr-WwwMFEmy19tl00TlTUcmIhNUdomw&usqp=CAU";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const state = useSelector((state) => state.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const user = {
      password: data?.password,
      token,
    };
    dispatch(passwordResetAction(user));
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
          <h1 className="text-4xl font-semibold capitalize">reset Password</h1>
          {state?.appErr && (
            <p className="text-red-500 mt-1">{state?.appErr}</p>
          )}
          {state?.passwordReset && (
            <p className="text-green-500 mt-1">Password Reset Success</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
            <div className="flex flex-col my-4">
              <label
                htmlFor="password"
                className="font-semibold text-lg capitalize"
              >
                new password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-pink-100 focus:bg-white outline-none"
                {...register("password", {
                  required: "New password is required",
                  minLength: 6,
                })}
              />

              {errors?.password ? (
                <p className="text-red-500 mt-1">{errors?.password?.message}</p>
              ) : (
                <p></p>
              )}
              {errors?.password?.type === "minLength" ? (
                <p className="text-red-500 mt-1">Password is too short</p>
              ) : (
                <p></p>
              )}
            </div>
            <button
              type="submit"
              className="bg-black text-white capitalize py-2 px-16 font-semibold rounded-md my-4"
            >
              reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

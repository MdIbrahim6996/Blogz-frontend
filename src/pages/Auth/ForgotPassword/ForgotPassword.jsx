import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { passwordResetTokenAction } from "../../../redux/slices/users/usersSlices";
const address =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_2Rfr-WwwMFEmy19tl00TlTUcmIhNUdomw&usqp=CAU";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { passwordToken } = useSelector((state) => state.users);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(passwordResetTokenAction(data.email));
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
          <h1 className="text-4xl font-semibold capitalize">forgot Password</h1>
          {passwordToken && (
            <p className="text-green-500 my-2">
              Reset Password link has been sent to your email
            </p>
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
                className="bg-gray-100 p-2 rounded-lg transition-all border-4 border-gray-100 focus:border-4 focus:border-black/30 focus:bg-white outline-none"
                {...register("email", {
                  required: "Email address is required",
                })}
              />

              {errors?.email ? (
                <p className="text-red-500 mt-1">{errors?.email?.message}</p>
              ) : (
                <p></p>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white capitalize py-2 px-16 font-semibold rounded-md my-4"
            >
              send reset password link
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

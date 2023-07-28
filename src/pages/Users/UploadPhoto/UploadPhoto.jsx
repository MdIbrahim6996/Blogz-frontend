import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { uploadProfilePhototAction } from "../../../redux/slices/users/usersSlices";

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [err, setErr] = useState([]);

  const handleFileChange = async (e) => {
    setErr("");
    if (!e.target.files) setErr("Attach a image");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setErr("Please. Attach a image!");
      return;
    }
    const res = await dispatch(uploadProfilePhototAction(image));
    console.log(res);
  };
  return (
    <section className="flex h-screen">
      <div className="bg-white w-full flex justify-center my-20">
        <div className="w-[40%]">
          <h1 className="text-4xl font-semibold">Upload Photo</h1>

          <form onSubmit={onSubmit} className="my-4">
            <div className="flex flex-col my-4">
              <label
                htmlFor="profilePhoto"
                className="font-semibold text-lg cursor-pointer border border-black p-2 rounded-md text-center"
              >
                Select photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                onChange={handleFileChange}
                hidden={true}
                accept="image/*"
              />

              {err && <p className="text-red-500 my-2">{err}</p>}

              {image && (
                <div className="relative w-44 mx-auto my-3">
                  <img
                    src={image}
                    alt="image"
                    className="w-32 h-32 object-cover rounded-full"
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
            </div>
            <p
              onClick={() => navigate(-1)}
              className="text-blue-600 cursor-pointer capitalize"
            >
              go back
            </p>

            <button className="bg-pink-500 text-white capitalize py-2 px-16 font-semibold rounded-md my-4">
              upload
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UploadPhoto;

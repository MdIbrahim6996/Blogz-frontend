import { Link, useParams } from "react-router-dom";
import Post from "../../components/PostSection/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  followUserAction,
  unfollowUserAction,
  userProfileAction,
} from "../../redux/slices/users/usersSlices";
import { fetchWeatherAction } from "../../redux/slices/weather/weatherSlices";
import ProfileSkeleton from "./ProfileSkeleton";
import { months } from "../../constants/dates";
const src = `https://basho.fueko.net/content/images/size/w1200/2022/03/photo-1644478509397-27d9b27771fe.jpeg`;

const d = new Date();

const today = d.getDay();
const currentDay = d.getDate();
const currentMonth = d.getMonth();
const currentYear = d.getFullYear();
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, appErr, serverErr } = useSelector(
    (state) => state.users
  );
  const { userAuth } = useSelector((state) => state.users);
  const users = useSelector((state) => state.users);
  const { weatherInfo } = useSelector((state) => state.weather);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          fetchWeatherAction({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
    } else {
      console.log("Not Available");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, users?.followed, users?.unFollowed]);

  const alreadyFollowing = profile?.followers?.find(
    (userId) => userId === userAuth?._id
  );

  return (
    <div>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div>
          {/* 1440px */}
          <div className="relative">
            <div className="h-96 rounded-md overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
            {userAuth?._id === profile?._id && (
              <p className="relative bottom-10 left-[85%] capitalize text-sm w-fit bg-black/60 text-white py-1 px-4 rounded-md font-semibold">
                upload cover photo
              </p>
            )}

            <div
              className={`relative ${
                userAuth?._id === profile?._id ? "bottom-20" : "bottom-10"
              }  flex items-center justify-between`}
            >
              <div className=" flex space-x-10 items-center">
                <div className="flex flex-col space-y-4 items-center">
                  <div className="w-40 h-40 border-4 border-white rounded-full overflow-hidden">
                    <img
                      src={profile?.profilePhoto}
                      alt=""
                      className=" w-full h-full object-cover"
                    />
                  </div>
                  {userAuth?._id === profile?._id && (
                    <Link to={`/user/upload-photo/profile/${profile?.id}`}>
                      <p className="capitalize text-sm w-fit bg-sky-500 text-white py-1 px-4 rounded-md font-semibold">
                        upload profile photo
                      </p>
                    </Link>
                  )}
                </div>

                <div className="space-y-2 mt-10">
                  <p className="capitalize text-4xl font-bold">{`${profile?.firstName} ${profile?.lastName}`}</p>
                  {profile?.isAccountVerified ? (
                    <p className="capitalize text-sm text-center w-44 bg-sky-500 text-white py-1 px-4 rounded-md font-semibold">
                      verified
                    </p>
                  ) : (
                    <p className="capitalize text-sm text-center w-44 bg-red-500 text-white py-1 px-4 rounded-md font-semibold">
                      unverified
                    </p>
                  )}

                  <p className="capitalize text-sm w-fit border border-gray-400 py-1 px-4 rounded-md font-semibold">
                    Date Joined:{" "}
                    {dayjs(profile?.createdAt).format("D MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="space-x-2 flex">
                {userAuth?._id === profile?._id ? (
                  ""
                ) : (
                  <div>
                    {alreadyFollowing ? (
                      <button
                        onClick={() => dispatch(unfollowUserAction(id))}
                        className="bg-red-500 text-white rounded-md py-2 px-5"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatch(followUserAction(profile?._id))}
                        className="bg-green-500 text-white rounded-md py-2 px-5"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}

                {userAuth?._id === profile?._id ? (
                  <Link to={`/user/create-post`}>
                    <button className="bg-violet-500 text-white rounded-md py-2 px-5">
                      Create Post
                    </button>
                  </Link>
                ) : (
                  ""
                )}

                {userAuth?._id === profile?._id ? (
                  <Link to={`/user/update-profile/${profile?.id}`}>
                    <button className="bg-lime-400 text-white rounded-md py-2 px-5">
                      Update Profile
                    </button>
                  </Link>
                ) : (
                  ""
                )}
                {userAuth?._id === profile?._id ? (
                  ""
                ) : (
                  <button className="bg-blue-500 text-white rounded-md py-2 px-5">
                    Send Message
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 min-h-[50vh]">
            <div className="bg-gradient-to-br my-16 max-h-[15rem] from-sky-500 to-sky-200 shadow-md flex-1 capitalize p-4 rounded-md text-white font-semibold">
              <p className=" text-4xl font-bold">{day[today]}</p>
              <p className="text-xl">
                {currentDay + " " + months[currentMonth] + " " + currentYear}
              </p>
              <p className="text-xl">{weatherInfo?.name}, in</p>
              <p className="text-5xl font-bold mt-10">
                {Math.floor(weatherInfo?.main?.temp)}℃
              </p>
              <p className="text-xl">{weatherInfo?.weather[0]?.main}</p>
            </div>
            <div className="flex-[3]">
              <h2 className="text-3xl pb-5 mb-2 font-semibold capitalize text-center underline">
                posts
              </h2>

              <section className=" my-1">
                <div className="grid grid-cols-3 gap-6">
                  {profile?.post ? (
                    profile?.post?.map((post) => (
                      <Post post={post} key={post._id} />
                    ))
                  ) : (
                    <p className="text-center text-2xl text-gray-400">
                      No posts to show
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

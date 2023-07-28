import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  fetchUserDetailsAction,
  followUserAction,
  unfollowUserAction,
} from "../../../redux/slices/users/usersSlices";
import ProfileSkeleton from "../../Profile/ProfileSkeleton";
import { fetchWeatherAction } from "../../../redux/slices/weather/weatherSlices";
import Post from "../../../components/PostSection/Post/Post";
import { day, months } from "../../../constants/dates";
const src = `https://basho.fueko.net/content/images/size/w1200/2022/03/photo-1644478509397-27d9b27771fe.jpeg`;

const d = new Date();

const today = d.getDay();
const currentDay = d.getDate();
const currentMonth = d.getMonth();
const currentYear = d.getFullYear();

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, appErr, serverErr } = useSelector(
    (state) => state.users
  );
  const { userAuth } = useSelector((state) => state.users);
  const { userDetails } = useSelector((state) => state.users);

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
      console.log("Geo Location Not Available");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
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
            <div
              className={`relative  bottom-10 flex items-center justify-between`}
            >
              <div className=" flex space-x-10 items-center">
                <div className="flex flex-col space-y-4 items-center">
                  <div className="w-40 h-40 border-4 border-white rounded-full overflow-hidden">
                    <img
                      src={userDetails?.profilePhoto}
                      alt=""
                      className=" w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-12">
                  <p className="capitalize text-4xl font-bold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</p>
                  {userDetails?.isAccountVerified ? (
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
                    {dayjs(userDetails?.createdAt).format("D MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="space-x-2 flex">
                {alreadyFollowing ? (
                  <button
                    onClick={() => dispatch(unfollowUserAction(id))}
                    className="bg-red-500 text-white rounded-md py-2 px-5"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(followUserAction(userDetails?._id))}
                    className="bg-green-500 text-white rounded-md py-2 px-5"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="bg-red-40 flex space-x-4 min-h-[50vh]">
            {/* WEATHER */}
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
            {/* END OF WEATHER */}

            {/* POSTS */}
            <div className="flex-[3]">
              <h2 className="text-3xl pb-5 mb-2 font-semibold capitalize text-center">
                posts
              </h2>

              <section className=" my-1">
                <div className="grid grid-cols-3 gap-6">
                  {userDetails?.post?.map((post) => (
                    <Post post={post} key={post._id} />
                  ))}
                </div>
              </section>
              <p className="text-center text-2xl text-gray-400">
                No posts to show
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

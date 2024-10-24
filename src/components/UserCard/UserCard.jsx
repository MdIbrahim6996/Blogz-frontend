import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user?._id}`}>
      <div className="bg-gradient-to-br from-black to-black/70 overflow-hidden rounded-md flex flex-col space-x-5 border">
        <div className="h-[15rem] w-full rounded-full">
          <img
            src={user?.profilePhoto}
            alt="profile-photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="-space-y-1 p-4 text-center">
          <p className="text-white text-xl font-semibold capitalize">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-gray-200 text-sm">
            {dayjs(user?.createdAt).format("D MMM YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;

import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user?._id}`}>
      <div className="bg-gradient-to-br from-black to-black/70 vi p-5 rounded-md flex items-center space-x-5">
        <div className="w-14 h-14 rounded-full">
          <img
            src={user?.profilePhoto}
            alt="profile-photo"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="-space-y-1">
          <p className="text-white font-semibold capitalize">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-white text-sm">
            {dayjs(user?.createdAt).format("D MMM YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;

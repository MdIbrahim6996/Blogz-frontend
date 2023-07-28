import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blockUserAction, unBlockUserAction } from "../../../redux/slices/users/usersSlices";

const UserCardAdmin = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div className="border border-gray-400 p-5 shadow-md rounded-md flex items-center space-x-5">
      <div className="w-14 h-14 rounded-full">
        <img
          src={user?.profilePhoto}
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <div className=" font-semibold capitalize">
        <p>
          {user?.firstName} {user?.lastName}
        </p>
        <p>{dayjs(user?.createdAt).format("D MMM YYYY")}</p>
      </div>
      <div className="flex space-x-3">
        <Link to={`/user/${user?._id}`}>
          <button className="py-1 px-4 bg-emerald-500 text-white rounded-md capitalize">
            profile
          </button>
        </Link>
        {user?.isBlocked ? (
          <button
            onClick={() => dispatch(unBlockUserAction(user?.id))}
            className="py-1 px-4 bg-green-500 text-white rounded-md capitalize"
          >
            unblock
          </button>
        ) : (
          <button
            onClick={() => dispatch(blockUserAction(user?.id))}
            className="py-1 px-4 bg-rose-400 text-white rounded-md capitalize"
          >
            block
          </button>
        )}
        <button className="py-1 px-4 bg-red-500 text-white rounded-md capitalize">
          delete
        </button>
        <button className="py-1 px-4 bg-sky-500 text-white rounded-md capitalize">
          edit
        </button>
      </div>
    </div>
  );
};

export default UserCardAdmin;

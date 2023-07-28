import React, { useEffect } from "react";
import UserCard from "../../components/UserCard/UserCard";
import AllUsersSkeleton from "./AllUsersSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../redux/slices/users/usersSlices";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { allUsers, loading, appErr, serverErr } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, []);
  return (
    <div className="min-h-screen">
      {loading ? <AllUsersSkeleton /> : <></>}

      <div className="grid grid-cols-4 gap-5">
        {allUsers?.map((user) => (
          <UserCard user={user} key={user?.id} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;

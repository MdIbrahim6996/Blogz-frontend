import React, { useEffect, useState } from "react";
import AllUsersSkeleton from "./AllUsersSkeleton";
import { useDispatch, useSelector } from "react-redux";
import UserCardAdmin from "./UserCardAdmin";
import { fetchAllUsersAction } from "../../../redux/slices/users/usersSlices";

const AllUsersAdmin = () => {
  const dispatch = useDispatch();
  const { allUsers, loading, appErr, serverErr } = useSelector(
    (state) => state.users
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchAllUsersAction(page));
  }, [page]);
  return (
    <>
      {loading ? <AllUsersSkeleton /> : <></>}
      <h1 className="my-4 text-center text-4xl font-semibold underline">
        All Users
      </h1>

      <div className="grid grid-cols-2 gap-5">
        {allUsers?.map((user) => (
          <UserCardAdmin user={user} key={user?.id} />
        ))}
      </div>
      <div className="space-x-3 my-10 flex items-center justify-center">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          className="bg-red-500 py-1 px-4 cursor-pointer rounded-md text-white my-2"
          disabled={page <= 1}
        >
          Prev
        </button>
        <p className="text-xl font-semibold">{page}</p>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-sky-500 py-1 px-4 rounded-md text-white  my-2"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AllUsersAdmin;

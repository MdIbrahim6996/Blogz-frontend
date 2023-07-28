import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../../redux/slices/users/usersSlices";


const links = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Create",
    href: "/user/create-post",
  },
  {
    id: 3,
    name: "Posts",
    href: "/posts",
  },
  {
    id: 4,
    name: "Author",
    href: "/admin/all-users",
  },
  {
    id: 5,
    name: "Add Category",
    href: "/admin/add-category",
  },
];

const AdminNavbar = () => {
  const { userAuth } = useSelector((state) => state.users);
  const dispatch = useDispatch()

  return (
    <nav className="py-3 px-[5%] flex justify-between items-center shadow-md sticky top-0 z-10 bg-white">
      <div className="text-4xl font-bold italic">
        <Link to="/">Basho</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <div>
          {links.map((link) => (
            <span
              className="text-xl font-semibold mx-2 cursor-pointer"
              key={link.id}
            >
              <Link to={link.href}>{link.name}</Link>
            </span>
          ))}
        </div>

        <Link to={`/user/profile/${userAuth._id}`}>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Profile
          </button>
        </Link>

        <button
          onClick={() => dispatch(logoutAction())}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

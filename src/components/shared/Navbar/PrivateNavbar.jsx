import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    href: "/user/all",
  },
  {
    id: 5,
    name: "Categories",
    href: "/categories",
  },
];

const PrivateNavbar = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.users);

  return (
    <nav className="py-3 px-[5%] flex justify-between items-center">
      <div className="text-4xl font-bold italic underline">
        <Link to="/">Blogz</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <div>
          {links.map((link) => (
            <span
              className="text-xl font-semibold hover:bg-gray-200 p-2 rounded-md cursor-pointer"
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

export default PrivateNavbar;

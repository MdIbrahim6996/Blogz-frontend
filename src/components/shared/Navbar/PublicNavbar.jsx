import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Posts",
    href: "/posts",
  },
  {
    id: 3,
    name: "Author",
    href: "/user/all",
  },
];

const PublicNavbar = () => {
  return (
    <nav className="py-3 px-[5%] flex justify-between items-center">
      <div className="text-4xl font-bold italic underline">
        <Link to="/">Blogz</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <div>
          {links.map((link) => (
            <span
              className="text-xl font-semibold mx-1 cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              key={link.id}
            >
              <Link to={link.href}>{link.name}</Link>
            </span>
          ))}
        </div>

        <Link to="/auth/login">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Login/Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;

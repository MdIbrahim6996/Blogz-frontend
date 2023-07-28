import React, { useState } from "react";
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
  const [show, setShow] = useState(false);
  return (
    <nav className="py-3 px-[5%] flex justify-between md:items-center relative z-20">
      <div className="text-4xl font-bold italic underline">
        <Link to="/">Blogz</Link>
      </div>
      <div className="hidden md:flex space-x-4 items-center">
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

        <Link to="/auth/login">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Login/Signup
          </button>
        </Link>
      </div>

      {/* CLOSE BUTTON MOBILE */}
      <div className="md:hidden" onClick={() => setShow(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {/* END OF CLOSE BUTTON MOBILE */}

      {/* MOBILE NAVBAR */}
      <div
        className={`flex flex-col py-3 absolute bg-white transition-all duration-300 top-0 left-0 w-full text-center shadow-lg ${
          show ? "" : "-translate-y-[100%]"
        }`}
      >
        <span
          onClick={() => setShow(false)}
          className="text-xl font-semibold hover:bg-gray-200 p-2 rounded-md cursor-pointer"
        >
          Close
        </span>
        {links.map((link) => (
          <span
            className="text-xl font-semibold hover:bg-gray-200 p-2 rounded-md cursor-pointer"
            key={link.id}
            onClick={() => setShow(false)}
          >
            <Link to={link.href}>{link.name}</Link>
          </span>
        ))}

        <Link to="/auth/login">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Login/Signup
          </button>
        </Link>
      </div>
      {/* END OF MOBILE NAVBAR*/}
    </nav>
  );
};

export default PublicNavbar;

import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    link: "Blog",
  },
  {
    id: 2,
    link: "Shop",
  },
  {
    id: 3,
    link: "Store",
  },
];

const Navbar = () => {
  return (
    <nav className="py-3 px-[5%] flex justify-between items-center">
      <div className="text-4xl font-bold italic">
        <Link to="/">Basho</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <div>
          {links.map((link) => (
            <span className="text-xl font-semibold mx-3" key={link.id}>
              {link.link}
            </span>
          ))}
        </div>

        <Link to='/auth/login'>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Login/Signup
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

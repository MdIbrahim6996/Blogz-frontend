import React from "react";

const CategorySidebar = ({ categories }) => {
  return (
    <ul className="space-y-2 flex-1 bg-gray-300 rounded-lg h-fit p-4 my-14">
      {categories?.map((cat) => (
        <li key={cat?._id} className="bg-white text-gray-700 p-2 rounded-sm font-semibold cursor-pointer hover:bg-gray-200 transition-all">{cat?.title}</li>
      ))}
    </ul>
  );
};

export default CategorySidebar;

import { useEffect, useState } from "react";

const CategoryList = ({ categoryList }) => {
  
  return (
    <div className="my-5 flex flex-wrap gap-2">
      {list?.length > 0 ? (
        list?.map((category) => (
          <p
            key={category._id}
            className="bg-gray-200 rounded-lg py-2 px-4 capitalize font-semibold"
          >
            {category?.title}
            <span
              onClick={() => deleteCategory(category._id)}
              className="bg-red-500 text-white ml-2 px-2 text-xs rounded-md cursor-pointer"
            >
              X
            </span>
          </p>
        ))
      ) : (
        <p>No categories to show</p>
      )}
    </div>
  );
};

export default CategoryList;

import React from "react";

type CategoryProps = {
  categories: string[];
};

const Category: React.FC<CategoryProps> = ({ categories }) => {
  return (
    <>
      {categories?.map((category, idx) => {
        return <button key={category + idx}>{category}</button>;
      })}
    </>
  );
};

export default Category;

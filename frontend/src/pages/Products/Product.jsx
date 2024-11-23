import { useState } from "react";
import { Link } from "react-router-dom";

import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate the name if more than 4 words
  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 3 && !isExpanded) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return name;
  };

  return (
    <div className="relative mt-8">
      {/* Card container with white background */}
      <div className="relative bg-white p-2 sm:p-4 rounded-lg shadow-md border border-gray-300 hover:border-blue-500 hover:shadow-xl  hover:scale-102 transition-all duration-300">
        <div className="p-2 sm:p-4">
          <div className="w-full relative overflow-hidden rounded-lg">
            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[15rem] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-102"
              />
            </Link>

            {/* Heart Icon */}
            <HeartIcon
              product={product}
              className="absolute top-2 right-2 text-pink-500 hover:text-pink-600"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-3 items-start mt-4">
            <Link to={`/product/${product._id}`}>
              <h2 className="text-gray-800 text-[14px] xl:text-[17px] font-semibold">
                {truncateName(product.name)}
              </h2>
            </Link>

            {/* "See More" or "See Less" button */}
            {product.name.split(" ").length > 4 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 text-xs hover:underline"
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}

            {/* Product Price */}
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
              BDT {product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

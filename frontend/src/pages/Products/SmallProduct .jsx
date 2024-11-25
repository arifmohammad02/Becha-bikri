import { Link } from "react-router-dom";
import React, { useState } from "react";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate the product name after 4 words
  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 3 && !isExpanded) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return name;
  };

  return (
    <div className="py-2 md:py-5 ">
      <div className="sm:p-4 rounded-lg bg-white shadow-md border border-gray-300 hover:border-blue-500 hover:shadow-xl hover:scale-102 transition-all duration-300">
        <div className="bg-white p-2 sm:p-4 rounded-lg">
          <div>
            <div className="relative">
              <Link
                to={`/product/${product._id}`}
                className="rounded-lg overflow-hidden"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover h-[13rem] transition-transform duration-300 ease-in-out transform hover:scale-102"
                />
              </Link>
              {/* Heart Icon */}
              <HeartIcon product={product} />
            </div>
          </div>

          {/* Product Information */}
          <div className="text-gray-800 mt-4">
            <Link to={`/product/${product._id}`}>
              <h2 className="text-[14px] xl:text-[17px] font-semibold">
                {truncateName(product.name)}
              </h2>
            </Link>

            {/* Show "See More" or "See Less" button */}
            {product.name.split(" ").length > 3 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 text-xs hover:underline mb-2"
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}

            {/* Product Price */}
            <div>
              <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-lg w-fit">
                BDT {product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;

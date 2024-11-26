// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  // Get the cart items from the Redux store
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // // Check if the product is already in the cart
  // const isProductInCart = cartItems.some((item) => item._id === product._id);
  // const addToCartHandler = () => {
  //   // Dispatch the action with the product and qty
  //   dispatch(addToCart({ ...product, qty: 1 }));
  //   // Show toast notification
  //   toast.success("Item added to cart!", { position: toast.POSITION.BOTTOM_RIGHT });
  // };

  // Function to truncate the name if more than 4 words
  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return name;
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <Link to={`/product/${product._id}`}>
        <img
          className="p-8 rounded-t-lg"
          src={product.image}
          alt={product.name}
        />
      </Link>
      {/* Heart Icon */}
     <div className="px-5">
     <HeartIcon  product={product} />
     </div>
      <div className="px-5 pb-5">
        <div className="flex items-center gap-1">
          <Link to={`/product/${product._id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {truncateName(product.name)}
            </h5>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            BDT {product.price}
          </span>

          {/* Add to Cart Button */}
          {/* <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`text-white ${isProductInCart ? 'bg-green-500' : 'bg-blue-700'} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {isProductInCart ? "Added to Cart" : "Add to Cart"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Product;

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "@redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";

import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

import moment from "moment";
import HeartIcon from "./HeartIcon";
import ProductTabs from "./ProductTabs";
import Ratings from "./Ratings";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      if (
        error.status === 400 &&
        error?.data?.message === "Product already reviewed"
      ) {
        toast.error("You have already reviewed this product.");
      } else {
        toast.error(
          error?.data?.message ||
            error.message ||
            "An unexpected error occurred"
        );
      }
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="bg-white min-h-screen h-full pt-12 px-6 container mx-auto">
      <div className="pb-10 ">
        {/* Go Back Link */}
        <div className="py-4">
          <Link
            to="/"
            className="text-gray-800 font-semibold hover:underline hover:text-pink-600 transition-all"
          >
            Go Back
          </Link>
        </div>

        {/* Product Section */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Image Section */}
              <div className="relative w-full border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg object-cover w-full p-3 transition-transform duration-300 hover:scale-102"
                />
                <div className="absolute top-4 right-4 2xl:right-20">
                  <HeartIcon product={product} />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="flex flex-col w-full text-gray-800 py-6">
                {/* Product Title */}
                <div>
                  <h2 className="text-[24px] font-bold text-black">
                    {isExpanded
                      ? product.name
                      : product.name.substring(0, 80) +
                        (product.name.length > 80 ? "..." : "")}
                  </h2>

                  {/* See More / See Less Button */}
                  {product.name.length > 80 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-pink-500 text-sm mt-2 hover:underline"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
                <p className="my-4 text-gray-600 max-w-lg text-[15px]">
                  {product.description}
                </p>
                <p className="text-4xl font-extrabold text-black">
                  BDT-{product.price}
                </p>

                <div className="flex flex-wrap mt-6 space-y-4 lg:space-y-0">
                  {/* Brand and Stock Info */}
                  <div className="w-full sm:w-1/2">
                    <h1 className="flex items-center mb-4">
                      <FaStore className="mr-2 text-pink-600" /> Brand:{" "}
                      {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-4">
                      <FaClock className="mr-2 text-pink-600" /> Added:{" "}
                      {moment(product.createAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-4">
                      <FaStar className="mr-2 text-pink-600" /> Reviews:{" "}
                      {product.numReviews}
                    </h1>
                  </div>

                  {/* Ratings and Quantity Info */}
                  <div className="w-full sm:w-1/2">
                    <h1 className="flex items-center mb-4">
                      <FaStar className="mr-2 text-pink-600" /> Ratings:{" "}
                      {rating}
                    </h1>
                    <h1 className="flex items-center mb-4">
                      <FaShoppingCart className="mr-2 text-pink-600" />{" "}
                      Quantity: {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-4">
                      <FaBox className="mr-2 text-pink-600" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>

                {/* Add to Cart Section */}
                <div className="flex items-center space-x-4 mt-4">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  {product.countInStock > 0 && (
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[5rem] rounded-lg text-gray-800 border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white w-fit py-2 px-6 rounded-lg mt-4 shadow-md hover:bg-pink-700 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Review Section */}
            <div className="w-full mt-8 bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

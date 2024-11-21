import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import pexels from "../assets/banner/pexels.jpg";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className=" min-h-screen text-white">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white">
          <div className="">
            {cartItems.length === 0 ? (
              <div className="text-black text-2xl font-bold">
                <div className="relative">
                  <img
                    src={pexels}
                    alt=""
                    className="w-full object-cover h-80"
                  />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
                    / Your cart is empty{" "}
                    <Link to="/shop" className="text-underline">
                      / Go To Shop
                    </Link>
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <img
                    src={pexels}
                    alt=""
                    className="w-full object-cover h-80"
                  />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl z-10 text-black font-bold">
                    Your Shopping Cart
                  </span>
                </div>
                <div className="container mx-auto p-4">
                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b border-gray-300 py-4"
                    >
                      {/* Image */}
                      <div className="w-20 h-20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 ml-4">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-pink-500 text-lg"
                        >
                          {item.name}
                        </Link>
                        <div className="text-gray-500 text-sm">
                          {item.brand}
                        </div>
                        <div className="text-black font-bold">
                          ${item.price}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        {/* Decrease Quantity Button */}
                        <button
                          className="w-10 h-10 border rounded-full flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-transform"
                          onClick={() =>
                            item.qty > 1 && addToCartHandler(item, item.qty - 1)
                          }
                        >
                          -
                        </button>

                        {/* Quantity Display */}
                        <span className="px-6 py-2 border rounded-full bg-gray-200 text-lg font-semibold shadow-md">
                          {item.qty}
                        </span>

                        {/* Increase Quantity Button */}
                        <button
                          className="w-10 h-10 border rounded-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg hover:scale-105 transition-transform"
                          onClick={() => addToCartHandler(item, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Special Instructions & Cart Totals */}
                  <div className="mt-8 flex items-end justify-end gap-8">
                    {/* Cart Totals */}

                    <div className="w-1/3 border rounded p-4">
                      <h3 className="text-lg font-semibold mb-2 text-black">
                        Cart Totals
                      </h3>
                      <div className="flex justify-between mb-2 text-black">
                        <span>Subtotal</span>
                        <span>
                          BDT
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-xl">
                        <span className="text-black">Total</span>
                        <span className="text-black">
                          BDT   
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.qty * item.price,
                               0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="bg-pink-500 w-full mt-4 py-2 text-white rounded hover:bg-pink-600"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

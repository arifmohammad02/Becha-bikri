import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { LuShoppingBag } from "react-icons/lu";


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
  return (
    <div className="pt-12 ">
      <div className="container flex justify-around items-start wrap mx-auto mt-8 pb-12">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p><LuShoppingBag className="w-28 h-28" /></p>
            <span className="text-[30px] font-medium font-sans text-center">Your cart is empty </span>
            <p className=" max-w-96 text-center">Add products while you shop, so they'll be ready for checkout later. </p>
            <button className="flex items-center gap-3 bg-blue-700 text-white py-3 px-5 rounded-md hover:bg-blue-600 transition-all ease-in-out duration-300">
              <Link to="/shop">Go To Shop</Link>
              <FaArrowRight />
            </button>
          </div>
        ) : (
          <>
            <div className="w-full mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-shadow duration-300">
              <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Shopping Cart
              </h1>

              {/* Cart Table */}
              <div className="overflow-x-auto ">
                <table className="min-w-full bg-white text-black rounded-lg border  border-gray-300 ">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-4 px-6 text-left">Product</th>
                      <th className="py-4 px-6 text-left">Price</th>
                      <th className="py-4 px-6 text-left">Quantity</th>
                      <th className="py-4 px-6 text-left">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-[5rem] h-[5rem] object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                          <Link
                            to={`/product/${item._id}`}
                            className="hidden lg:block ml-4 text-pink-500 hover:text-pink-700 transition-colors duration-200 max-w-[500px]"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="py-4 px-6">BDT {item.price}</td>
                        <td className="py-4 px-6">
                          <select
                            className="w-[5rem] p-1 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <FaTrash className="ml-2" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Section as Table */}
              <div className="flex flex-col pt-5 lg:pt-0 lg:flex-row items-center justify-between gap-5">
                <div className="max-w-md">
                  <p className="text-lg font-bold pb-2 text-gray-800">Cash on Delivery</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    সর্বোচ্চ ৪-৫ দিন (ঢাকায়) এবং ৫-৭ দিন (ঢাকার বাহিরে) সময়ের মধ্যে হোম ডেলিভারী করা হয়।
                  </p>
                </div>
                <div className="w-full border border-gray-200 bg-white">
                  <table className="w-full text-gray-800">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-4 px-6 text-left text-sm font-semibold border-b border-gray-200">Total Items</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold border-b border-gray-200">Total Price</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold border-b border-gray-200">Checkout</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-100 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium">
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                          BDT {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-lg text-sm font-medium w-full hover:from-green-500 hover:to-blue-600 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                          >
                            Proceed To Checkout
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorite/favoriteSlice";
import Product from "./Product";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="bg-white py-3">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen text-white w-full container mx-auto ">
          <div className=" ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl md:text-2xl font-bold text-center mb-8 text-black shadow-lg p-2 mt-20">
                FAVORITE PRODUCTS
              </h1>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-3 lg:px-6">
              {favorites.map((product) => (
                <div key={product._id} className=" ">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

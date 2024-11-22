import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct ";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  // console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="">
     <div className="py-12">
     <ProductCarousel />
     </div>
      <div className="container mx-auto flex justify-between gap-5">
        <div className="w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-3">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Header;

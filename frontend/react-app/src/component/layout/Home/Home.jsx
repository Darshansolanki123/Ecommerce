import React, { useEffect } from "react";
import Product from "./product.jsx";
import MetaData from "../metadata.jsx";
import { clearErrors, getProduct } from "../../../actions/productAction.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/loader.jsx";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="E-shop" />
          <div className="min-h-screen p-4 sm:p-6">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-6">
              Featured Products
            </h2>

            {/* Product Grid */}
            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {products &&
                products.map((product) => (
                  <div key={product._id} className="w-full max-w-[200px]">
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

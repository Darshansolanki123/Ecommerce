import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Loader from "../loader/loader.jsx";
import Product from "../Home/product";
import Pagination from "react-js-pagination";
import {useAlert} from "react-alert";
import "./Allproducts.css"; // Import CSS file for pagination styling
import MetaData from "../metadata.jsx";

const categories = ["Laptop", "Mobile", "Camera", "Accessories", "Headphones", "Games"];

const Allproducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  
  const { products, loading, productsCount, resultPerPage, error  } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Effect to fetch products whenever keyword, currentPage or category changes
  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
         <MetaData title="PRODUCTS -- E-SHOP"/>
          <h2 className="text-center font-bold text-3xl mt-5 text-gray-800">
            Our Products
          </h2>

          {/* Responsive Layout */}
          <div className="container mx-auto px-3 py-5 flex flex-col lg:flex-row gap-5">
            
            {/* Categories Section - Mobile (Horizontal Scroll) & Desktop (Sidebar) */}
            <div className="w-full lg:w-1/4">
              <h3 className="text-lg font-semibold mb-3 text-center lg:text-left text-gray-700">
                Choose a Category
              </h3>

              {/* Mobile: Scrollable Row */}
              <div className="lg:hidden flex gap-3 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform scale-100
                      ${category === cat ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105" : "bg-gray-200 text-gray-700"}
                      hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-white`} // Added hover effect here
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Desktop: Glassmorphism Sidebar */}
              <div className="hidden lg:block bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-200">
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`cursor-pointer px-4 py-3 rounded-lg text-center lg:text-left text-gray-800 font-semibold transition-all duration-300 transform scale-100
                        ${category === cat ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105" : "bg-gray-200 text-gray-700"}
                        hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-white`} // Added hover effect here
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products Grid */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products && products.length > 0 ? (
                  products.map((product) => <Product key={product._id} product={product} />)
                ) : (
                  <p className="text-gray-600 text-center col-span-full">
                    No products found in this category.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {resultPerPage < productsCount && (
            <div className="flex justify-center my-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                innerClass="pagination"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Allproducts;

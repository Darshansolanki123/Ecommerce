import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css"; // ✅ Import required styles

const Product = ({ product }) => {
  // ✅ Check if images exist, otherwise use a placeholder
  const productImage = product.images && product.images.length > 0 
    ? product.images[0].url 
    : "https://via.placeholder.com/150"; // Placeholder image

  return (
    <Link
      to={`/product/${product._id}`}
      className="block w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] mx-auto"
    >
      <div className="shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 p-2 bg-white">
        {/* Product Image */}
        <img
          src={productImage} // ✅ Use the safe image URL
          alt={product.name || "Product"} // ✅ Prevent alt error
          className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-md"
        />

        {/* Product Details */}
        <div className="mt-2 text-center">
          {/* Product Name - ✅ Truncate long names */}
          <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
            {product.name || "No Name"} 
          </p>

          {/* ⭐ Rating Section */}
          <div className="flex items-center justify-center mt-1">
            <Rating
              value={product.ratings || 0} // ✅ Handle undefined rating
              readOnly
              style={{ maxWidth: 80 }}
            />
            <span className="ml-1 text-gray-600 text-xs">
              ({product.numOfReviews || 0} Reviews)
            </span>
          </div>

          {/* 💰 Price */}
          <span className="text-sm font-bold text-red-600 block mt-1">
            ₹{product.price !== undefined ? product.price : "N/A"} 
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Product;

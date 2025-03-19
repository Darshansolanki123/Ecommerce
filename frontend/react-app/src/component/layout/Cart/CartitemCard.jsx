import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  return (
    <Link
      to={`/product/${item.product}`}
      className="flex items-center gap-4 p-4 rounded-lg w-full max-w-4xl mx-auto bg-white"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        {/* ✅ Ensure the text doesn't overflow */}
        <p className="text-lg font-semibold hover:text-blue-500 transition truncate">
          {item.name}
        </p>
        {/* ✅ Use line-clamp for better wrapping */}
        <span className="block text-gray-600 text-sm sm:text-base line-clamp-1 sm:line-clamp-2">
          {`Price: ₹${item.price}`}
        </span>
      </div>
    </Link>
  );
};

export default CartItemCard;

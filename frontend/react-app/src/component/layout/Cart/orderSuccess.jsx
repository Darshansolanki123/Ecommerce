import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <Typography variant="h5" className="text-gray-800 font-semibold mb-4">
          🎉 Your Order has been Placed Successfully!
        </Typography>
        
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us.
        </p>

        <Link
          to="/orders"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

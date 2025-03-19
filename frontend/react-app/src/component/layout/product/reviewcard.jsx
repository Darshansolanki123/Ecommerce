import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Profilepng from "./Profile.png";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center w-full sm:w-80 md:w-96 lg:w-1/3 transition-transform duration-300 hover:scale-105">
      <img
        src={Profilepng}
        alt="User"
        className="w-16 h-16 rounded-full object-cover mb-2"
      />
      <p className="text-lg font-semibold text-gray-800">{review.name}</p>
      <div className="mt-2">
        <Rating value={review?.rating || 0} readOnly style={{ maxWidth: 120 }} />
      </div>
      <span className="text-sm text-gray-600 mt-2 px-4">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

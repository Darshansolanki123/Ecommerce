import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react"; 
import MetaData from "../metadata";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search A Product -- E-SHOP" />

      {/* Main Container */}
      <div className="min-h-screen flex flex-col">
        {/* Search Bar Positioned Slightly Lower */}
        <div className="flex justify-center mt-24">
          <form
            className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-full max-w-md mx-auto transition-all"
            onSubmit={searchSubmitHandler}
          >
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-3 pl-5 text-gray-700 outline-none text-sm sm:text-base"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all"
            >
              <SearchIcon size={24} />
            </button>
          </form>
        </div>

        {/* Footer Fixed at the Bottom */}
        <footer className="bg-white-800 text-white text-center p-4 mt-auto">
        </footer>
      </div>
    </>
  );
};

export default Search;

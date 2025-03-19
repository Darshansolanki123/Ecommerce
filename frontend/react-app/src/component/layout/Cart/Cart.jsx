import React from "react";
import CartitemCard from "./CartitemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../../actions/cartAction.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, quantity + 1));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, quantity - 1));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");   
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl md:text-3xl font-semibold">No products in Your Cart</h2>
          <Link
            to="/products"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            View Products
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
          {/* Cart Header */}
          <div className="hidden md:grid grid-cols-4 text-center font-semibold border-b pb-3 text-gray-700">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
            <p>Action</p>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="grid grid-cols-1 md:grid-cols-4 items-center py-4 border-b gap-4"
            >
              <CartitemCard item={item} />
              
              {/* Quantity Controls */}
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded-l-lg hover:bg-gray-400 transition"
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="w-12 text-center border rounded-md"
                />
                <button
                  className="bg-gray-300 px-3 py-1 rounded-r-lg hover:bg-gray-400 transition"
                  onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-center font-semibold">{`₹${item.price * item.quantity}`}</p>

              {/* Remove Button */}
              <div className="text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full md:w-auto"
                  onClick={() => deleteCartItems(item.product)}
                >
                 Remove
                </button>
              </div>
            </div>
          ))}

          {/* Gross Total */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <p className="text-lg font-semibold">Gross Total</p>
            <p className="text-lg font-semibold">
              {`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full md:w-auto"
              onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
     <footer className="bg-white-800 text-white text-center p-4 mt-auto">
          E-SHOP
        </footer>
    </div>
  );
};

export default Cart;

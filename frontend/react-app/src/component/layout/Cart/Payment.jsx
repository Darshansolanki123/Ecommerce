import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {createOrder, clearErrors} from "../../../actions/orderAction.jsx";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const navigate = useNavigate();

  // Function to format the expiry date as MM/YY
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  // Function to allow only numbers in CVC field
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only 3 digits
    setCvc(value);
  };

  // Function to allow only numbers in Card Number field
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16); // Allow only 16 digits
    setCardNumber(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    // Simulating a payment success condition
    const isPaymentSuccessful = true;
  
    if (isPaymentSuccessful) {
      setPaymentStatus("succeeded");
  
      // Create a mock payment result object (since no actual payment gateway is used)
      const mockResult = {
        paymentIntent: {
          id: "mock_payment_id_12345",
          status: "succeeded",
        },
      };
  
      order.paymentInfo = {
        id: mockResult.paymentIntent.id,
        status: mockResult.paymentIntent.status,
      };
  
      dispatch(createOrder(order));
  
      setTimeout(() => {
        navigate("/success");
      }, 3000);
    } else {
      setPaymentStatus("failed");
    }
  };
  


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Enter Card Details
        </h2>

        {paymentStatus === "succeeded" ? (
          <div className="text-green-600 font-semibold text-center">
            ✅ Payment Successful! Redirecting...
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-gray-600 font-medium">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="19"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-gray-600 font-medium">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="5"
                required
              />
            </div>

            {/* CVC Code */}
            <div>
              <label className="block text-gray-600 font-medium">CVC</label>
              <input
                type="text"
                placeholder="123"
                value={cvc}
                onChange={handleCvcChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="3"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;

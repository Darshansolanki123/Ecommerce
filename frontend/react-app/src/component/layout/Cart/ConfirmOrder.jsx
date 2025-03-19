import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./checkoutsteps.jsx";
import { Typography, Button, Card, CardContent, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import MetaData from "../metadata.jsx";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="flex flex-col lg:flex-row items-start justify-center p-6 bg-gray-50 min-h-screen">
        {/* Left Section - Shipping & Cart Details */}
        <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-6 space-y-6">
          {/* Shipping Details */}
          <Card className="shadow-md">
            <CardContent className="space-y-4">
              <Typography variant="h5" className="text-gray-900 font-bold">
                Shipping Information
              </Typography>
              <Divider />
              <div className="mt-2 space-y-3 text-gray-700">
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo.phoneNo}
                </p>
                <p>
                  <b>Address:</b> {address}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items - Responsive */}
          <Card className="shadow-md">
            <CardContent className="space-y-4">
              <Typography variant="h5" className="text-gray-900 font-bold">
                Your Cart Items
              </Typography>
              <Divider />
              <div className="flex flex-col space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition duration-300"
                  >
                    <Link
                      to={`/product/${item.product}`}
                      className="flex items-center space-x-4 min-w-0 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                      <span className="text-gray-800 font-medium text-sm sm:text-base truncate min-w-0 max-w-[150px] sm:max-w-[250px] md:max-w-[300px]">
                        {item.name}
                      </span>
                    </Link>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base mt-2 sm:mt-0">
                      {item.quantity} x ₹{item.price} ={" "}
                      <b>₹{item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ml-6">
          <Card className="shadow-lg">
            <CardContent className="space-y-6">
              <Typography variant="h5" className="text-gray-900 font-bold">
                Order Summary
              </Typography>
              <Divider />

              <div className="space-y-4">
                <div className="flex justify-between text-gray-800">
                  <p>Subtotal:</p>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-800">
                  <p>Shipping Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>

                <div className="flex justify-between text-gray-800">
                  <p>GST (18%):</p>
                  <span>₹{tax}</span>
                </div>

                <Divider />

                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <p>Total:</p>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <Button
                onClick={proceedToPayment}
                variant="contained"
                color="primary"
                fullWidth
                className="transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Proceed To Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;

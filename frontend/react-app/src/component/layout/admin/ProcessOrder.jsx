import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Loader from "../loader/loader";
import Sidebar from "./Slidebar";
import MetaData from "../metadata";
import { getOrderDetails, clearErrors, updateOrder } from "../../../actions/orderAction.jsx";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants.jsx";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError, navigate]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  return (
    <>
      <MetaData title="Process Order" />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 md:min-h-screen">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">Process Order</h1>

              {/* Shipping Info */}
              <div className="mb-6">
                <Typography className="text-lg font-medium text-gray-700">Shipping Info</Typography>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p><strong>Name:</strong> {order.user?.name}</p>
                  <p><strong>Phone:</strong> {order.shippingInfo?.phoneNo}</p>
                  <p>
                    <strong>Address:</strong> {order.shippingInfo && 
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mb-6">
                <Typography className="text-lg font-medium text-gray-700">Payment</Typography>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p className={order.paymentInfo?.status === "succeeded" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                    {order.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
                  </p>
                  <p><strong>Amount:</strong> ₹{order.totalPrice}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="mb-6">
                <Typography className="text-lg font-medium text-gray-700">Order Status</Typography>
                  <p className={`mt-2 font-bold ${
                  order.orderStatus === "Delivered" ? "text-green-600" : 
                  order.orderStatus === "Shipped" ? "text-blue-600" : 
                 "text-red-600"
                   }`}>
               {order.orderStatus}
              </p>
             </div>

             
              {/* Order Items */}
              <div className="mb-6">
                <Typography className="text-lg font-medium text-gray-700">Your Cart Items:</Typography>
                <div className="mt-4 space-y-4">
                  {order.orderItems?.map((item) => (
                    <div key={item.product} className="flex items-center gap-4 bg-gray-50 p-3 rounded-md shadow-sm">
                      <Link to={`/product/${item.product}`} className="w-16 h-16 flex-shrink-0">
                        <img src={item.image} alt="Product" className="w-full h-full object-cover rounded-md cursor-pointer" />
                      </Link>
                      <div className="flex flex-col">
                        <Link to={`/product/${item.product}`} className="text-blue-600 font-medium hover:underline">
                          {item.name}
                        </Link>
                        <span className="text-gray-600">
                          {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Processing Form */}
              {order.orderStatus !== "Delivered" && (
                <form onSubmit={updateOrderSubmitHandler} className="mt-6 bg-gray-50 p-6 rounded-md shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Order Status</h2>

                  <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                    <AccountTreeIcon className="text-gray-500" />
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-gray-700"
                    >
                      <option value="">Choose Status</option>
                      {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                      {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mt-4 py-2"
                    disabled={loading || status === ""}
                  >
                    Process Order
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;

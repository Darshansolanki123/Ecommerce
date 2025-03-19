import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, Divider } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../../actions/orderAction.jsx";
import Loader from "../loader/loader.jsx";
import MetaData from "../metadata";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="max-w-5xl mx-auto p-4">
            <Card className="shadow-lg p-6">
              <CardContent>
                <Typography variant="h5" className="font-semibold mb-4">
                  Order #{order && order._id}
                </Typography>

                {/* Shipping Info */}
                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Shipping Info
                  </Typography>
                  <Divider className="mb-2" />
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {order.user && order.user.name}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Payment
                  </Typography>
                  <Divider className="mb-2" />
                  <p
                    className={`font-semibold text-lg ${
                      order.paymentInfo?.status === "succeeded"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.paymentInfo?.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> ₹
                    {order.totalPrice}
                  </p>
                </div>

                {/* Order Status */}
                <div className="mb-6">
                  <Typography variant="h6" className="font-medium mb-2">
                    Order Status
                  </Typography>
                  <Divider className="mb-2" />
                  <p
                    className={`font-semibold text-lg ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <Typography variant="h6" className="font-medium mb-2">
                    Order Items
                  </Typography>
                  <Divider className="mb-2" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div
                          key={item.product}
                          className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                          <Link to={`/product/${item.product}`} className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <Typography variant="body1" className="font-semibold">
                                {item.name}
                              </Typography>
                              <p>
                                {item.quantity} X ₹{item.price} ={" "}
                                <b>₹{item.price * item.quantity}</b>
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;

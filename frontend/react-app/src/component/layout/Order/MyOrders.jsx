import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../actions/orderAction.jsx";
import Loader from "../loader/loader.jsx";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";
import MetaData from "../metadata.jsx";

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.row.status === "Delivered" ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 100,
        flex: 0.3,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 150,
        flex: 0.5,
      },
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 100,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/order/${params.row.id}`} className="text-blue-500 hover:underline">
              <Launch className="w-5 h-5" />
            </Link>
          );
        },
      },
    ];

    const rows = [];
    orders &&
      orders.forEach((item) => {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
      <>
        <MetaData title={`${user.name} - Orders`} />
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center p-4 w-full max-w-5xl mx-auto">
            <Typography className="text-2xl font-semibold mb-4">{user.name}'s Orders</Typography>
            <div className="w-full overflow-auto bg-white shadow-md rounded-lg p-4">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="w-full"
                autoHeight
                getRowClassName={() => "bg-gray-50 hover:bg-gray-100"}
              />
            </div>
          </div>
        )}
      </>
    );
};

export default MyOrders;
import React, { useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MetaData from "../metadata.jsx";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Sidebar from "./Slidebar.jsx";
import { deleteOrder, getAllOrders, clearErrors } from "../../../actions/orderAction.jsx";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants.jsx";

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                if (params.row.status === "Delivered") {
                    return "text-green-600 font-semibold"; // Green for Delivered
                } else if (params.row.status === "Shipped") {
                    return "text-blue-600 font-semibold"; // Blue for Shipped
                } else {
                    return "text-red-600 font-semibold"; // Red for Processing
                }
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 120,
            flex: 0.4,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 180,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 120,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Link to={`/admin/order/${params.row.id}`}>
                        <EditIcon sx={{ color: "blue", cursor: "pointer", marginRight: 1 }} />
                    </Link>
                    <Button onClick={() => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                </>
            ),
        },
    ];

    const rows = orders?.map((item) => ({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
    }));

    return (
        <>
            <MetaData title="ALL ORDERS - Admin" />

            <Box display="flex">
                <Sidebar />

                <Box
                    sx={{
                        flexGrow: 1,
                        padding: isMobile ? "80px 10px 10px" : "20px",
                        marginLeft: isMobile ? 0 : "260px", // Adjust for sidebar width
                        transition: "margin 0.3s ease-in-out",
                        width: isMobile ? "100%" : "calc(100% - 260px)", // Ensure proper width
                    }}
                >
                    <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                        ALL ORDERS
                    </Typography>

                    <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default OrderList;

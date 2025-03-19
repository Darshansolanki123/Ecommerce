import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, IconButton, Box, Typography, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Delete as DeleteIcon, Star as StarIcon } from "@mui/icons-material";
import MetaData from "../metadata.jsx";
import Sidebar from "./Slidebar.jsx";
import { clearErrors, getAllReviews, deleteReviews } from "../../../actions/productAction.jsx";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants.jsx";

const ProductReviews = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    const { error, reviews, loading } = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 250, flex: 1 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
        { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
            cellClassName: (params) =>
                params.value >= 3 ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={() => deleteReviewHandler(params.row.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
            ),
        },
    ];

    const rows = reviews?.map((item) => ({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
    }));

    return (
        <>
            <MetaData title="ALL REVIEWS - Admin" />

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
                        ALL REVIEWS
                    </Typography>

                    {/* Search Form */}
                    <form onSubmit={productReviewsSubmitHandler}>
                        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} mb={3}>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "8px",
                                    width: { xs: "100%", sm: "300px" },
                                }}
                            >
                                <StarIcon sx={{ color: "gold", mr: 1 }} />
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    placeholder="Enter Product ID"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading || productId === ""}
                                sx={{ width: { xs: "100%", md: "auto" } }}
                            >
                                Search
                            </Button>
                        </Box>
                    </form>

                    {/* Reviews Table */}
                    <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px" }}>
                        {reviews && reviews.length > 0 ? (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                autoHeight
                                sx={{
                                    "& .MuiDataGrid-columnHeaders": {
                                        position: isMobile ? "sticky" : "static", // Sticky header on mobile
                                        top: 0,
                                        backgroundColor: "white",
                                        zIndex: 2,
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        overflowY: "auto",
                                        maxHeight: "450px", // Limits height on mobile
                                    },
                                    "& .MuiDataGrid-root": {
                                        overflowX: "hidden", // Prevents horizontal scrolling on desktop
                                    },
                                    "& .MuiDataGrid-cell": {
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    },
                                }}
                            />
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                                <Typography variant="h6" color="textSecondary">
                                    No Reviews Found
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProductReviews;


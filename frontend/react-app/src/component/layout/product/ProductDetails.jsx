import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../../actions/productAction";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReviewCard from "./reviewcard";
import Loader from "../loader/loader.jsx";
import { useAlert } from "react-alert";
import MetaData from "../metadata.jsx";
import { addItemsToCart } from "../../../actions/cartAction.jsx";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../../constants/productConstants.jsx";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, success, reviewError]);

    const stockAvailable = product?.Stock ?? 0;

    const increaseQty = () => {
        if (quantity < stockAvailable) {
            setQuantity((prevQty) => prevQty + 1);
        }
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity((prevQty) => prevQty - 1);
        }
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${product?.name} -- E-SHOP`} />
                    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="shadow-lg rounded-lg overflow-hidden">
                                <Carousel>
                                    {product?.images?.map((item, i) => (
                                        <img
                                            key={i}
                                            src={item.url}
                                            alt={`Slide ${i}`}
                                            className="w-full h-96 object-cover"
                                        />
                                    ))}
                                </Carousel>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-gray-800">{product?.name}</h2>
                                <p className="text-gray-500 text-sm">Product # {product?._id}</p>
                                <div className="flex items-center space-x-2">
                                    <Rating value={product?.ratings || 0} readOnly style={{ maxWidth: 100 }} />
                                    <span className="text-gray-600 text-sm">({product?.numOfReviews || 0} Reviews)</span>
                                </div>
                                <h1 className="text-4xl font-bold text-blue-600">₹{product?.price}</h1>
                                <p className={`text-lg font-medium ${stockAvailable < 1 ? "text-red-500" : "text-green-500"}`}>
                                    {stockAvailable < 1 ? "Out of Stock" : "In Stock"}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-lg" onClick={decreaseQty}>-</button>
                                        <input type="number" value={quantity} readOnly className="w-12 text-center border-none outline-none" />
                                        <button className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-lg" onClick={increaseQty} disabled={stockAvailable < 1}>+</button>
                                    </div>
                                    <button className={`px-6 py-3 font-semibold rounded-lg transition duration-200 ${stockAvailable < 1 ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`} disabled={stockAvailable < 1}
                                        onClick={addToCartHandler}>
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="pt-4">
                                    <h3 className="text-xl font-semibold text-gray-700">Description:</h3>
                                    <p className="text-gray-600">{product?.description}</p>
                                </div>
                                <button className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
                                    onClick={submitReviewToggle}>
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Review Dialog */}
                    <Dialog open={open} onClose={submitReviewToggle} maxWidth="sm" fullWidth>
                        <DialogTitle className="text-center font-bold text-xl text-gray-700">
                            Submit Your Review
                        </DialogTitle>
                        <DialogContent className="flex flex-col gap-4 p-6">
                            <Rating onChange={setRating} value={rating} style={{ maxWidth: 120, margin: "auto" }} />
                            <TextField
                                label="Your Review"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions className="p-4">
                            <Button onClick={submitReviewToggle} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} variant="contained" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Reviews Section */}
                    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">REVIEWS</h3>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.reviews.map((review, index) => (
                                    <ReviewCard key={index} review={review} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No Reviews Yet</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import MetaData from "../metadata";
import Sidebar from "./Slidebar.jsx";
import { clearErrors, getAdminProduct, deleteProduct} from "../../../actions/productAction.jsx";
import {DELETE_PRODUCT_RESET} from "../../../constants/productConstants.jsx";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );


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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error,deleteError,isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // Sorting function
  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <>
      <MetaData title="ALL PRODUCTS - Admin" />
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: "260px" },
            maxWidth: { sm: "calc(100% - 260px)", xs: "100%" },
            transition: "all 0.3s ease",
          }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
              ALL PRODUCTS
            </Typography>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 650 }} aria-label="product table">
                <TableHead sx={{ backgroundColor: "#007bff" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>
                      <TableSortLabel
                        active={orderBy === "_id"}
                        direction={orderBy === "_id" ? order : "asc"}
                        onClick={() => handleSort("_id")}
                      >
                        Product ID
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>
                      <TableSortLabel
                        active={orderBy === "Stock"}
                        direction={orderBy === "Stock" ? order : "asc"}
                        onClick={() => handleSort("Stock")}
                      >
                        Stock
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>
                      <TableSortLabel
                        active={orderBy === "price"}
                        direction={orderBy === "price" ? order : "asc"}
                        onClick={() => handleSort("price")}
                      >
                        Price
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell sx={{ textAlign: "center" }}>{product._id}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{product.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{product.Stock}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>₹{product.price}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Link to={`/admin/product/${product._id}`}>
                          <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                            <EditIcon fontSize="small" />
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProductList;

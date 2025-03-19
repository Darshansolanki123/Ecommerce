import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, updateProduct, getProductDetails } from "../../../actions/productAction.jsx";
import { useAlert } from "react-alert";
import MetaData from "../metadata.jsx";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Paper,
  Typography,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@mui/icons-material";
import Sidebar from "./Slidebar.jsx";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants.jsx";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id: productId } = useParams();

  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Mobile", "Camera", "Accessories", "Headphones", "Games"];

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { xs: 0, sm: "260px" },
            maxWidth: { xs: "100%", sm: "calc(100% - 260px)" },
            transition: "all 0.3s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              width: "100%",
              maxWidth: "600px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
              Create Product
            </Typography>

            <form onSubmit={updateProductSubmitHandler}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: <Spellcheck sx={{ mr: 1 }} />,
                  }}
                />

                <TextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: <AttachMoney sx={{ mr: 1 }} />,
                  }}
                />

                <TextField
                  label="Product Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputProps={{
                    startAdornment: <Description sx={{ mr: 1 }} />,
                  }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <MenuItem value="">Choose Category</MenuItem>
                    {categories.map((cate) => (
                      <MenuItem key={cate} value={cate}>
                        {cate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Stock"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                  InputProps={{
                    startAdornment: <Storage sx={{ mr: 1 }} />,
                  }}
                />

                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={updateProductImagesChange}
                    style={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outlined" component="span" fullWidth>
                      Upload Images
                    </Button>
                  </label>
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                      />
                    ))}
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {imagesPreview.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Product Preview"
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                    />
                  ))}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProduct;

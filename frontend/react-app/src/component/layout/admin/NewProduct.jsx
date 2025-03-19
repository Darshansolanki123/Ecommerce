import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createProduct } from "../../../actions/productAction.jsx";
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
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants.jsx";

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Mobile", "Camera", "Accessories", "Headphones", "Games"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      category,
      Stock,
      images, // Now images contain Base64 strings
    };

    dispatch(createProduct(productData));
  };

  const createProductImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    const base64Images = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    );

    setImagesPreview(base64Images);
    setImages(base64Images); // Now storing Base64 strings
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

            <form onSubmit={createProductSubmitHandler}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Product Name */}
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

                {/* Price */}
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

                {/* Description */}
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

                {/* Category - Fixed Spacing */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <MenuItem value="">Choose Category</MenuItem>
                    {categories.map((cate) => (
                      <MenuItem key={cate} value={cate}>
                        {cate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Stock */}
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

                {/* Image Upload */}
                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={createProductImagesChange}
                    style={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outlined" component="span" fullWidth>
                      Upload Images
                    </Button>
                  </label>
                </Box>

                {/* Image Previews */}
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

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
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

export default NewProduct;

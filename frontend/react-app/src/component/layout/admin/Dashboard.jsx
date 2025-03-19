import React, { useEffect } from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import MetaData from "../metadata";
import Sidebar from "./Slidebar.jsx";
import { getAdminProduct } from "../../../actions/productAction.jsx";
import { getAllOrders } from "../../../actions/orderAction.jsx";
import { getAllUsers } from "../../../actions/userAction.jsx";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products?.forEach((item) => {
    if (item.Stock === 0) outOfStock += 1;
  });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders?.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "tomato",
        borderColor: "tomato",
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Box className="flex">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: "80px 10px 10px", sm: "20px" },
          ml: { xs: 0, lg: "260px" }, // Adjust for sidebar
          transition: "margin 0.3s ease-in-out",
          width: { xs: "100%", lg: "calc(100% - 260px)" },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Dashboard
        </Typography>

        <Grid container spacing={2}>
          {/* Total Revenue */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 2,
                backgroundColor: "#f8f9fa",
                textAlign: "center",
                borderRadius: "12px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "green" }}>
                  ₹{totalAmount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Products, Orders, Users */}
          {[
            { label: "Products", count: products?.length, link: "/admin/products" },
            { label: "Orders", count: orders?.length, link: "/admin/orders" },
            { label: "Users", count: users?.length, link: "/admin/users" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Link to={item.link} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{item.label}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "blue" }}>
                      {item.count}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#fff", borderRadius: "12px" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sales Overview
              </Typography>
              <Line data={lineState} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#fff", borderRadius: "12px" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Stock Overview
              </Typography>
              <Doughnut data={doughnutState} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;


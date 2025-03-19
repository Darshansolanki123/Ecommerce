import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./component/layout/Header/Header.jsx";
import Home from "./component/layout/Home/Home.jsx";
import ProductDetails from "./component/layout/product/ProductDetails.jsx";
import Allproducts from "./component/layout/product/Allproducts.jsx";
import Search from "./component/layout/Header/Search.jsx";
import LoginSignUp from "./component/layout/User/LoginSignUp.jsx";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import store from "./store.jsx";
import { loadUser } from "./actions/userAction.jsx";
import Profile from "./component/layout/User/Profile.jsx";
import ProtectedRoute from "./component/layout/Route/ProtectedRoute.jsx";
import UpdateProfile from "./component/layout/User/UpdateProfile.jsx";
import UpdatePassword from "./component/layout/User/UpdatePassword.jsx";
import ForgotPassword from "./component/layout/User/ForgotPassword.jsx";
import ResetPassword from "./component/layout/User/ResetPassword.jsx";
import Cart from "./component/layout/Cart/Cart.jsx";
import Shipping from "./component/layout/Cart/Shipping.jsx";
import ConfirmOrder from "./component/layout/Cart/ConfirmOrder.jsx";
import Payment from "./component/layout/Cart/Payment.jsx";
import Ordersuccess from "./component/layout/Cart/orderSuccess.jsx";
import MyOrders from "./component/layout/Order/MyOrders.jsx";
import OrderDetails from "./component/layout/Order/orderDetails.jsx";
import Dashboard from "./component/layout/admin/Dashboard.jsx";
import ProductList from "./component/layout/admin/ProductList.jsx";
import NewProduct from "./component/layout/admin/NewProduct.jsx";
import UpdateProduct from "./component/layout/admin/UpdateProduct.jsx";
import OrderList from "./component/layout/admin/OrderList.jsx";
import ProcessOrder from "./component/layout/admin/ProcessOrder.jsx";
import UsersList from "./component/layout/admin/UsersList.jsx";
import UpdateUser from "./component/layout/admin/UpdateUser.jsx";
import ProductReviews from "./component/layout/admin/ProductReviews.jsx";
import About from "./component/layout/About/About.jsx";
import NotFound from "./component/layout/NotFound/NotFound.jsx";
import Footer from "./component/layout/Footer/Footer.jsx";
 
const App = () => {

  const {isAuthenticated, user} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);


  return (
    <HelmetProvider>
    <Router>
      <Header />
      <main className="pt-13">
      {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/product/:id" Component={ProductDetails}/>
          <Route path="/products" Component={Allproducts}/>
          <Route path="/products/:keyword" Component={Allproducts}/>
          <Route path="/Search" Component={Search}/>
          <Route path="/login" Component={LoginSignUp}/>

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/me/update" element={<UpdateProfile />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/password/update" element={<UpdatePassword />} />
          </Route>

          <Route path="/password/forgot" Component={ForgotPassword}/>

          <Route path="/password/reset/:token" Component={ResetPassword}/>

          <Route path="/cart" Component={Cart}/>

          <Route element={<ProtectedRoute />}>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/process/payment" element={<Payment />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/success" element={<Ordersuccess />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<MyOrders />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/order/:id" element={<OrderDetails/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/products" element={<ProductList/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/product" element={<NewProduct/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/product/:id" element={<UpdateProduct/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/orders" element={<OrderList/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/order/:id" element={<ProcessOrder/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/users" element={<UsersList/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/user/:id" element={<UpdateUser/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/reviews" element={<ProductReviews/>} />
          </Route>


          <Route path="/about" Component={About}/>
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer/>
      </main>
    </Router>
    </HelmetProvider>
  );
};

export default App;

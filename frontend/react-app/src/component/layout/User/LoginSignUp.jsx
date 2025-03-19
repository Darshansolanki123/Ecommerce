import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../loader/loader";
import { Mail, Lock, User } from "lucide-react";
import Profilepng from "../product/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../../actions/userAction.jsx";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(Profilepng);
  const [avatarPreview, setAvatarPreview] = useState(Profilepng);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = new URLSearchParams(location.search).get("redirect") || "/account";


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("translate-x-0");
      switcherTab.current.classList.remove("translate-x-full");
      registerTab.current.classList.add("hidden");
      loginTab.current.classList.remove("hidden");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("translate-x-full");
      switcherTab.current.classList.remove("translate-x-0");
      registerTab.current.classList.remove("hidden");
      loginTab.current.classList.add("hidden");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl">
          {/* Header Tabs */}
          <div className="flex justify-center items-center relative bg-gray-200 p-4">
            <button
              onClick={(e) => switchTabs(e, "login")}
              className="w-1/2 text-center text-gray-700 font-semibold p-2 transition-all duration-300"
            >
              LOGIN
            </button>
            <button
              onClick={(e) => switchTabs(e, "register")}
              className="w-1/2 text-center text-gray-700 font-semibold p-2 transition-all duration-300"
            >
              REGISTER
            </button>
            <span
              ref={switcherTab}
              className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 transition-all duration-300"
            ></span>
          </div>

          {/* Forms */}
          <div className="p-6">
            {/* Login Form */}
            <form
              ref={loginTab}
              onSubmit={loginSubmit}
              className="space-y-4 transition-all"
            >
              <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                <Mail className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="off"
                  className="w-full outline-none ml-2"
                />
              </div>
              <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                <Lock className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="off"
                  className="w-full outline-none ml-2"
                />
              </div>
              <Link to="/password/forgot" className="text-blue-500 text-sm">
                Forgot Password?
              </Link>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Login
              </button>
            </form>

            {/* Register Form */}
            <form
              ref={registerTab}
              onSubmit={registerSubmit}
              className="space-y-4 hidden transition-all"
            >
              <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                <User className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  autoComplete="off"
                  className="w-full outline-none ml-2"
                />
              </div>
              <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                <Mail className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  autoComplete="off"
                  className="w-full outline-none ml-2"
                />
              </div>
              <div className="flex items-center border border-gray-300 p-2 rounded-lg">
                <Lock className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  autoComplete="off"
                  className="w-full outline-none ml-2"
                />
              </div>
              <div className="flex flex-col items-center">
                <img src={avatarPreview} alt="Avatar Preview" className="w-16 h-16 rounded-full mb-2" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignUp;

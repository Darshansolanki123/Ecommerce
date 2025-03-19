import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../actions/userAction.jsx";
import { useAlert } from "react-alert";
import MetaData from "../metadata";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }

  }, [dispatch, error, alert, message]);

  return (
    <>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">Forgot Password</h2>
            <p className="text-gray-500 text-sm">Enter your email to receive a password reset link.</p>
            <form onSubmit={forgotPasswordSubmit} className="space-y-4">
              <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-50">
                <Mail className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none ml-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;

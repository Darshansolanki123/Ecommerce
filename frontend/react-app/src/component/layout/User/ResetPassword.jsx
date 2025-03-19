import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../actions/userAction.jsx";
import { useAlert } from "react-alert";
import { Lock, LockKeyhole, Eye, EyeOff } from "lucide-react";
import Loader from "../loader/loader";
import MetaData from "../metadata";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <>
      <MetaData title="Reset Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">Reset Your Password</h2>
            <p className="text-gray-500 text-sm">Enter a new password to regain access to your account.</p>

            <form onSubmit={resetPasswordSubmit} className="space-y-4">
              {/* New Password Input */}
              <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 relative">
                <Lock className="text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none ml-2 text-gray-700"
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="flex items-center border border-gray-300 p-3 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400 relative">
                <LockKeyhole className="text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent outline-none ml-2 text-gray-700"
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all font-medium"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;

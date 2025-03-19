import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import { KeyRound, Unlock, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../../actions/userAction.jsx";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants.jsx";
import MetaData from "../metadata";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, isUpdated, navigate]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Update Password"/>
                    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
                        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                                Update Password
                            </h2>

                            <form onSubmit={updatePasswordSubmit} className="space-y-5">
                                {/* Old Password */}
                                <div className="relative">
                                    <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                                    />
                                </div>

                                {/* New Password */}
                                <div className="relative">
                                    <Unlock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200"
                                    >
                                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                    </button>
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPassword}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200"
                                    >
                                        {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UpdatePassword;

import React, { useEffect } from "react";
import MetaData from "../metadata";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 md:p-8">
                        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 sm:p-8 md:p-10 border border-white/30">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden shadow-lg">
                                    <img
                                        src={user.avatar.url}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">{user.name}</h1>
                                <p className="text-white/80 text-sm sm:text-base">{user.email}</p>
                                <Link
                                    to="/me/update"
                                    className="mt-4 px-4 py-2 sm:px-5 sm:py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white transition duration-300 text-sm sm:text-base"
                                >
                                    Edit Profile
                                </Link>
                            </div>

                            {/* User Details */}
                            <div className="mt-6 grid gap-4 sm:gap-6 text-center md:text-left grid-cols-1 sm:grid-cols-2">
                                <div className="bg-white/20 p-3 sm:p-4 rounded-lg shadow-md">
                                    <h4 className="text-white font-semibold text-base sm:text-lg">Full Name</h4>
                                    <p className="text-white/80 text-sm sm:text-base">{user.name}</p>
                                </div>
                                <div className="bg-white/20 p-3 sm:p-4 rounded-lg shadow-md">
                                    <h4 className="text-white font-semibold text-base sm:text-lg">Email</h4>
                                    <p className="text-white/80 text-sm sm:text-base">{user.email}</p>
                                </div>
                                <div className="bg-white/20 p-3 sm:p-4 rounded-lg shadow-md col-span-1 sm:col-span-2">
                                    <h4 className="text-white font-semibold text-base sm:text-lg">Joined On</h4>
                                    <p className="text-white/80 text-sm sm:text-base">{String(user.createdAt).substr(0, 10)}</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                                <Link
                                    to="/orders"
                                    className="w-full sm:w-auto text-center bg-green-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 text-sm sm:text-base"
                                >
                                    My Orders
                                </Link>
                                <Link
                                    to="/password/update"
                                    className="w-full sm:w-auto text-center bg-red-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 text-sm sm:text-base"
                                >
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Profile;

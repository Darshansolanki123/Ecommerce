import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading) return null; // Show nothing until loading is complete

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin && user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Render the protected content
};

export default ProtectedRoute;

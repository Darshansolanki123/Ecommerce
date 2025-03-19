import React, { useState, useEffect, useRef } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Profilepng from "../product/Profile.png";
import { User, LogOut, List, LayoutDashboard, ShoppingCart} from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction.jsx";
import { useDispatch, useSelector} from "react-redux";

const UserOptions = ({ user }) => {
   
    const {cartItems} = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Navigation functions
    const handleProfile = () => navigate("/account");
    const handleOrders = () => navigate("/orders");
    const handleDashboard = () => navigate("/admin/dashboard");
    const Cart = () => navigate("/cart");

    // Logout function
    const handleLogout = () => {
        dispatch(logout());
        alert.success("Logout Successfully");
        navigate("/login");
    };

    // Menu options
    const actions = [
        { icon: <User size={24} />, name: "Profile", onClick: handleProfile },
        { icon: <List size={24} />, name: "Orders", onClick: handleOrders },
        { icon: <ShoppingCart size={24} style={{color:cartItems.length > 0 ? "blue" : "unset"}}/>,
         name: `Cart(${cartItems.length})`, onClick: Cart },
        { icon: <LogOut size={24} />, name: "Logout", onClick: handleLogout },
    ];

    if (user.role === "admin") {
        actions.unshift({
            icon: <LayoutDashboard size={24} />,
            name: "Dashboard",
            onClick: handleDashboard
        });
    }

    return (
        <div
            ref={menuRef}
            style={{
                position: "fixed",
                top: "80px", // Slightly below the header
                right: "20px",
                zIndex: 1500,
            }}
        >
            {/* Dark background overlay on hover */}
            {open && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                        zIndex: 1000,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                    onClick={() => setOpen(false)} // Close dropdown when clicking the overlay
                />
            )}

            {/* SpeedDial Menu Triggered by Profile Picture */}
            <SpeedDial
                ariaLabel="User Options"
                direction="down" // ⬇ Menu opens downward
                open={open}
                onClose={() => setOpen(false)} // Close dropdown when clicking outside
                onOpen={() => setOpen(true)} // Open dropdown on hover or click
                sx={{
                    position: "absolute",
                    top: "10px", // Adjusted so profile image aligns properly
                    right: "0px",
                    zIndex: 1500,
                    "& .MuiSpeedDial-fab": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        width: 56,
                        height: 56,
                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                    },
                }}
                icon={
                    <img
                        src={user?.avatar?.url ? user.avatar.url : Profilepng}
                        alt="Profile"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "3px solid white",
                        }}
                    />
                } // Profile picture is the SpeedDial trigger
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                        sx={{
                            backgroundColor: "#ffffff",
                            color: "#000",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

export default UserOptions;

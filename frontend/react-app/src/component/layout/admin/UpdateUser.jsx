import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography } from "@mui/material";
import { MailOutline, Person, VerifiedUser } from "@mui/icons-material";
import MetaData from "../metadata.jsx";
import Sidebar from "./Slidebar";
import Loader from "../loader/loader.jsx";
import { UPDATE_USER_RESET } from "../../../constants/userConstants.jsx";
import { getUserDetails, updateUser, clearErrors } from "../../../actions/userAction.jsx";

const UpdateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id: userId } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user?.name || "");
            setEmail(user?.email || "");
            setRole(user?.role || "");
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm));
    };

    return (
        <>
            <MetaData title="Update User" />
            <Box className="dashboard" sx={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar />
                <Box
                    className="newProductContainer"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: { xs: 2, md: 5 },
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    {loading ? (
                        <Loader />
                    ) : (
                        <Box
                            component="form"
                            onSubmit={updateUserSubmitHandler}
                            sx={{
                                width: { xs: "100%", sm: "80%", md: "50%" },
                                padding: 4,
                                borderRadius: 2,
                                backgroundColor: "#fff",
                                boxShadow: 3,
                            }}
                        >
                            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: 600 }}>
                                Update User
                            </Typography>

                            {/* Name Field */}
                            <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
                                <Grid item>
                                    <Person sx={{ color: "#1976d2" }} />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Email Field */}
                            <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
                                <Grid item>
                                    <MailOutline sx={{ color: "#1976d2" }} />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Role Selection */}
                            <Grid container alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
                                <Grid item>
                                    <VerifiedUser sx={{ color: "#1976d2" }} />
                                </Grid>
                                <Grid item xs>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Role</InputLabel>
                                        <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
                                            <MenuItem value="">Choose Role</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="user">User</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* Update Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={updateLoading || role === ""}
                                sx={{
                                    padding: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                }}
                            >
                                Update
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default UpdateUser;

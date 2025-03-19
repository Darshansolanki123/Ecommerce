import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MetaData from "../metadata";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Sidebar from "./Slidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../../actions/userAction.jsx";
import { DELETE_USER_RESET } from "../../../constants/userConstants.jsx";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1.2 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.8 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => (params.row.role === "admin" ? "greenColor" : "redColor"),
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Link to={`/admin/user/${params.row.id}`}>
            <EditIcon sx={{ color: "blue", cursor: "pointer" }} />
          </Link>
          <Button onClick={() => deleteUserHandler(params.row.id)}>
            <DeleteIcon sx={{ color: "red" }} />
          </Button>
        </Box>
      ),
    },
  ];

  const rows = users?.map((item) => ({
    id: item._id,
    role: item.role,
    email: item.email,
    name: item.name,
  }));

  return (
    <>
      <MetaData title="ALL USERS - Admin" />
      <Box display="flex">
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            padding: isMobile ? "80px 10px 10px" : "20px",
            marginLeft: isMobile ? 0 : "260px",
            transition: "margin 0.3s ease-in-out",
            width: isMobile ? "100%" : "calc(100% - 260px)",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
            ALL USERS
          </Typography>
          <Box sx={{ backgroundColor: "white", borderRadius: "10px", padding: "10px", boxShadow: 3 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UsersList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import { Mail, User, Image } from "lucide-react";
import Profilepng from "../product/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../../actions/userAction.jsx";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants.jsx";
import MetaData from "../metadata";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(Profilepng);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);

        if (avatar) {
            myForm.set("avatar", avatar);
        }

        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar?.url || Profilepng);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, alert, user, isUpdated, navigate]);

    return (
        <>
         <MetaData title=""/>
            {loading ? (
                <Loader />
            ) : (
              <> 
                <MetaData title={`${user.name}'s Update Profile`} />
                <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Update Profile</h2>

                        <form className="space-y-5" onSubmit={updateProfileSubmit}>
                            {/* Name Input */}
                            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                <User size={20} className="text-gray-500 dark:text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="off"
                                    className="bg-transparent w-full outline-none text-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                <Mail size={20} className="text-gray-500 dark:text-gray-300" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                    className="bg-transparent w-full outline-none text-gray-700 dark:text-white"
                                />
                            </div>

                            {/* Image Upload */}
                            <label htmlFor="avatar" className="cursor-pointer flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                                <Image size={20} />
                                <span>Upload Profile Picture</span>
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                className="hidden"
                                onChange={updateProfileDataChange}
                            />

                            {/* Avatar Preview */}
                            <div className="flex justify-center">
                                <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover" />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                </>
            )}
        </>
    );
};

export default UpdateProfile;

import toast from "react-hot-toast";

import {setUser} from "../../slices/profileSlice"
import {apiConnector} from "../apiConnector"
import { settingsEndpoints } from "../apis";
import {logout} from "./authAPI"

const {
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
    DELETE_PROFILE_API,
    CHANGE_PASSWORD_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");

        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log(
                "Update display picture API response....", response
            );

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture updated successfully");

            // const userImage = response.data?.data?.image
            //     ? response.data.data.image 
            //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.data?.firstName} ${response.data?.data?.lastName}`

            // dispatch(setUser({...response.data.data, image: userImage}));

            dispatch(setUser(response?.data?.data));

            // add to local storage because after updating profile picture and reloading the image goes exist
            localStorage.setItem("user", JSON.stringify(response.data.data));

        } catch(error) {
            console.log("Error in updating display picture....", error);
            toast.error("Could not update display picture")  
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading")

        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`
            });

            console.log("Update profile api response....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            const userImage = response.data.updatedUserDetails.image
                ? response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

            dispatch(
                setUser({...response.data.updatedUserDetails, image: userImage})
            )
            toast.success("Profile Updated Successfully");
        } catch(error) {
            console.log("Error in updating profile", error);
            toast.error("Could not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("Change password api response....", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password changed successfully");
    } catch(error) {
        console.log("Error while changing password....", error);
        toast.error("Could not Update Password");
    }
    toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            })
            console.log("Delete Profile api response....". response);

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Profile Deleted Succssfully");
            dispatch(logout(navigate));
        } catch(error) {
            console.log("Error in profile Deletion....", error);
            toast.error("Could not delete Profile");
        }
        toast.dismiss(toastId);
    }
}
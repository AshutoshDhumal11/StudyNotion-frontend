import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { setLoading, setUser } from "../../slices/profileSlice";
import { profileEndPoints } from "../apis";
import { logout } from "./authAPI";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndPoints;

export function getUserDetails(token, navigate) {
    return async(dispatch) => {

        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, 
                {
                    "Authorization": `Bearer ${token}`,
                }
            )
            console.log("Get_User_Details_API response....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            const userImage = response?.data?.userDetails?.image
                            ? response?.data?.userDetails?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.userDetails?.firstName} ${response?.data?.userDetails?.lastName}`

            dispatch(setUser({...response.data.userDetails, image: userImage}));

        } catch(error) {
            dispatch(logout(navigate))
            console.log("Get_User_Details_API ERROR....", error);
            toast.error("Could not get user Details");
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                "Authorization": `Bearer ${token}`
            }
        )
        console.log("Get User Enrolled Courses API response....", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;
    } catch(error) {
        console.log("Get User Enrolled Courses API error....", error);
        toast.error("Could not get Enrolled Courses")
    }

    toast.dismiss(toastId);
    return result;
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading....")
    let result = []

    try {
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_DATA_API,
            null,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        console.log("Get Instructor Data API response....", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
    } catch(error) {
        console.log("Get Instructor Data API error....", error);
        toast.error("Could not get Instructor Data");
    }

    toast.dismiss(toastId);
    return result;
}
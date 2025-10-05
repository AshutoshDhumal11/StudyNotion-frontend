import toast from "react-hot-toast";

import {setLoading, setToken} from "../../slices/authSlice"
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    SENDOTP_API,
    SIGNUP_API, 
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = authEndpoints

// SendOTP function
export function sendotp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true
            });

            console.log("Send OTP_API response", response);

            console.log(response.data.success);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully")
            navigate("/verify-email");

        } catch(error) {
            console.log("SENDOTP API ERROR....", error);
            toast.error("Could not send OTP");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// SignUp function
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })

            console.log("SignUp API response", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfully");
            navigate("/login");

        } catch(error) {
            console.log("SIGNUP_API error....", error);
            toast.error("Signup failed");
            navigate("/signup");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// Login function
export function login(email, password, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })

            console.log("Login API response....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successful");
            dispatch(setToken(response.data.token))

            const userImage = response.data?.userExist?.image
                ? response.data.userExist.image 
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.userExist?.firstName} ${response.data?.userExist?.lastName}`

            dispatch(setUser({...response.data.userExist, image: userImage}))

            // add token to localstorage
            localStorage.setItem("token", JSON.stringify(response.data.token));
            // similarly add user to local storage because error occur while developing my-profile section after reload data goes exists
            localStorage.setItem("user", JSON.stringify(response.data.userExist))
            navigate("/dashboard/my-profile");

        } catch(error) {
            console.log("LOGIN_API error....", error);
            toast.error("Login failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// function for get password reset token
function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {email})

            console.log("Reset Password token response....", response)

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email sent, Please check")
            setEmailSent(true);

        } catch(error) {
            console.log("error in reset password token....", error);
            toast.error("Error in sending reset password token email");
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

// Reset Password function
export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token
            })

            console.log("Reset Password response....", response);

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password reset successfully");
            navigate("/reset-complete");

        } catch(error) {
            console.log("Error in password reset....", error);
            toast.error("Failed in reset password")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

// Function for logout
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        toast.success("Logged out successfully")

        // navigate to home page
        navigate("/")
    }
}

export default getPasswordResetToken;

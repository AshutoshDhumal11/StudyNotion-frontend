import toast from "react-hot-toast"

import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"

const {
    SEND_PAYMENT_SUCCESS_EMAIL_API,
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
} = studentEndpoints

// load the razorpay SDK from CDN
function loadScript(src) {
    return new Promise( (resolve) => {
        const script = document.createElement("script")
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

// Buy Course
export const BuyCourse = async (token, courses, user_details, navigate, dispatch) => {
    const toastId = toast.loading("Loading....")

    try {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!response) {
            toast.error("Razorpay SDK failed to load. Check you Internet Connection.")
            return 
        }

        // Initiating the order in Backend
        const orderResponse = await apiConnector(
            'POST',
            COURSE_PAYMENT_API,
            {
                courses
            },
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }

        console.log("Payment response from backend....", orderResponse)

        // Opening the Razorpay SDK
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}}`,
                email: user_details.email
            },
            handler: function(response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifyPayment({...response, courses}, token, navigate, dispatch)
            },
        }

        const paymentObject = new window.Razorpay(options)

        paymentObject.open()
        paymentObject.on("Payment failed", function(response) {
            toast.error("Oops! Payment failed.")
            console.log(response.error)
        })

    } catch(error) {
        console.log("Buy Course API Error....", error)
        toast.error("Could  not make Payment.")
    }

    toast.dismiss(toastId)
}

// Verify Payment 
export const verifyPayment = async(bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Loading....")
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })

        console.log('Verify Payment API Response....', response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Payment Successful. You are added to the course. Start Your learning today.")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())

    } catch(error) {
        console.log("Error on Payment Verify API....", error)
        toast.error("Could not Verify Payment")
    }

    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
} 

// Send the Payment Success Email
export const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
    } catch(error) {
        console.log("Payment Success Email API Error", error)
    }
}
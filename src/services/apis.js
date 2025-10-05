const BASE_URL = process.env.REACT_APP_BASE_URL


// AUTHENTICATION ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup", 
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// CONTACTUSENDPOINTS
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact"
}

// CATAGORIES API
export const categoriesEndpoints = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// PROFILE PAGE API
export const profileEndPoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

// COURSE PAGE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// RATING AND REVIEWS ENDPOINTS
export const ratingEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews"
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessfulEmail"
} 

// CATALOG PAGE ENDPOINTS
export const catalogEndpoints = {
    CATALOGPAGE_API: BASE_URL + "/course/getCategoryPageDetails"
}

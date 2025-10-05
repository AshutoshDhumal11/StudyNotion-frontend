import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { updateCompletedLectures } from "../../slices/viewCourseSlice"

import { courseEndpoints } from "../apis";
const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    CREATE_COURSE_API,
    DELETE_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API
} = courseEndpoints;


// fetch All Courses
export const getAllCourses = async() => {
    const toastId = toast.loading("Loading....");
    let result = []

    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API);

        if(!response?.data?.success) {
            throw new Error("Course not fetch course categories")
        }

        result = response?.data?.data
    } catch(error) {
        console.log("Get All Courses API Error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// fetch course details
export const fetchCourseDetails = async(courseId) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector('POST', COURSE_DETAILS_API, {courseId});
        console.log("Course Details API Response....", response);

        if(!response?.data?.success) {
            throw new Error(response.data.message);
        }
        
        result = response.data;
    } catch(error) {
        console.log("Fetch Course Details API Error....", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}

// fetch available categories
export const fetchCourseCategories = async() => {
    let result = [];

    try {
        const response = await apiConnector('GET', COURSE_CATEGORIES_API);
        console.log("Course Category API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not fetch Course Categories");
        }

        result = response?.data?.data;
    } catch(error) {
        console.log("Course Category API Error....", error);
        toast.error(error.message);
    }
    return result;
}

// Create Course 
export const addCourseDetails = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector('POST', CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("Create Course API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not add course Details");
        }

        toast.success("Course Created Successfully");
        result = response?.data?.data;

    } catch(error) {
        console.log("Create Course API Error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// edit Course Details
export const editCourseDetails = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("Edit Course API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not update course Details");
        }

        toast.success("Course Details updated successfully");
        result = response?.data?.data;

    } catch(error) {
        console.log("Edit Course API Error....", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// Create section
export const createSection = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("Create Section API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not create Section");
        }

        toast.success("Course Section Created Successfully");
        result = response?.data?.updatedCourseDetails;
    } catch(error) {
        console.log("Create Section API Error....", error);
        toast.error(error.message);
    }
    
    toast.dismiss(toastId);
    return result;
}

// Create section
export const createSubSection = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("Create Sub-Section API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not add Lectures");
        }

        toast.success("Lecture Added");
        result = response?.data?.data;
    } catch(error) {
        console.log("Create SubSection API Error....", error);
        toast.error(error.message);
    }
    
    toast.dismiss(toastId);
    return result;
}

// Update Section
export const updateSection = async (data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Update Section API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not update Section");
        }

        toast.success("Course Section Updated Successfully.");
        result = response?.data.updatedCourse;

    } catch(error) {
        console.log("Update Section API Error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// Update Sub-Section
export const updateSubSection = async (data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Update Sub-Section API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not update Lecture");
        }

        toast.success("Lecture Updated");
        result = response?.data.data;
        
    } catch(error) {
        console.log("Update Sub-Section API Error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete section
export const deleteSection = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Delete Section API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not Delete Section");
        }

        toast.success("Course Section Deleted Successfully.");
        result = response?.data?.data;
    } catch(error) {
        console.log("Delete Section API Error....", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// delete section
export const deleteSubSection = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;

    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Delete Sub-Section API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not Delete Lecture");
        }
        
        toast.success("Lecture Deleted Successfully.");
        result = response?.data?.data;
    } catch(error) {
        console.log("Delete Sub-Section API Error....", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// fetch all courses of the Instructor
export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("Loading....");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Fetch Instructor Courses API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not fetch Instructor Courses");
        }

        result = response?.data?.data;

    } catch(error) {
        console.log("Fetch Instructor Courses API Error....", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// Delete Course
export const deleteCourse = async(data, token) => {
    const toastId = toast.loading("Loading....");

    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("Delete Course API Response....", response);

        if(!response?.data?.success) {
            throw new Error("Could not delete Course.")
        }

        toast.success("Course Deleted Successfully.");
    } catch(error) {
        console.log("Delete Course API Error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

// Fetch Full Details of Course
export const getFullCourseDetails = async(courseId, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;
    console.log("in")
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, {courseId}, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Get Full Course Details API Response....", response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.data;

    } catch (error) {
        console.log("Get Full Course Details API Error....", error);
        // toast.error(error?.response?.data?.message);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}

// mark a lecture as completed
export const markeLectureAsComplete = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let result = null;
    console.log("Mark complete data", data);

    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Mark Lecture as Complete API response....", response);

        if(!response.data.message) {
            throw new Error(response.data.error);
        }
        
        toast.success("Lecture Completed");
        result = true;

    } catch(error) {
        console.log("Mark Lecture as Complete API Error....", error);
        toast.error(error.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}

// Create a raring for Course
export const createRating = async(data, token) => {
    const toastId = toast.loading("Loading....");
    let success = false;

    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data , {
            Authorization: `Bearer ${token}`,
        });

        console.log("Create Rating API Response....", response);
        
        if(!response?.data?.success) {
            throw new Error("Could not Create Rating");
        }

        toast.success("Rating Created.")
        success = true
    } catch(error) {
        success = false;
        console.log("Create Rating API Error....", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return success;
}
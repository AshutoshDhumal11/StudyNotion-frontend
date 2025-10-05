import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscAdd } from "react-icons/vsc";
import { CoursesTable } from "../Dashboard/InstructorCourses/CoursesTable"
import { useEffect } from 'react';
import IconBtn from '../../common/IconBtn';

import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'

export const MyCourses = () => {

    const { token } = useSelector( (state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect( () => {
        const fetchCourses = async() => {
            try {
                const response = await fetchInstructorCourses(token);

                if(response) {
                    setCourses(response)
                }
            } catch(error) {
                console.log("Error in fetching Instructor Courses....", error);
            }
        }

        fetchCourses()
    }, [])

    return (
        <div>
            <div className='mb-14 flex items-center justify-between'>
                <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
                <IconBtn
                    text="Add Course"
                    onClick={ () => navigate("/dashboard/add-course")}
                >
                    <VscAdd></VscAdd>
                </IconBtn>
            </div>
            {
                courses && <CoursesTable courses={courses} setCourses={setCourses}></CoursesTable>
            }
        </div>
    )
}


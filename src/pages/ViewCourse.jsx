import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { VideoDetailSidebar } from '../components/core/ViewCourse/VideoDetailSidebar'
import { Outlet } from 'react-router-dom'
import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal'

import { getFullCourseDetails } from "../services/operations/courseDetailsAPI"
import viewCourseSliceFunctions from "../slices/viewCourseSlice"

const {
    setCourseEntireData,
    setCompletedLectures,
    setCourseSectionData,
    setTotalNoOfLectures
} = viewCourseSliceFunctions

export const ViewCourse = () => {

    const { courseId } = useParams()
    const { token } = useSelector( (state) => state.auth)
    const dispatch = useDispatch()
    const [ reviewModal, setReviewModal ] = useState(false)

    useEffect( () => {
        ;( async () => {
            const courseData = await getFullCourseDetails(courseId, token) 

            if(!courseData) {
                console.log("Course not found")
            }

            dispatch(setCourseEntireData(courseData.courseDetails))
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setCompletedLectures(courseData.completedVideos))

            let lectures = 0;

            courseData?.courseDetails?.courseContent?.forEach( (section) => {
                lectures += section.subSection.length    
            })

            dispatch(setTotalNoOfLectures(lectures))
        }) ()
    })
    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailSidebar setReviewModal={setReviewModal}/>
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className='mx-6'>
                        <Outlet/>
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}
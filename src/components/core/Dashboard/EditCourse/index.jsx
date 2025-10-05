import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullCourseDetails } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import { RenderSteps } from "../AddCourse/RenderSteps"

export const EditCourse = () => {

    const [ loading, setLoading ] = useState(false)
    const { course } = useSelector( (state) => state.course)
    const { token } = useSelector( (state) => state.auth)
    const { courseId } = useParams()
    const dispatch = useDispatch();

    useEffect( () => {
        ;(async () => {
            setLoading(true)
            const result = await getFullCourseDetails(courseId, token)

            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }

            setLoading(false)
        }) ()
    }, [])

    if(loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className='spinner'></div>
            </div>
        )
    }
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
            <div className="mx-auto max-w-[600px]">
                {
                    course ? (
                        <RenderSteps/>
                    ) : (
                        <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                            Course not found
                        </p>
                    )
                }
            </div>
        </div>
    )
}

import React from 'react'
import { HiOutlineVideoCamera } from "react-icons/hi";

export const CourseSubSectionAccordion = ({ subSec }) => {
    return (
        <div className='bg-richblack-900'>
            <div className='flex justify-between py-2'>
                <div className='flex items-center gap-2'>
                    <span>
                        <HiOutlineVideoCamera/>
                    </span>
                    <p className='text-richblack-5'>{subSec?.title}</p>
                </div>
            </div>
        </div>
    )
}

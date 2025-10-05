import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import Button from "../HomePage/Button";

export const InstructorSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-20 items-center'>

            <div className='lg:w-[50%]'>
                <img
                    src={Instructor}
                    alt='Instructor Image'
                    className='shadow-white shadow-[-20px_-20px_0_0]'    
                ></img>
            </div>

            <div className='flex flex-col gap-10 lg:w-[50%]'>
                <div className='text-4xl font-semibold lg:w-[50%]'>
                    Become an
                    <HighlightText text={"instructor"}></HighlightText>
                </div>

                <p className='font-medium text-richblack-300 text-[16px] w-[80%] text-justify'>
                    Instructors from around the world teach millions of students on StudyNotion.
                    We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <Button active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-3 items-center'>
                            Start Teaching Today
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </Button>
                </div>
            </div>

        </div>
    </div>
  )
}

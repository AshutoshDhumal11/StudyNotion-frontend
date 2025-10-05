import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button'

export const LearningLanguageSection = () => {
  return (
    <div>
        <div className='flex flex-col gap-5 mt-20 items-center'>

            <div className='text-center font-semibold text-4xl mt-20'>
                Your swiss Knife for
                <HighlightText text={"learning any language"}></HighlightText>
            </div>

            <div className='text-center text-richblack-700 text-base font-medium leading-6 mx-auto lg:w-[75%] mt-3'>
                Using spin making learning multiple languages easy. 
                with 20+ languages realistic voice-over, progress tracking, 
                custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img
                    src={know_your_progress}
                    alt='KnowYourProgress'
                    className='object-contain  lg:-mr-32'>
                </img>
                <img
                    src={compare_with_others}
                    alt='CompareWithOthers'
                    className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'>
                </img>
                <img
                    src={plan_your_lessons}
                    alt='PlanYourLessons'
                    className='object-contain lg:-ml-36 lg:-mt-5 -mt-16'>
                </img>
            </div>

            <div className='w-fit mx-auto lg:mb-20 mb-8 mt-14'>
                <Button active={true} linkto={"/signup"}>
                    Learn More
                </Button>
            </div>
        </div>
    </div>
  )
}

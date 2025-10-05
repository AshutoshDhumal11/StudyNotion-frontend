import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import TimelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully commited to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
]

export const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>
            
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map( (element, index) => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                
                                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
                                    <img src={element.Logo}></img>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className='realtive shadow-blue-200'>
                <img src={TimelineImage}
                alt='TimelineImage'
                className='shadow-white object-cover h-fit'></img>

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-8 translate-x-12 translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className="text-caribbeangreen-300 text-sm">Years of experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

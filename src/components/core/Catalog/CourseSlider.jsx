import React from 'react'

//import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import swiper required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { CourseCard } from './CourseCard';


// I think their is a requirement of getting all the courses
// import { getAllCourses } from "../../services/operations/courseDetailsAPI"

export const CourseSlider = ({courses}) => {
    return (
        <>
        {
            courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        }
                    }}
                    className="max-h-[30rem]"
                >
                    {
                        courses?.map( (course, index) => {
                            <SwiperSlide>
                                <CourseCard course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            ) : (
                <p className='text-xl text-richblack-5'>
                    No Course Found
                </p>
            )
        }
        </>
    )
}

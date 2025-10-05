import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { RatingStars } from "../../common/RatingStars"
import ReactStars from "react-rating-stars-component";
import GetAverageRating from '../../../utils/avgRating';

export const CourseCard = ({course, Height}) => {

    const [ avgReviewCount, setAvgReviewCount ] = useState(0)

    useEffect( () => {
        const count = GetAverageRating(course.ratingAndReviews)
        setAvgReviewCount(count);
    }, [course])

    return (
        <>
          <Link to={`/courses/${course._id}`}>
            <div className='max-w-[384px]'>
                <div className='rounded-lg'>
                    <img
                        src={course?.thumbnail}
                        alt="course thumbnail"
                        className={`${Height} w-full rounded-xl object-cover`}
                    ></img>
                </div>

                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p className="text-sm text-richblack-50">
                        {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                        {/* <ReactStars
                            count={5}
                            value={avgReviewCount || 0}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<FaRegStar></FaRegStar>}
                            fullIcon={<FaStar></FaStar>}
                        ></ReactStars> */}

                        <RatingStars Review_Count={avgReviewCount}></RatingStars>
                        <span className="text-richblack-400">
                            {course?.ratingAndReviews?.length} Ratings
                        </span>
                    </div>
                    <p className="text-xl text-richblack-5">
                        Rs. {course?.price}
                    </p>
                </div>

            </div>
          </Link>  
        </>
    )
}

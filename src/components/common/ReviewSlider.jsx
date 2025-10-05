import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiConnector'
import { ratingEndpoints } from '../../services/apis'
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'
import { FaStar } from 'react-icons/fa'
import ReactStars from "react-rating-stars-component"

// Import Swiper Styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

export const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect( () => {
        // ;(async() => {
        //     const { data } = await apiConnector("GET", ratingEndpoints.REVIEWS_DETAILS_API)

        //     if(data?.success) {
        //         setReviews(data?.data)
        //     }
        // }) ()

        // Prevent state updates if the component unmounts
        let isMounted = true;

        const fetchReviews = async () => {
            try {
                const { data } = await apiConnector("GET", ratingEndpoints.REVIEWS_DETAILS_API);
                if (data?.success && isMounted) {
                    setReviews(data?.data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();

        // Cleanup function to set isMounted to false on unmount
        return () => {
            isMounted = false;
        };
    }, [])

    return (
        <div className='text-white'>
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className='w-full'
                >
                {
                    reviews.map( (review, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                            >
                                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                            }
                                            alt=''
                                            className='h-9 w-9 rounded-full object-cover'
                                        ></img>
                                        <div className='flex flex-col'>
                                            <h1 className='font-semibold text-richblack-5'>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                            <h2 className='text-[12px] font-medium text-richblack-500'>{review?.course?.courseName}</h2>
                                        </div>
                                    </div>

                                    <p className='flex items-center gap-2'>
                                    {
                                        review?.review.split(" ").length > truncateWords
                                        ? `${review?.review
                                            .split(" ")
                                            .slice(0, truncateWords)}
                                            .join(" ")} ...`
                                        : `${review?.review}`
                                    }
                                    </p>

                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-semibold text-yellow-100'>
                                            {
                                                review?.rating.toFixed(1)
                                            }
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar/>}
                                            fullIcon={<FaStar/>}
                                        ></ReactStars>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                </Swiper>
            </div>
        </div>
    )
}

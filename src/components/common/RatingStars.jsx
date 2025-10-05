import React, { useEffect } from 'react'
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti'
import { useState } from 'react'

export const RatingStars = ({Review_Count, Star_Size}) => {

    const [starCount, setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0
    })

    useEffect( () => {
        const wholeStars = Math.floor(Review_Count) || 0
        setStarCount({
            full: wholeStars,
            half: Number.isInteger(Review_Count) ? 0 : 1,
            empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
        })
    }, [Review_Count])

    return (
        <div className='flex gap-1 text-yellow-100'>
            {
                [...new Array(starCount.full)].map( (_, index) => {
                    return <TiStarFullOutline key={index} size={Star_Size || 20}></TiStarFullOutline>
                })
            }
            {
                [...new Array(starCount.half)].map( (_, index) => {
                    return <TiStarHalfOutline key={index} size={Star_Size || 20}></TiStarHalfOutline>
                })
            }
            {
                [...new Array(starCount.empty)].map( (_, index) => {
                    return <TiStarOutline key={index} size={Star_Size || 20}></TiStarOutline>
                })
            }
        </div>
    )
}

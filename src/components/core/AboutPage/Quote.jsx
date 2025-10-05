import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

export const Quote = () => {
    return (
        <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
            
            <span>
                {/* <RiDoubleQuotesL/> */}
                We are passionate about revolutionizing the way we learn. Our innovative platform
            </span>
            <HighlightText text={"combines technology"}></HighlightText>
            ,
            <span
                 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"
            >
                {" "}
                expertise
            </span>
            , and community to create an 
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                {" "}
                unparalleled educational experience.
            </span>
            {/* <RiDoubleQuotesR/> */}
        </div>
    )
}

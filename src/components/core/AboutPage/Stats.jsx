import React from 'react'

const StatsData = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
]
export const Stats = () => {
  return (
    <div className="bg-richblack-700">

        <div className="flex flex-row gap-10 justify-around w-11/12 max-w-maxContent text-white mx-auto">
            {
                StatsData.map( (stat, index) => {
                    return (
                        <div 
                            key={index}
                            className="flex flex-col py-10 justify-center items-center"
                        >
                            <h1 className="text-[30px] font-bold text-richblack-5">
                                {stat.count}
                            </h1>
                            <h2 className="font-semibold text-[16px] text-richblack-500">
                                {stat.label}
                            </h2>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

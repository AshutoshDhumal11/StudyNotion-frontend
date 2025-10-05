import React from 'react'
import { useState } from 'react';
import { Chart, registerables } from 'chart.js'

import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

export const InstructorChart = ({courses}) => {

  // for keep track of currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // function for generating random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for(let i=0; i<numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors;
  }

  // Data for the chart displaying students information
  const chartStudentsData = {
    labels: courses.map( (course) => course.courseName),
    datasets: [
      {
        data: courses.map( (course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ]
  }

  // Data for chart displaying income information
  const chartIncomeData = {
    labels: courses.map( (course) => course.courseName),
    datasets: [
      {
        data: courses.map( (course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      }
    ]
  }

  // options for the chart
  const options = {
    maintainAspectRatio: false,
  }
  return (
    <div className='flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6'>
        <p className='text-lg font-bold text-richblue-5'>Visualize</p>

        <div className='space-x-4 font-semibold'>
          {/* Button for Students chart */}
          <button
            onClick={ () => setCurrChart("students")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
            }`}
          >
            Students
          </button>

          {/* Button for Income chart */}
          <button
            onClick={ () => setCurrChart("income")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
            }`}
          >
            Incone
          </button>
        </div>

        <div className='relative mx-auto aspect-square h-full w-full'>
          <Pie
            data={currChart === "students" ? chartStudentsData : chartIncomeData}
            options={options}
          ></Pie>
        </div>
    </div>
  )
}

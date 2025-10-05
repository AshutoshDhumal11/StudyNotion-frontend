import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

import { markeLectureAsComplete } from '../../../services/operations/courseDetailsAPI'
import updateCompletedLectures from "../../../slices/viewCourseSlice"

import IconBtn from "../../common/IconBtn"

export const VideoDetailSidebar = ({setReviewModal}) => {

  const [ loading, setLoading ] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const [ activeStatus, setActiveStatus ] = useState("")
  const [ videoBarActive, setVideoBarActive ] = useState("")

  const { courseId, sectionId, subSectionId } = useParams()

  const { 
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  } = useSelector( (state) => state.viewCourse)
  const { token } = useSelector( (state) => state.auth)

  const dispatch = useDispatch()

  useEffect( () => {
    ;(() => {
      if(!courseSectionData.length) return 

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex( 
        (data) => data._id === subSectionId
      )

      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoBarActive(activeSubSectionId)
    }) ()
  }, [courseSectionData, courseEntireData, location.pathname])

  const handleLectureCompleted = async(courseId, subSectionId, token) => {
    setLoading(true)
    const response = await markeLectureAsComplete(
      {courseId: courseId, subsectionId: subSectionId},
      token
    )

    if(response) {
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false)
  }

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className='flex w-full items-center justify-between'>
            <div
              onClick={ () => navigate("/dashboard/enrolled-courses")}
              className='flex h-[35px] w-[35px] items-center justify-center rounded-full p-1 bg-richblack-100 text-richblack-700 hover:scale-90'
              title='back'
            >
              <IoIosArrowBack size={30}/>
            </div>

            <IconBtn
              text="Add Review"
              customClasses={`ml-auto`}
              onClick={ () => setReviewModal(true)}
            />
          </div>

          <div className='flex flex-col'>
            <p>Learn {courseEntireData?.courseName}</p>
            <p className='text-sm font-semibold text-richblack-500'>{completedLectures?.length} / {totalNoOfLectures}</p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {
            courseSectionData.map( (section, index) => {
              return (
                <div
                  className='mt-2 cursor-pointer text-sm text-richblack-5'
                  onClick={ () => setActiveStatus(section?._id)}
                  key={index}
                >
                  {/* Section Data */}
                  <div className='flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                    <div className='w-[70%] font-semibold'>
                      {section?.sectionName}
                    </div>

                    <div className='flex items-center gap-3'>
                      <span
                        className='text-[12px] font-medium'
                      >
                        Lessions {section?.subSection?.length}
                      </span>
                      <span
                        className={`${activeStatus === section?._id
                                    ? "rotate-0"
                                    : "rotate-180"}
                                  transition-all duration-500`}
                      >
                        <BsChevronDown/>
                      </span>
                    </div>
                  </div>

                  {/* Sub-Sections Data */}
                  {
                    activeStatus === section?._id && (
                      <div className='transition-[height] duration-500 ease-in-out'>
                        {
                          section?.subSection.map( (subSection, index) => {
                            return (
                              <div
                                className={`flex gap-3 px-5 py-2
                                          ${videoBarActive === subSection._id
                                          ? "bg-yellow-200 font-semibold text-richblack-800"
                                          : "hover:bg-richblack-900"}
                                `}
                                key={index}
                                onClick={ () => {
                                  navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`)
                                  setVideoBarActive(subSection._id)
                                  }}
                              >
                                <input
                                  type='checkbox'
                                  checked={completedLectures.includes(subSection?._id)}
                                  onChange={ () => {
                                    handleLectureCompleted(courseId, subSection._id, token)
                                  }}
                                >
                                  {subSection?.title}
                                </input>
                              </div>
                            )
                          } )
                        }
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

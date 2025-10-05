import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";

import { BigPlayButton, Player } from 'video-react';
import "video-react/dist/video-react.css"

import { markeLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import updateCompletedLectures from "../../../slices/viewCourseSlice"

import IconBtn from "../../common/IconBtn"

export const VideoDetails = () => {

  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const playerRef = useRef()

  const { courseId, sectionId, subSectionId } = useParams()
  const location = useLocation();

  const { token } = useSelector( (state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector( (state) => state.viewCourse)

  const [ videoData, setVideoData ] = useState([])
  const [ previewSource, setPreviewSource ] = useState("")
  const [ videoEnded, setVideoEnded ] = useState(false)

  useEffect( () => {
    ;(async() => {
      if(!courseSectionData.length) return

      if(!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses")
      } else {

        // find the preffered section from the sectionData
        const filteredData = courseSectionData.find(
          (section) => section._id === sectionId
        )

        // find the preferred subSection( videoData ) from the filteredData which is actually a preferred sectionData
        const filteredVideoData = filteredData?.subSection.find(
          (subSection) => subSection._id === subSectionId
        )

        setVideoData(filteredVideoData)
        setPreviewSource(courseEntireData?.thumbnail)
        setVideoEnded(false)
      }
    }) ()
  }, [courseSectionData, courseEntireData, location.pathname])

  // Functions for handling the video player

  // Function for check if the ongoing lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subSection) => subSection._id === subSectionId
    )

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true
    } else {
      return false
    }
  }

  // Function for check if the ongoing lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subSection) => subSection._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === (courseSectionData[currentSectionIndex]?.subSection.length) - 1) {
      return true
    } else {
      return false
    }
  }

  // function for go to the next video
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSubSectionIndex]?.subSection.findIndex(
      (subSection) => subSection._id === subSectionId
    )

    // find the total no. of subSections in the currentSectionIndex
    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length

    // check if the current video is not the last video in the current section
    if(currentSubSectionIndex !== noOfSubSections - 1){  // current video is not the last video
      const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]._id

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      // if the current video is the last video in the current section then go to the next section
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[nextSectionId]?.subSection[0]._id

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }
  
  // function for go to the previous video
  const goToPreviousVideo = () => {
    
    // find the current section index
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )

    // find the current subSection Index
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (subSection) => subSection._id === subSectionId
    )

    // check if the current subSection is not the first subSection in the current section
    if(!currentSubSectionIndex === 0) {
      const previousSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]._id

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`)
    } else {
      // if the current video is the first video in the current section then
      // go to the last video in the previous section

      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id

      // go to the last video in the previous Section
      const previousSubSectionIndex = ( courseSectionData[currentSectionIndex - 1]?.subSection.length ) - 1
      const previousSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[previousSubSectionIndex]._id

      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)

    const response = await markeLectureAsComplete(
      {courseId: courseId, subsectionId: subSectionId},
      token
    )

    if(response){
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-5 text-white'>
      {
        !videoData ? (
          <img
            src={previewSource}
            alt='Preview'
            className='h-full w-full rounded-md object-cover'
          />
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={ () => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position='center'/>
            {
              videoEnded && (
                <div
                  style={{
                    backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)"
                  }}
                  className='full absolute inset-0 z-[100] grid h-full place-content-center font-inter'
                >
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onClick={ () => handleLectureCompletion()}
                        text={!loading ? "Mark As Completed" : "Loading...."}
                        customClasses={`text-xl max-w-max px-4 mx-auto`}
                      />
                    )
                  }
                  <IconBtn
                    disabled={loading}
                    onClick={ () => {
                      if(playerRef?.current) {
                        playerRef?.current?.seek(0) // set the current time of the video to 0
                        setVideoEnded(false)
                      }
                    }}
                    text={"Rewatch"}
                    customClasses={`text-xl max-w-max px-4 mx-auto mt-2`}
                  />

                  {/* Buttons for the previous and next video */}
                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                    {
                      !isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={() => goToPreviousVideo()}
                          className='blackButton'
                        >
                          <MdSkipPrevious/>
                        </button>
                      )
                    }

                    {
                      !isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={() => goToNextVideo()}
                          className='blackButton'
                        >
                          <MdSkipNext/>
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }
          </Player>
        )
      }
      <h1 className='mt-4 text-3xl font-semibold'>
        {
          videoData?.title
        }
      </h1>
      <p className='pt-2 pb-6'>
        {
          videoData?.descrition
        }
      </p>
    </div>
  )
}

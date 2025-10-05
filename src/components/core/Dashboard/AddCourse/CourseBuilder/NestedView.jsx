import React from 'react'
import { useState } from 'react';
import { RxDropdownMenu } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

import { ConfirmationModal } from "../../ConfirmationModal"
import { useDispatch, useSelector } from 'react-redux';
import { SubSectionModal } from './SubSectionModal';

import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from '../../../../../slices/courseSlice';

export const NestedView = ({handleChangeEditSectionName}) => {


    const { course } = useSelector( (state) => state.course)
    const { token } = useSelector( (state) => state.auth) 
    const [ confirmationModal, setConfirmationModal ] = useState(null)

    const [ addSubSection, setAddSubSection ] = useState(null)
    const [ viewSubSection, setViewSubSection ] = useState(null)
    const [ editSubSection, setEditSubSection ] = useState(null)

    const dispatch = useDispatch()

    const handleDeleteSection = async (sectionId) => {
        const response = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })

        if(response) {
            dispatch(setCourse(response))
        }

        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const response = await deleteSubSection({subSectionId, sectionId, token})

        if(response) {
            const updatedCourseContent = course.courseContent.map( (section) => 
                section._id === sectionId ? response : section
            )

            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setConfirmationModal(null)
    }   

    return (
        <>
            <div
                className='rounded-lg bg-richblack-700 p-6 px-8'
                id='nestedViewContainer'
            >
                {
                    course?.courseContent?.map( (section) => {
                        return (
                            <details key={section._id} open>
                                {/* Section Dropdown */}
                                <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                                    <div className='flex items-center gap-x-3'>
                                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                        <p className='font-semibold text-richblack-50'>
                                            {section?.sectionName}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-x-3'>
                                        <button
                                            onClick={ () => handleChangeEditSectionName(section._id, section?.sectionName)}
                                        >
                                            <MdEdit className="text-xl text-richblack-300"/>
                                        </button>
                                        
                                        <button
                                            onClick={ () => 
                                                setConfirmationModal({
                                                    text1: "Delete this Section ?",
                                                    text2: "All the lectures in this section will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancle",
                                                    btn1Handler: () => handleDeleteSection(section._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                        </button>

                                        <span className='font-medium text-richblack-300'>|</span>
                                        <AiFillCaretDown className="text-xl text-richblack-300"/>
                                    </div>
                                </summary>
                                
                                {/* For redering all subSections within a section */}
                                <div className='px-6 pb-4'>
                                    {
                                        section?.subSection?.map( (data) => {
                                            return (
                                                <div
                                                    key={data?._id}
                                                    onClick={ () => setViewSubSection(data)}
                                                    className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                                >
                                                    <div className='flex items-center gap-x-3 py-2'>
                                                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                                        <p className='font-semibold text-richblack-50'>
                                                            {data?.title}
                                                        </p>
                                                    </div>

                                                    <div
                                                        onClick={ (event) => event.stopPropagation()}
                                                        className='flex items-center gap-x-3'
                                                    >   
                                                        {/* Edit button */}
                                                        <button
                                                            onClick={ () => setEditSubSection({...data, sectionId: section._id})}
                                                        >
                                                            <MdEdit className='text-xl text-richblack-300'/>
                                                        </button>

                                                        {/* Delete button */}
                                                        <button
                                                            onClick={ () => 
                                                                setConfirmationModal({
                                                                    text1: "Delete this Sub-Section ?",
                                                                    text2: "This lectuer will be deleted",
                                                                    btn1Text: "Delete",
                                                                    btn2Text: "Cancle",
                                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                                    btn2Handler: () => setConfirmationModal(null)
                                                                })
                                                            }
                                                        >
                                                            <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {/* Add new lecture to Section */}
                                    <button
                                        onClick={ () => setAddSubSection(section._id)}
                                        className='mt-3 flex items-center gap-x-1 text-yellow-50'
                                    >
                                        <FaPlus className="text-lg"/>
                                        <p>Add Lecture</p>
                                    </button>
                                </div>
                            </details>
                        )
                    })
                }
            </div>

            {/* Modal display */}
            {
                addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <SubSectionModal
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true}
                    />
                ) : editSubSection ? (
                    <SubSectionModal
                        modalData={editSubSection}
                        setModalData={setEditSubSection}
                        edit={true}
                    />
                ) : (
                    <></>
                )
            }

            {/* Confirmation Modal */}
            {
                confirmationModal ? (
                    <ConfirmationModal modalData={confirmationModal}/>
                ) : (
                    <></>
                )
            }
        </>
    )
}

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { MdNavigateNext } from "react-icons/md";

import IconBtn from "../../../../common/IconBtn"

import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import { NestedView } from './NestedView';

export const CourseBuilderForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm()

    const { token } = useSelector( (state) => state.auth)
    const { course } = useSelector( (state) => state.course) 
    const [ loading, setLoading ] = useState(false)
    const [ editSectionName, setEditSectionName ] = useState(null)
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        setLoading(true)

        let response;

        if(editSectionName) {
            response = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id
            }, token)
        } else {
            response = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id
                },
                token
            )
        }

        if(response) {
            dispatch(setCourse(response))
            setEditSectionName(null)
            setValue("sectionName", "")
        }

        setLoading(false)
    }

    const cancleEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId) {
            cancleEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

    const goToNext = () => {
        if(course?.courseContent?.length === 0) {
            toast.error("Please add at least one section")
            return 
        }
        if(course.courseContent.some( (section) => section?.subSection?.length === 0)) {
            toast.error("Please add at least one lecture in each section")
            return 
        }
        dispatch(setStep(3))
    }

    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }

    return (
        <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <label htmlFor='sectionName' className='text-sm text-richblack-5'>
                        Section Name <sup className='text-pink-200'>*</sup>
                    </label>
                    <input
                        id='sectionName'
                        disabled={loading}
                        placeholder='Add a section to build your course'
                        {...register("sectionName", {required: true})}
                        className='form-style w-full'
                    />
                    {
                        errors.sectionName && (
                            <span className='text-xs ml-2 tracking-wide text-pink-200'>
                                Section name is required
                            </span>
                        )
                    }
                </div>

                <div className='flex items-end gap-x-4'>
                    <IconBtn
                        type="submit"
                        disabled={loading}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50"/>
                    </IconBtn>
                    {
                        editSectionName && (
                            <button
                                type='button'
                                onClick={cancleEdit}
                                className='text-sm text-richblack-300 underline'
                            >
                                Cancle Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {/* Nested View */}
            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                )
            }

            {/* Next and Back button */}
            <div className='flex justify-end gap-x-3'>
                <button
                    onClick={() => goBack()}
                    className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
                >
                    Back
                </button>
                <IconBtn
                    disabled={loading}
                    text={"Next"}
                    onClick={ () => goToNext()}
                >
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </div>
    )
}

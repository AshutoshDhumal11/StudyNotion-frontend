import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json";

export const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Contact form data", data);

        try {
            setLoading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("Logging response", response);
            setLoading(false);

        } catch(error) {
            console.log("Error", error.message) 
            setLoading(false);
        }
    }
    
    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form
            onSubmit={handleSubmit(submitContactForm)} 
            className="flex flex-col gap-7"
        >

            <div className="flex flex-col gap-5 lg:flex-row">

                {/* firstName */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='firstName' className='label-style'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First name'
                        className='form-style'
                        {...register("firstName", {required: true})}
                    >
                    </input>
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName' className='label-style'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last name'
                        className='form-style'
                        {...register("lastName")}
                    >
                    </input>
                </div>
                
            </div>

            {/* email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='label-style'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email Address'
                    className='form-style'
                    {...register("email", {required: true})}
                >
                </input>
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your email address
                        </span>
                    )
                }
            </div>
            
            {/* phoneNo */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='phoneNo' className='label-style'>Phone Number</label>

                <div className='flex gap-5'>
                    {/* dropdown */}
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            name='dropdown'
                            id='dropdown'
                            className='form-style'
                            {...register("countrycode", {required: true})}
                        >
                            {
                                CountryCode.map( (element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type='number'
                            name='phoneNo'
                            id='phoneNo'
                            placeholder='12345 67890'
                            className='form-style'
                            {...register("phoneNo", 
                            {
                                required: {value: true, message: "Please enter Phone Number"},
                                maxLength: {value: 10, message: "Invalid Phone Number"},
                                minLength: {value: 10, message: "Invalid Phone Number"}
                            })}
                        >
                        </input>
                    </div>
                </div>
                {
                    errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>

            {/* message */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='message'
                        className='label-style'
                >
                    Message
                </label>
                <textarea
                    className='form-style'
                    name='message'
                    id='message'
                    cols='30'
                    rows='7'
                    placeholder='Type Your message here'
                    {...register("message", {required: true})}
                >
                </textarea>
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please type your message.
                        </span>
                    )
                }
            </div>

            <button type='submit'
                    disabled={loading}
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                    ${
                        !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>

        </form>
    )
}
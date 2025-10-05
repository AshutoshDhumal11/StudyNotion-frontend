import React, { useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { sendotp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RxCountdownTimer } from 'react-icons/rx';
import { BiArrowBack } from 'react-icons/bi';


export const VerifyEmail = () => {

    const {loading, signupData} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    useEffect ( () => {
        if(!signupData) {
            navigate("/signup");
        }
    }, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        {
            loading
            ? (
                <div>
                    <div className='spinner'></div>
                </div>)
            : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verifaction code has been sent to you. Enter the code below</p>

                    <form onSubmit={onSubmitHandler}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => (
                                <input {...props}
                                    placeholder="-"
                                    style={{
                                        boxshadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", 
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px"
                            }}
                        >
                        </OtpInput>

                        <button type='submit'
                                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"     
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">

                        <Link to={"/login"}
                            className='flex gap-1 items-center'
                        >
                            <p>
                                <BiArrowBack></BiArrowBack>
                                Back to login
                            </p>
                        </Link>
            
                        
                        <button
                            className="flex items-center text-blue-100 gap-x-2"
                            onClick={() => dispatch(sendotp(signupData.email, navigate))}
                        >
                            <RxCountdownTimer/>
                            Resend it
                        </button>


                    </div>

                </div>
            )
        }
    </div>
  )
}

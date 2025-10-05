import React from 'react'
import { ContactForm } from '../components/ContactPage/ContactForm'
import { ContactDetails } from '../components/ContactPage/ContactDetails'
import { Footer } from '../components/common/Footer'

export const Contact = () => {
  return (
    <div className='mt-10'>
        <div className='flex flex-col w-11/12 mx-auto justify-between'>
            <div className='flex flex-col md:flex-row gap-5 justify-between mx-auto'>

                {/* Left */}
                <div className='flex flex-col border border-red rounded-md justify-center items-around gap-5 my-5 px-10 text-richblack-25'>
                    <ContactDetails/>
                </div>

                {/* Right */}
                <div>
                    <ContactForm/>
                </div>

            </div>

            {/* ReviewSlider */}
            <div className='mt-20'>
                <h1 className='text-white'>Reviews from other learners</h1>
                {/* <ReviewSlider/> */}
            </div>

            {/* Footer */}
            <div>
                <Footer/>
            </div>
        </div>
    </div>

  )
}

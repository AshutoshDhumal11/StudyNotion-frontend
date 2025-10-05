import React, { useEffect, useState } from 'react'

import { categoriesEndpoints } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponantData';
import { apiConnector } from '../services/apiConnector';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Footer } from "../components/common/Footer"
import { CourseCard } from '../components/core/Catalog/CourseCard';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { Error } from './Error';

export const Catalog = () => {

    const { loading } = useSelector( (state) => state.profile)
    const { catalogName } = useParams()
    const [ catalogPageData, setCatalogPageData ] = useState(null);
    const [ categoryId, setCategoryId ] = useState("");
    const [ active, setActive ] = useState(1);

    // function for fetching all categories
    useEffect( () => {
        ;(async () => {
            try {
                const result = await apiConnector('GET', categoriesEndpoints.CATEGORIES_API)
                const category_Id = result?.data?.data?.find( 
                    (category) => category.name.split(" ").join("-").toLowerCase() === catalogName
                )?._id;

                if(!category_Id) {
                    throw new Error("Category not found");
                }

                setCategoryId(category_Id);
            } catch(error) {
                console.log("Could not fetch Categories", error);
            }
        }) ()
    }, [catalogName])

    // function for getting catalog page data
    useEffect( () => {
        if(categoryId) {
            ;(async() => {
                try {
                    const result = await getCatalogPageData(categoryId)
                    if(result) {
                        setCatalogPageData(result)
                    }
                } catch(error) {
                    console.log("Error in fetchig catalog data", error)
                }
            }) ()
        }
    }, [categoryId])

    if( loading || !catalogPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className='spinner'></div>
            </div>
        )
    }

    if( !loading && !catalogPageData.success) {
        return <Error/>
    }

    return (
        <>
            {/* Hero Section */}
            <div className='box-content bg-richblack-800 px-4'>
                <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                    <p className='text-sm text-richblack-300'>
                        {`Home / Catalog / `}
                        <span className='text-yellow-25'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>

                    <p className='text-3xl text-richblack-5'>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>

                    <p className='max-w-[870px] text-richblack-200'>
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className='section_heading'>
                    Courses to get you started
                </div>

                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <span
                        className = {`px-4 py-2 ${active === 1
                                                ? "border-b border-b-yellow-25 text-yellow-25"
                                                : "text-richblack-50"}
                                    cursor-pointer`}  
                        onClick={ () => setActive(1)} 
                    >
                        Most popular
                    </span>

                    <span
                        className = {`px-4 py-2 ${active === 2
                                                ? "border-b border-b-yellow-25 text-yellow-25"
                                                : "text-richblack-50"}
                                    cursor-pointer`}
                        onClick={ () => setActive(2)}  
                    >
                        New
                    </span>
                </div>

                <div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* Section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className='section_heading'>
                    Top courses in {catalogPageData?.data?.differentCategoryDetails?.name}
                </div>

                <div className='py-8'>
                    <CourseSlider courses={catalogPageData?.data?.differentCategoryDetails?.courses}/>
                </div>
            </div>

            {/* Section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className='section_heading'>
                    Frequently Bought Together
                </div>

                <div className='py-8'>
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                        {
                            catalogPageData?.data?.mostSellingCourses
                            .slice(0, 4)
                            .map( (course, index) => {
                                return (
                                    <CourseCard course={course} key={index} Height={"h-[371px]"}></CourseCard>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* Section 4 */}
            <Footer/>
        </>
    )
}

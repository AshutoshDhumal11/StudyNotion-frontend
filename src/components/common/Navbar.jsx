import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, NavLink} from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsCart3 } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { ProfileDropDown } from "../core/Auth/ProfileDropDown";
import { apiConnector } from '../../services/apiConnector'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { categoriesEndpoints } from '../../services/apis'


export const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categoriesEndpoints.CATEGORIES_API);
            console.log("Printing subLinks result: ", result)
            setSubLinks(result.data.data);

        } catch(error) {
            console.log("Could not fetch the category list")
        }
        setLoading(false);
    }

    useEffect( () => {
        fetchSubLinks();
    }, [])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    return (
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
            <div className='flex w-11/12 max-w-maxContent justify-between items-center'>

                <Link to={"/"}>
                    <img src={Logo} width={160} height={32} loading='lazy'></img>
                </Link>

                {/* // Navlinks */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map( (link, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? 
                                            (
                                                <div className={`group relative flex items-center select-none cursor-pointer gap-1 ${matchRoute("catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    <p>{link.title}</p>
                                                    <BsChevronDown></BsChevronDown>

                                                    <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[3em] top-[50%] z-[1000] flex flex-col rounded-lg bg-richblack-5 p-4
                                                    text-richblack-900 opacity-0  transition-all duration-200 group-hover:visible
                                                    group-hover:opacity-100 group-hover:translate-y-[1.65em] w-[200px] lg:w-[300px]'>
                                                        <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] -z-10 h-6 w-6 rotate-45 rounded select-none bg-richblack-5'>
                                                        </div>
                                                        {
                                                            loading ? (
                                                                <p className='text-center'>Loading...</p>
                                                            ) : subLinks.length ? (
                                                                subLinks?.filter((subLink) => subLink?.courses?.length > 0)
                                                                ?.map( (subLink, index) => {
                                                                    return (
                                                                        <Link 
                                                                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                                            className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                                                            key={index}
                                                                        >
                                                                            <p>{subLink.name}</p>
                                                                        </Link>
                                                                    )
                                                                })
                                                            ) : (
                                                                <p className='text-center select-none'>No Courses Found</p>
                                                            )         
                                                        }
                                                    </div> 

                                                </div>
                                            ) : 
                                            (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                                                </Link>
                                                // alternate way we can use NavLink or we can use 
                                                // location.pathname.includes(`${link?.path})
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav> 
                
                {/* Login and Signup */}
                <div className='hidden md:flex gap-x-4 items-center'>
                    {
                        user && user.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to={"/dashboard/cart"} className="relative">
                                <BsCart3 className='text-2xl text-richblack-100'></BsCart3>
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-xs font-bold text-yellow-100'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className='border border-richblack-700 bg-richblack-800 py-[8px] px-[12px] text-richblack-100 rounded-[8px]'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className='border border-richblack-700 bg-richblack-800 py-[8px] px-[12px] text-richblack-100 rounded-[8px]'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (<ProfileDropDown></ProfileDropDown>)
                    } 
                </div>
                <button className='mr-4 md:hidden'>
                    <AiOutlineMenu fontSize={24} fill='#AFB2BF'></AiOutlineMenu>
                </button>

            </div>
        </div>
    )
}

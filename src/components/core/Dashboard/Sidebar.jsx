import React from "react";

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from "react-redux";
import { SidebarLink } from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import { CgLayoutGrid } from "react-icons/cg";

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector( (state) => state.profile);
    const {loading: authLoading} = useSelector( (state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ConfirmationModalData, setConfirmationModalData] = useState(null)

    if(profileLoading || authLoading) {
        return (
            <div className="spinner"></div>
        )
    }

    return (
        <div>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                
                <div className="flex flex-col">
                    {
                        sidebarLinks.map( (link) => {
                                if(link.type && user?.accountType !== link.type) {
                                    return null;
                                }
                                else {
                                    return (
                                        <SidebarLink key={link.id} link={link} iconName={link.icon}></SidebarLink>
                                    )
                                }    
                        })
                    }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700">
                </div>

                <div className="flex flex-col">
                    <SidebarLink
                        link={{name: "Settings", path: "dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />
                    <button
                        onClick={ () => setConfirmationModalData({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of you Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancle",
                            btn1Handler: () => {
                                dispatch(logout(navigate));
                                setConfirmationModalData(null);
                                console.log("Logout triggered.");
                            },
                            btn2Handler: () => {
                                setConfirmationModalData(null);
                                console.log("Cancle triggered.");
                            }})}
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg"/>
                            <span>Logout</span>
                        </div>

                    </button>
                </div>

            </div>
            {
                ConfirmationModalData && <ConfirmationModal modalData={ConfirmationModalData}/>
            }
        </div>
    )
}

export default Sidebar;

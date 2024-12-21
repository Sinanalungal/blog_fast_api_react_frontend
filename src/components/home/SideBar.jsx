import React, { useContext, useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Sideutils.jsx"
import {
    IconFilePencil,
    IconLogout2,
    IconLogs,
    IconRss,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../utils/lib/utils";
import ConfirmationModal from './LogoutModal';
import { toast } from "react-toastify";
import { logout } from "../../services/api/logout.js";
import { UserContext } from "./userContextProvider.jsx";

export function SidebarDemo({ children }) {
    const [data, setData] = useState({
        profileImage: 'https://assets.aceternity.com/default-avatar.png',
        username: 'Default Username',
        email: 'default@example.com',
    });
    const [open, setOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const{fetchUser,user}= useContext(UserContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosInstance.get('user-profile/');

    //             const fetchedData = {
    //                 profileImage: response.data.profile_picture || 'https://assets.aceternity.com/default-avatar.png',
    //                 username: response.data.username || 'Default Username',
    //                 email: response.data.email || 'default@example.com',
    //             };

    //             setData(fetchedData);
    //         } catch (error) {
    //             console.log(error);
    //             setData({
    //                 profileImage: 'https://assets.aceternity.com/default-avatar.png',
    //                 username: 'Default Username',
    //                 email: 'default@example.com',
    //             });
    //         }
    //     };
    //     fetchData();
    // }, []);

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const confirmLogout = async() => {
        try {
            const response = await logout()
            const userlogout = await fetchUser()
            setModalOpen(false);
            toast.success("User logged out successfully");
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("An error occurred while logging out. Please try again.");
        }
    };

    const links = [
        {
            label: "Blogs",
            href: "/home",
            icon: (
                <IconRss className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "My Blogs",
            href: "/home/my-blogs",
            icon: (
                <IconLogs className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "Create Post",
            href: "/home/create-post",
            icon: (
                <IconFilePencil className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "/home/profile",
            icon: (
                <IconUserBolt className="text-neutral-700 h-7 w-7 flex-shrink-0" />
            ),
        },

    ];

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
                "h-screen"
            )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                            <div
                                onClick={handleLogoutClick}
                                className={cn("flex items-center justify-start gap-2  group/sidebar py-2")}
                            >
                                <IconLogout2 className="text-neutral-700 h-7 w-7 flex-shrink-0" />
                                <motion.span
                                    animate={{
                                        display: (open ? "inline-block" : "none"),
                                        opacity: (open ? 1 : 0)
                                    }}
                                    className="text-neutral-700  text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
                                    Logout
                                </motion.span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: data.username,
                                href: "#",
                                icon: (
                                    <img
                                        src={data.profileImage}
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }} />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 overflow-y-scroll scrollbar-hide">
                <div
                    className="p-2 md:p-10 overflow-y-auto scrollbar-hide max-h-screen rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full"> {/* Added max-h-screen */}
                    {children}

                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </div>
    );
}

export const Logo = () => {
    return (
        <Link

            className="font-normal gap-2 flex ">
            <img className="h-7 w-7" src="https://w7.pngwing.com/pngs/292/43/png-transparent-blogger-logo-computer-icons-encapsulated-postscript-logotypes-cdr-text-logo.png" alt="" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl text-black whitespace-pre">
                Blog Application
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            to="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
            <img className="h-7 w-7" src="https://w7.pngwing.com/pngs/292/43/png-transparent-blogger-logo-computer-icons-encapsulated-postscript-logotypes-cdr-text-logo.png" alt="" />
        </Link>
    );
};

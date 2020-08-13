import React from 'react'
import { motion, AnimationControls } from 'framer-motion'
import { IconType } from 'react-icons/lib'
import { AiOutlineClose, AiOutlineThunderbolt, AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { BsCardList, BsDisplay } from 'react-icons/bs'
import { RiChatSmile3Line, RiBarChartLine } from 'react-icons/ri'
import { FiBookmark, FiSettings, FiLogOut } from 'react-icons/fi'
import { MdOpenInNew, MdDataUsage } from 'react-icons/md'

interface Props {
    pageDrawer: AnimationControls;
    closeDrawer: () => Promise<void>;
    DEFAULT_TRANSION: {
        duration: number;
        ease: number[];
    };
}

const ListItem = ({ Icon, title }: { Icon: IconType, title: string }) => {
    return (<div className="w-full h-10 flex flex-row  justify-start items-center">
        <div className="text-sm text-gray-600  mx-4 "><Icon /></div>
        <div className="text-sm capitalize text-white "><p className="" >{title}</p></div>
    </div>)
}

const Drawer = ({ pageDrawer, closeDrawer, DEFAULT_TRANSION }: Props) => {



    return (
        <motion.div
            style={{ width: "100%", height: "100%" }}
            // style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
            animate={pageDrawer}
            className=" flex flex-row mx-auto justify-start  absolute z-50 left transform -translate-x-full bg-opacity-25 bg-white">
            <motion.div
                transition={DEFAULT_TRANSION}
                className=" bg-gray-900 h-full  w-3/4 left-0 "
            >
                {/* drawer screen */}

                {/* drawer head */}
                <div className="h-full overflow-y-auto">
                    <div className=" h-12 flex flex-row justify-between items-center border-b border-gray-700 bg-gray-900 w-3/4 fixed" >
                        <div className="flex-1 text-left"> <span className="text-base font-bold mx-4 text-white">Account info</span></div>
                        <motion.div onTap={closeDrawer} className=" grid items-center   mx-4 overflow-hidden"><AiOutlineClose className="text-xl font-bold text-red-600" /></motion.div>
                    </div>

                    <div className="w-full h-12" />

                    {/* drawer user accounts */}
                    <div className="w-full h-12 flex flex-row justify-between items-center">
                        <motion.div onTap={console.log} className="rounded-full w-8 h-8  mx-4 overflow-hidden "><img src={'/me_icon.jpg'} width={"100%"} height={"100%"} alt={"user icon"} /></motion.div>
                        <motion.div onTap={console.log} className=" grid items-center   mx-4 "><IoIosAddCircleOutline className="text-xl font-bold text-red-600" /></motion.div>
                    </div>

                    {/* drawer user name */}
                    <div className="w-full h-12 flex flex-col  justify-start ">
                        <div className="  text-sm text-white  mx-4 "><strong >apostrophe + Non</strong></div>
                        <div className=" mx-4 text-xs text-gray-600 "><p className=""  >@Round_AB</p></div>
                    </div>

                    {/* drawer user flower */}
                    <div className="flex flex-row justify-start text-xs font-medium mt-1 mb-4">
                        <div className="ml-4  text-white"><span>53</span> <span className="text-gray-600">Following</span></div>
                        <div><span className="ml-4  text-white">24</span> <span className=" text-gray-600">Follower</span></div>
                    </div>

                    {/* drawer list */}
                    <ListItem Icon={FaRegUser} title={"profile"} />
                    <ListItem Icon={BsCardList} title={"list"} />
                    <ListItem Icon={RiChatSmile3Line} title={"topic"} />
                    <ListItem Icon={FiBookmark} title={"bookmarks"} />
                    <ListItem Icon={AiOutlineThunderbolt} title={"moments"} />
                    <div className="w-full h-px bg-gray-800 " />
                    <ListItem Icon={MdOpenInNew} title={"Twitter Ads"} />
                    <ListItem Icon={RiBarChartLine} title={"analytics"} />
                    <div className="w-full h-px bg-gray-800 " />
                    <ListItem Icon={FiSettings} title={"setting and privacy"} />
                    <ListItem Icon={AiOutlineQuestionCircle} title={"help center"} />
                    <div className="w-full h-px bg-gray-800 " />
                    <ListItem Icon={MdDataUsage} title={"data saver"} />
                    <ListItem Icon={BsDisplay} title={"display"} />
                    <div className="w-full h-px bg-gray-800 " />
                    <ListItem Icon={FiLogOut} title={"logout"} />
                    <div className="h-24 w-full" ></div>
                </div>

                {/* end drawer screen */}
            </motion.div>
            <motion.div className="h-full w-1/4" onTap={closeDrawer} />
        </motion.div>
    )
}

export default Drawer

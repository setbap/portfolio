import React from 'react'
import { FaRegUser, FaDove } from 'react-icons/fa'
import { BsCardList, BsDisplay } from 'react-icons/bs'
import { RiChatSmile3Line, RiBarChartLine } from 'react-icons/ri'
import { FiBookmark, FiSettings, FiLogOut } from 'react-icons/fi'
import { AiOutlineThunderbolt, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOpenInNew, MdDataUsage } from 'react-icons/md'
import { IconType } from 'react-icons/lib'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

interface Props {
    HEADER_ITEMS: { icon: IconType, path: string, title: string }[];
}

const BigListItem = ({ Icon, title, path, pathname }: { Icon: IconType, title: string, path: string, pathname: string }) => {
    return (
        <Link to={path}>
            <motion.div
                style={{ color: path === pathname ? "orange" : "white" }}
                whileHover={{ backgroundColor: "rgba(250,90,20,0.3)", borderColor: "rgba(220,70,10,0.7)" }}
                className={`h-10 mb-1 pr-2  rounded-full   flex flex-row md:px-4  text-center  border-transparent border-2   text-base lg:justify-start justify-end  items-center`}>
                {path === pathname && <motion.div
                    className="-ml-1  h-6 w-1 outline"
                    layoutId="outline"
                    initial={false}

                    animate={{ backgroundColor: "orange" }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 55
                    }}
                />}
                <div className={`  lg:mx-4 mx-auto  lg:text-lg  `}><Icon /></div>
                <div className={` capitalize   hidden lg:inline `}><p className="" >{title}</p></div>
            </motion.div></Link>)
}

const DesktopDrawer = ({ HEADER_ITEMS }: Props) => {
    const { pathname } = useLocation();

    return (
        <div style={{ width: 'calc( 50% - 21rem )' }} className="absolute my-12  left-0">

            <div style={{ maxWidth: '12rem' }} className="  text-center rounded-lg hidden  mx-auto lg:mr-0  md:flex flex-col">
                <AnimateSharedLayout>
                    {HEADER_ITEMS.map((val, index) => <BigListItem path={val.path} Icon={val.icon} key={index} title={val.title} pathname={pathname} />)}
                </AnimateSharedLayout>
            </div>
        </div>
    )
}

export default DesktopDrawer

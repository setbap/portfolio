import React from 'react'
import { FaRegUser, FaDove } from 'react-icons/fa'
import { BsCardList, BsDisplay } from 'react-icons/bs'
import { RiChatSmile3Line, RiBarChartLine } from 'react-icons/ri'
import { FiBookmark, FiSettings, FiLogOut } from 'react-icons/fi'
import { AiOutlineThunderbolt, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOpenInNew, MdDataUsage } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

interface Props {

}

const BigListItem = ({ Icon, title }: { Icon: IconType, title: string }) => {
    return (<div className="h-10 flex flex-row md:mx-3 text-white text-center   text-base lg:justify-start justify-end  items-center">
        <div className="   lg:mx-4 mx-px  lg:text-lg  "><Icon /></div>
        <div className=" capitalize text-white  hidden lg:inline "><p className="" >{title}</p></div>
    </div>)
}

const DesktopDrawer = (props: Props) => {
    return (
        <div style={{ width: 'calc( 50% - 21rem )' }} className="absolute my-12  left-0">

            <div style={{ maxWidth: '12rem' }} className=" mr-2  text-center rounded-lg hidden  mx-auto  md:flex flex-col">
                <BigListItem Icon={FaRegUser} title={"profile"} />
                <BigListItem Icon={BsCardList} title={"list"} />
                <BigListItem Icon={RiChatSmile3Line} title={"topic"} />
                <BigListItem Icon={FiBookmark} title={"bookmarks"} />
                <BigListItem Icon={AiOutlineThunderbolt} title={"moments"} />
                <div className="hidden lg:block  h-px bg-gray-800 " />
                <BigListItem Icon={MdOpenInNew} title={"Twitter Ads"} />
                <BigListItem Icon={RiBarChartLine} title={"analytics"} />
                <div className="hidden lg:block w-full h-px bg-gray-800 " />
                <BigListItem Icon={AiOutlineQuestionCircle} title={"help center"} />
                <div className="hidden lg:block w-full h-px bg-gray-800 " />
                <BigListItem Icon={MdDataUsage} title={"data saver"} />
                <BigListItem Icon={BsDisplay} title={"display"} />
                <div className="hidden lg:block w-full h-px bg-gray-800 " />
                <BigListItem Icon={FiLogOut} title={"logout"} />
            </div>
        </div>
    )
}

export default DesktopDrawer

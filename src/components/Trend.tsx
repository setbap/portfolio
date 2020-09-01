import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { BsCardList, BsDisplay } from 'react-icons/bs'
import { RiChatSmile3Line, RiBarChartLine } from 'react-icons/ri'
import { FiBookmark, FiLogOut } from 'react-icons/fi'
import { AiOutlineThunderbolt, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOpenInNew, MdDataUsage } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

interface Props {

}

const BigListItem = ({ Icon, title }: { Icon: IconType, title: string }) => {
    return (<div className="h-10 flex flex-row md:mx-3 text-white  text-lg justify-start items-center">
        <div className="   lg:mx-4 mx-px  lg:text-lg  "><Icon /></div>
        <div className=" capitalize text-white  hidden lg:inline "><p className="" >{title}</p></div>
    </div>)
}

const Trend = (props: Props) => {
    return (
        <div className="max-w-md top-3 right-back-shift-small rounded-lg hidden absolute md:flex flex-col">
            <BigListItem Icon={FaRegUser} title={"profile"} />
            <BigListItem Icon={BsCardList} title={"list"} />
            <BigListItem Icon={RiChatSmile3Line} title={"topic"} />
            <BigListItem Icon={FiBookmark} title={"bookmarks"} />
            <BigListItem Icon={AiOutlineThunderbolt} title={"moments"} />
            <div className="w-full h-px bg-gray-800 " />
            <BigListItem Icon={MdOpenInNew} title={"Twitter Ads"} />
            <BigListItem Icon={RiBarChartLine} title={"analytics"} />
            <div className="w-full h-px bg-gray-800 " />
            <BigListItem Icon={AiOutlineQuestionCircle} title={"help center"} />
            <div className="w-full h-px bg-gray-800 " />
            <BigListItem Icon={MdDataUsage} title={"data saver"} />
            <BigListItem Icon={BsDisplay} title={"display"} />
            <div className="w-full h-px bg-gray-800 " />
            <BigListItem Icon={FiLogOut} title={"logout"} />
        </div>
    )
}

export default Trend

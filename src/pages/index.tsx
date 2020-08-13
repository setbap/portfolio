import React, { useReducer } from 'react'
import { motion, useMotionValue, useAnimation, PanInfo, Transition, AnimatePresence, } from 'framer-motion'
import { AiOutlineSetting, AiOutlineClose, AiOutlineThunderbolt, AiOutlineQuestionCircle } from 'react-icons/ai'
import { BsArrowLeftRight, BsCardList, BsDisplay } from 'react-icons/bs'
import { FcAdvertising } from 'react-icons/fc'
import { FaRegUser } from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { FiBookmark, FiLogOut, FiSettings, FiHome, FiBell, FiMail } from 'react-icons/fi'
import { RiChatSmile3Line, RiBarChartLine, RiSearchLine } from 'react-icons/ri'
import { MdOpenInNew, MdDataUsage } from 'react-icons/md'
import Tweet from '../components/Tweet'
import Header from '../components/Header'
import Drawer from '../components/Drawer'
import ImageModal from '../components/ImageModal'
import BottomSheet from '../components/BottomSheet'
import BottomNavigation from '../components/BottomNavigation'
interface Props {
    PAGE_WIDTH?: number;
    PAGE_HEIGHT?: number;
    dispatch: (value: {
        type: "hide" | "show";
        payload: string;
    }) => void

}
const tweet_text = `: Did you know that while holding ⇧, you can scrub left or right on an input label to increase or decrease the value based on your Big Nudge setting?`


const container = {
    hidden: { opacity: 0.5 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}


const Index = ({ dispatch }: Props) => {

    return (
        <div className="max-w-2xl h-full flex justify-start  pb-24 bg-gray-600 mx-auto border-r-2 border-l-2 border-gray-800">
            <motion.div variants={container} initial="hidden" animate="show" key={0} className="flex-1  top-0 flex flex-col overflow-y-scroll  justify-start items-start">
                <Tweet tweet_date="today" tweet_text={tweet_text} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
                <Tweet tweet_date="today" tweet_text={tweet_text} isReteet retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
                <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
                <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
            </motion.div>
        </div>

    )
}

export default Index

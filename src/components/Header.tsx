import React from 'react'
import { motion } from 'framer-motion'
import { AiTwotoneFire } from 'react-icons/ai'

interface Props {
    openDrawer: () => Promise<void>;
    openBottomSheet: () => Promise<void>;
}

const Header = ({ openBottomSheet, openDrawer }: Props) => {
    return (
        <div>

            <header className="max-w-2xl mx-auto h-12 flex flex-row justify-between items-center bg-gray-900 border-2 border-t-0 border-gray-700">
                <motion.div onTap={openDrawer} className="rounded-full w-8 h-8 mr-6 ml-4 overflow-hidden"><img src={'/me_icon.jpg'} width={"100%"} height={"100%"} alt={"user icon"} /></motion.div>
                <div className="flex-1 text-left"> <span className="text-lg text-white">Lastest Tweets</span></div>
                <motion.div onTap={openBottomSheet} className="rounded-full w-8 h-8   mx-4 overflow-hidden"><AiTwotoneFire className="w-8 h-8 text-red-600" /></motion.div>
            </header>
        </div>
    )
}

export default Header

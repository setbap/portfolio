import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHistory, useLocation } from 'react-router-dom';
import { AiTwotoneFire } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs';

interface Props {
    openDrawer: () => Promise<void>;
    openBottomSheet: () => Promise<void>;
}

const Header = ({ openBottomSheet, openDrawer }: Props) => {
    const { pathname } = useLocation();
    const { goBack } = useHistory()

    useEffect(() => {

        console.log(pathname)
        return () => {

        }
    }, [pathname])
    return (
        <div>

            <header className="max-w-3xl md:max-w-2xl  mx-auto h-12 flex flex-row justify-between items-center bg-gray-900 border-2 border-t-0 border-gray-700">

                {
                    pathname === "/" ?
                        (
                            <motion.div onTap={openDrawer} className="rounded-full w-8 h-8 mr-6 ml-4 overflow-hidden">
                                <img src={'/me_icon.jpg'} width={"100%"} height={"100%"} alt={"user icon"} />
                            </motion.div>
                        )
                        :
                        (
                            <motion.div onTap={goBack} className="rounded-full text-white flex justify-center items-center w-8 h-8 mr-6 ml-4 overflow-hidden">
                                <BsArrowLeft className="text-2xl" />

                            </motion.div>
                        )
                }

                <div className="flex-1 text-left"> <span className="text-lg text-white">Lastest Tweets</span></div>
                <motion.div onTap={openBottomSheet} className="rounded-full w-8 h-8   mx-4 overflow-hidden"><AiTwotoneFire className="w-8 h-8 text-red-600" /></motion.div>
            </header>
        </div>
    )
}

export default Header

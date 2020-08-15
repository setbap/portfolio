import React from 'react'
import { IconType } from 'react-icons/lib'
import { motion, MotionValue, AnimationControls } from 'framer-motion';

interface Props {
    HEADER_ITEMS: IconType[];
    PAGE_COUNT: number;
    DEFAULT_TRANSION: {
        duration: number;
        ease: number[];
    };
    page_underline: AnimationControls;
    page: MotionValue<number>;
    changePage: (page_number: number) => Promise<void>;


}

const BottomNavigation = ({ HEADER_ITEMS, PAGE_COUNT, DEFAULT_TRANSION, changePage, page, page_underline }: Props) => {
    const Item = ({ Text, page_number }: { Text: IconType; page_number: number }) => (
        <motion.div
            whileHover={{ color: "orange", backgroundColor: "rgba(250,100,30,0.2)" }}
            onClick={() => { page.set(page_number); changePage(page.get()) }}
            className="flex-1 bg-gray-900 cursor-pointer flex justify-center items-center">
            <motion.span style={{ color: page_number === page.get() ? "orange" : "white" }}><Text /></motion.span>
        </motion.div>
    )
    return (
        <nav className="w-full h-12 md:hidden  block  absolute bottom-0  bg-transparent">
            <div className="flex h-12 flex-row justify-center border-t-2 border-gray-700 relative mx-auto items-stretch max-w-3xl md:max-w-2xl ">

                {/* items builder */}
                {HEADER_ITEMS.map((val, index) => <Item Text={val} key={index} page_number={index} />)}
                {/* bottom bar */}
                <motion.div animate={page_underline} style={{ width: `100/${PAGE_COUNT}` }} transition={DEFAULT_TRANSION} className="absolute bottom-0 left-0 rounded-full mb-1  h-1 bg-red-600"> </motion.div>
            </div>
        </nav>
    )
}

export default BottomNavigation

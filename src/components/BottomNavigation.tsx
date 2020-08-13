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
        <nav className="w-full h-12 flex flex-row items-stretch absolute bottom-0 border-t-2 border-gray-700 bg-gray-900">
            {/* items builder */}
            {HEADER_ITEMS.map((val, index) => <Item Text={val} key={index} page_number={index} />)}
            {/* bottom bar */}
            <motion.div animate={page_underline} style={{ width: `100/${PAGE_COUNT}` }} transition={DEFAULT_TRANSION} className="absolute bottom-0 left-0 rounded-full mb-1  h-1 bg-red-600"> </motion.div>
        </nav>
    )
}

export default BottomNavigation

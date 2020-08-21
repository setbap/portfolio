import React from 'react'
import { IconType } from 'react-icons/lib'
import { motion, MotionValue, AnimationControls, AnimateSharedLayout } from 'framer-motion';
import { useLocation, useHistory } from 'react-router-dom';

interface Props {
    HEADER_ITEMS: { icon: IconType, path: string, title: string }[];
    PAGE_COUNT: number;
    DEFAULT_TRANSION: {
        duration: number;
        ease: number[];
    };
    page_underline: AnimationControls;
    page: MotionValue<number>;
    changePage: (page_number: number) => Promise<void>;


}

const BottomNavigation = ({ HEADER_ITEMS, PAGE_COUNT, DEFAULT_TRANSION, page, page_underline }: Props) => {
    const { pathname } = useLocation();
    const history = useHistory()

    const Item = ({ Icon, path }: { Icon: IconType; path: string }) => (
        <motion.div
            whileHover={{ color: "orange", backgroundColor: "rgba(250,100,30,0.2)" }}
            onClick={() => { history.push(path) }}
            className="flex-1 bg-gray-900 cursor-pointer flex flex-col justify-center items-center">
            <motion.div style={{ color: path === pathname ? "orange" : "white", marginBottom: path === pathname ? "0.25 rem" : 0 }}><Icon /></motion.div>
            {path === pathname && <motion.div
                className="  h-1 mt-1 outline"
                layoutId="outline"
                initial={false}
                animate={{ backgroundColor: "orange", width: path === pathname ? "75%" : "0%" }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 55
                }}
            />}
        </motion.div>
    )
    return (
        <nav className="w-full h-12 md:hidden  block  absolute bottom-0  bg-transparent">
            <AnimateSharedLayout>
                <div className="flex h-12 flex-row justify-center border-t-2 border-gray-700 relative mx-auto items-stretch max-w-3xl md:max-w-2xl ">

                    {/* items builder */}
                    {HEADER_ITEMS.map((val, index) => <Item Icon={val.icon} key={index} path={val.path} />)}
                    {/* bottom bar */}
                    <motion.div animate={page_underline} style={{ width: `100/${PAGE_COUNT}` }} transition={DEFAULT_TRANSION} className="absolute bottom-0 left-0 rounded-full mb-1  h-1 bg-red-600"> </motion.div>
                </div>

            </AnimateSharedLayout>
        </nav>
    )
}

export default BottomNavigation

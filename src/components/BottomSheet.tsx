import React from 'react'
import { motion, AnimationControls, PanInfo } from 'framer-motion'
import { FcAdvertising } from 'react-icons/fc'
import { BsArrowLeftRight } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'

interface Props {
    handleBottomSheetDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): Promise<void>;
    closeBottomSheet: () => Promise<void>;
    pageBottomSheet: AnimationControls;
    DEFAULT_TRANSION: {
        duration: number;
        ease: number[];
    };
}

const BottomSheet = ({ closeBottomSheet, handleBottomSheetDragEnd, pageBottomSheet, DEFAULT_TRANSION }: Props) => {
    return (
        <motion.div
            animate={pageBottomSheet}
            style={{ width: "100%", height: "100%", transform: `translateX(${100}%)` }}
            className=" flex flex-col justify-start  absolute z-50  transform   bg-opacity-25 bg-white">
            <motion.div style={{ width: "100%", height: "100%" }} className="  flex-1" onTap={closeBottomSheet} />
            <motion.div
                drag="y"
                style={{
                    borderTopRightRadius: '2rem',
                    borderTopLeftRadius: '2rem',
                    width: "100%",
                }}
                onDragEnd={handleBottomSheetDragEnd}
                transition={DEFAULT_TRANSION}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                whileTap={{ cursor: "grabbing" }}
                dragConstraints={{
                    bottom: 0,
                    top: 0
                }}
                className="h-64 bottom-0 bg-gray-900 flex flex-col"
            >
                <div style={{ height: '7rem', width: "100%" }} className="flex flex-col   justify-center items-center  border-b-2 border-gray-800">
                    <FcAdvertising className="text-5xl p-2 " width={'24px'} height={'24px'} />
                    <p className="text-white text-center font-bold">Latest Tweets show up as they happen</p>
                </div>
                <div style={{ width: "100%" }} className="h-24 flex flex-col items-stretch justify-around">
                    <div className="flex flex-row px-2 items-center  justify-start text-white">
                        <div style={{ transform: "rotateY(180deg)" }} className=" origin-center"><BsArrowLeftRight className=" mx-2  block text-gray-500" /></div>
                        <div className="text-left">
                            <p className="text-gray-400 font-normal text-sm">Go back Home</p>
                            <p dir="rtl" className="text-gray-600 font-normal text-xs">You’ll see top Tweets first</p>
                        </div>
                    </div>
                    <div className="flex flex-row px-2  justify-start text-white">
                        <AiOutlineSetting className=" mx-2 text-gray-500" />
                        <p className="text-gray-400 font-normal text-xs">View content preferences</p>
                    </div>
                </div>
                <div style={{ width: "100%" }} className=" px-6 py-3 justify-center h-16 flex items-center flex-col">
                    <button onClick={closeBottomSheet} style={{ width: "100%", height: "3rem" }} className=" rounded-full text-center align-middle bg-gray-800 cursor-pointer font-bold flex justify-center items-center text-white ">
                        <span>cancel</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default BottomSheet

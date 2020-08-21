import React, { useEffect, useRef } from 'react'
import { motion, useViewportScroll, useElementScroll, useTransform } from 'framer-motion'

interface Props {
    dispatch: (value: { type: "hide" | "show"; payload: string }) => void;
}

const TimeLineItem = ({ title, desc, status, notShow }: { title: string, desc: string, status: "odd" | "even", notShow?: boolean }) => {
    return (<div className="w-full">
        <div className={`flex ${status === "odd" ? "flex-row" : "flex-row-reverse"} w-full  z-10`}>
            <div className="w-16 relative " >
                <div className="mx-auto h-full w-2 bg-gray-800" />
                <div style={{ left: "50%" }} className="top-0 -ml-2 mt-5 rounded-full  bg-orange-600 w-4 h-4 absolute" />
            </div>
            <div className={`flex-1 py-4   text-white ${status === "even" ? "text-right pl-8 pr-2" : " pr-8 pl-2"}`} >
                <div className="pb-3">{title} </div>
                <div className="pb-3"> {desc}</div>
            </div>
        </div>
        {
            !notShow &&
            <div style={{ width: "calc(100% - 3.44rem )" }}
                className={`h-2 bg-gray-800 mx-auto  ${status === "odd" ? "rounded-bl-full rounded-tr-full" : "rounded-br-full rounded-tl-full"}`} />
        }
    </div>);
}

const Me = ({ dispatch }: Props) => {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollY } = useElementScroll(ref)
    const transforemd = useTransform(scrollY, val => Math.max(0, Math.min(1, (126 - val) / 20)))
    const transforemdY = useTransform(scrollY, val => val / 2)
    const imageShowScale = useTransform(scrollY, val => Math.min(1, Math.max(0, (val - 96) / 100)))


    return (
        <div ref={ref} className="w-full  overflow-y-scroll  justify-start items-start">
            <motion.div style={{}} className="relative h-48 w-full ">
                <motion.div
                    style={{ scale: transforemd, translateY: transforemdY, left: '50%', translateX: "-50%", zIndex: 1000, top: "2rem" }}
                    className="h-24  absolute  w-24  rounded-full bg-green-500 transform  origin-top"
                >
                    <img src="/tweet_image.jpg" alt="my image" className=" rounded-full w-24 h-24  border-4 border-orange-600" />
                    <div className="text-white text-center mt-4">Sina Ebrahimi</div>
                    <div className="text-white text-center mt-2">@setbap</div>
                </motion.div>
            </motion.div>
            <motion.div style={{ scale: imageShowScale, opacity: imageShowScale, left: '50%', translateX: "-50%" }} className="absolute max-w-2xl sm:max-w-3xl md:max-w-2xl w-full top-0 bg-gray-800 py-2 transform origin-top flex flex-row z-10  h-20 mt-12">
                <motion.img src="/tweet_image.jpg" alt="my image" className=" rounded-full w-16 ml-8 h-16 transform  border-4 border-orange-600 z-50" />
                <div className="self-center">
                    <div className="ml-4 font-sans text-white tracking-wide">Sina Ebrahimi</div>
                    <div className="ml-4 font-mono text-sm  font-thin text-gray-300 tracking-wide">@Setbap</div>
                </div>
            </motion.div>
            <div className="h-12"></div>
            <motion.div className=" w-full px-8 text-white pt-4 tracking-wider leading-relaxed bg-gray-800 py-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis
                illo iste quis, eius impedit, consequuntur porro
                consequatur corrupti deserunt, soluta explicabo dolorum harum laboriosam asperiores deleniti
                modi magni nesciunt tempore vitae quaerat consectetur? Nulla
                ex totam repudiandae quidem optio pariatur recusandae numquam, atque
                labore fugit, necessitatibus, aliquid reprehenderit. Iusto consectetur quis,
                rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!</motion.div>

            <TimeLineItem title="title" status="odd" desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />
            <TimeLineItem title="title" status="even" desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />
            <TimeLineItem title="title" status="odd" desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />
            <TimeLineItem title="title" status="even" desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />
            <TimeLineItem title="title" status="odd" desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />
            <TimeLineItem title="title" status="even" desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />
            <TimeLineItem title="title" status="odd" notShow desc="rem esse facilis deleniti quo mollitia, laudantium unde sequi repellat obcaecati qui? Nemo amet perspiciatis, ratione labore doloribus suscipit enim!" />

            <motion.div className="h-48 w-full bg-gray-800 "></motion.div>
            <motion.div className="h-48 w-full "></motion.div>
            <motion.div className="h-48 w-full "></motion.div>
            <motion.div className="h-48 w-full "></motion.div>
            <motion.div className="h-48 w-full "></motion.div>
        </div>
    )
}

export default Me

import React, { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { FaDivide } from 'react-icons/fa'

interface Props {

}
const container = {
    hidden: { opacity: 0.5,translateY:20 },
    show: {
        opacity: 1,
        translateY:0,
        transition: {
            staggerChildren: 0.2,
            
        }
    }
}

const showLang = {
    hidden: { opacity: 0.5,scale:0.2 },
    show: {
        opacity: 1,
        scale:1,
        transition: {
            staggerChildren: 0.9,
            
        }
    }
}

const SkillBox = ({ title, precent }: { title: string, precent: number }) => {
    return (
        <motion.div className="p-4 re text-white w-full md:justify-around justify-start  md:items-center items-start flex  flex-col md:flex-row">
            <div className="capitalize">{title} </div>
            <div className="flex  my-3  w-9/12">
                <div className="w-6/12 sm:w-8/12  h-3 bg-gray-500 rounded-lg ">
                    <motion.div
                        transition={{ delay: 0.2, duration: 0.8, }}
                        initial={{ width: 40, backgroundColor: "#f00" }}
                        animate={{ width: precent + "%", backgroundColor: "#3f3" }}
                        className="h-full rounded-lg " />
                </div>
            </div>
        </motion.div>
    )
}

const ProgrammingBox = ({ title, frameworks }: { title: string, frameworks: string[] }) => {
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="px-4 pb-2 re text-white w-full md:justify-around justify-start  md:items-center items-start flex  flex-col md:flex-row">
            <div className="capitalize pr-3 font-bold ">{title}: </div>
            <div className="flex flex-row flex-wrap  my-3  w-9/12">
                <motion.div variants={{
    hiddenx: { opacity: 0.5,scale:0.2 },
    showx: {
        opacity: 1,
        scale:1,
        transition: {
            staggerChildren: 0.2,
        }
    }
}} initial="hiddenx" animate="showx" className=" flex flex-row flex-wrap w-7/12  sm:w-11/12 ">
    {frameworks.map((val,index) =>(<div className="border-2 rounded-full px-2 py-1 border-green-500 bg-green-700 mx-2 my-1" key={index}>{val}</div>)) }
                </motion.div>
            </div>
        </motion.div>
    )
}

const InfoBox = ({title}:{title:string}) => (
    <motion.div className="text-left  md:pl-10 pl-4 text-white text-lg mt-5 w-full  capitalize">
        {title}
    </motion.div>
)

function Skills({ }: Props): ReactElement {
    return (
        <motion.div style={{ width: "72rem" }} variants={container} initial="hidden" animate="show" key={0} className="flex-1   top-0 flex flex-col overflow-y-scroll  justify-start items-start">
            <InfoBox title={"English lengauge Skills"}/>
            <SkillBox title={"reading"} precent={50} />
            <SkillBox title={"writing"} precent={30} />
            <SkillBox title={"speaking"} precent={30} />
            <SkillBox title={"listening"} precent={60} />
            <div className=" h-px bg-gray-700 w-full"></div>
            <InfoBox title={"Programming lengauge  "}/>
            <ProgrammingBox title={"nodeJs "} frameworks={["express", "mongooes","typeorm"]} />
            <ProgrammingBox title={"js (+ TS ❤) "} frameworks={["react", "react-native","nextJS","redux","MATERIAL-UI","ant-d" ]} />
            <ProgrammingBox title={"css (!lang)"} frameworks={["tailwindcss", "bootstrap" ]} />

            <ProgrammingBox title={"dart "} frameworks={["flutter" ]} />
            <ProgrammingBox title={"python"} frameworks={["Django" ]} />

        </motion.div>
    );
}

export default Skills
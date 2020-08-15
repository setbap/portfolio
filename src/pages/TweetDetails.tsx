import React, { useReducer } from 'react'
import { motion, useMotionValue, useAnimation, PanInfo, Transition, AnimatePresence, } from 'framer-motion'
import { AiTwotoneFire, AiOutlineSetting, AiOutlineClose, AiOutlineThunderbolt, AiOutlineQuestionCircle } from 'react-icons/ai'
import { BsArrowLeftRight, BsCardList, BsDisplay } from 'react-icons/bs'
import { FcAdvertising } from 'react-icons/fc'
import { FaRegUser } from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { FiBookmark, FiLogOut, FiSettings, FiHome, FiBell, FiMail } from 'react-icons/fi'
import { RiChatSmile3Line, RiBarChartLine, RiSearchLine } from 'react-icons/ri'
import { MdOpenInNew, MdDataUsage } from 'react-icons/md'
import Tweet from '../components/Tweet'
interface Props {

}

const DEFAULT_TRANSION = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] }
const tweet_text = `: Did you know that while holding ⇧, you can scrub left or right on an input label to increase or decrease the value based on your Big Nudge setting?`
const initialState = { show: false, image: "" };
function showModalReducer(state: typeof initialState, action: { type: "show" | "hide", payload: string }) {
    switch (action.type) {
        case 'show':
            return { show: true, image: action.payload };
        case 'hide':
            return { show: false, image: "" };
        default:
            throw new Error();
    }
}
const container = {
    hidden: { opacity: 0.5 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}



const TweetDetails = (props: Props) => {
    // const value can use as get from props (not yet)
    const PAGES_ITEMS = [
        {
            body: (
                <motion.div variants={container} initial="hidden" animate="show" key={0} className="flex-1  top-0 flex flex-col overflow-y-scroll  justify-start items-start">
                    <Tweet tweet_date="today" tweet_text={tweet_text} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
                    <Tweet tweet_date="today" tweet_text={tweet_text} isReteet retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
                    <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
                    <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
                </motion.div>
            ),
            title: FiHome
        },
        {
            body: (
                <motion.div key={1} className="flex-1  h-full flex justify-center items-center">
                    <span >search</span>
                </motion.div>
            ), title: RiSearchLine
        },
        {
            body: (
                <motion.div key={2} className="flex-1  h-full flex justify-center items-center">
                    <span >notification</span>
                </motion.div>
            ), title: FiBell
        },
        {
            body: (
                <motion.div key={3} className="flex-1  h-full flex justify-center items-center">
                    <span >message</span>
                </motion.div>
            ), title: FiMail
        },
    ]
    const PAGE_WIDTH = 375;
    const PAGE_HEIGHT = 667;

    const OFFSET_TO_SNAP = 100
    const VELOCITY_TO_SNAP = 500
    const TRANSITION_DURATION = 0.4
    const TRANSITION_ITEM_WIDTH = PAGE_WIDTH
    const PAGE_COUNT = PAGES_ITEMS.length
    const SHOW_PAGE_LINE_WIDTH = PAGE_WIDTH / PAGE_COUNT;
    const PAGES_BODY = PAGES_ITEMS.map((val) => val.body)
    const HEADER_ITEMS = PAGES_ITEMS.map((val) => val.title)
    const TRANSITION_CONFIG: Transition = { duration: TRANSITION_DURATION, }


    // animation value
    const controls = useAnimation();
    const page_underline = useAnimation();
    const pageDrawer = useAnimation();
    const pageBottomSheet = useAnimation();
    const [modal, dispatch] = useReducer(showModalReducer, initialState);


    const page = useMotionValue(0)

    const changePage = async (page_number: number) => {
        controls.start({
            x: (-1) * TRANSITION_ITEM_WIDTH * page_number,
            transition: TRANSITION_CONFIG
        });
        await page_underline.start({
            x: SHOW_PAGE_LINE_WIDTH * page_number,
            transition: TRANSITION_CONFIG
        })
    }

    const openDrawer = async () => {
        await pageDrawer.start({
            x: "0",
            transition: TRANSITION_CONFIG
        })
    }

    const closeDrawer = async () => {
        await pageDrawer.start({
            x: "-100%",
            transition: TRANSITION_CONFIG
        })


    }

    const openBottomSheet = async () => {
        pageBottomSheet.start({
            y: "0",
            opacity: 1,
            transition: TRANSITION_CONFIG
        })
    }

    const closeBottomSheet = async () => {
        await pageBottomSheet.start({
            y: "100%",
            opacity: 0,
            transition: TRANSITION_CONFIG
        })
    }

    const Item = ({ Text, page_number }: { Text: IconType; page_number: number }) => (
        <motion.div
            whileHover={{ color: "orange", backgroundColor: "rgba(250,100,30,0.2)" }}
            onClick={() => { page.set(page_number); changePage(page.get()) }}
            className="flex-1 bg-gray-900 cursor-pointer flex justify-center items-center">
            <motion.span style={{ color: page_number === page.get() ? "orange" : "white" }}><Text /></motion.span>
        </motion.div>
    )

    async function handleBottomSheetDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const offset = info.offset.y;
        const velocity = info.velocity.y;
        if (offset > OFFSET_TO_SNAP / 2 || velocity > VELOCITY_TO_SNAP / 2) {
            await closeBottomSheet()
        } else {
            await openBottomSheet()
        }
    }

    const ListItem = ({ Icon, title }: { Icon: IconType, title: string }) => {
        return (<div className="w-full h-10 flex flex-row  justify-start items-center">
            <div className="text-sm text-gray-600  mx-4 "><Icon /></div>
            <div className="text-sm capitalize text-white "><p className="" >{title}</p></div>
        </div>)
    }

    return (
        <AnimatePresence>

            <motion.div style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }} className="relative bg-gray-200 mx-auto my-auto overflow-hidden  flex flex-col">
                <motion.div
                    animate={pageDrawer}
                    className="w-full h-full flex flex-row- justify-start  absolute z-50 left-0 transform -translate-x-full bg-opacity-25 bg-white">
                    <motion.div
                        // drag="x"
                        // onDragEnd={handleDrawerDragEnd}
                        transition={DEFAULT_TRANSION}
                        // dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                        // whileTap={{ cursor: "grabbing" }}
                        // dragConstraints={{
                        //     left: 0,
                        //     right: 0
                        // }}
                        className=" bg-gray-900 h-full  w-3/4 left-0 "
                    >
                        {/* drawer screen */}

                        {/* drawer head */}
                        <div className="h-full overflow-y-auto">
                            <div className=" h-12 flex flex-row justify-between items-center border-b border-gray-700 bg-gray-900 w-3/4 fixed" >
                                <div className="flex-1 text-left"> <span className="text-base font-bold mx-4 text-white">Account info</span></div>
                                <motion.div onTap={closeDrawer} className=" grid items-center   mx-4 overflow-hidden"><AiOutlineClose className="text-xl font-bold text-red-600" /></motion.div>
                            </div>

                            <div className="w-full h-12" />

                            {/* drawer user accounts */}
                            <div className="w-full h-12 flex flex-row justify-between items-center">
                                <motion.div onTap={console.log} className="rounded-full w-8 h-8  mx-4 overflow-hidden "><img src={'/me_icon.jpg'} width={"100%"} height={"100%"} alt={"user icon"} /></motion.div>
                                <motion.div onTap={console.log} className=" grid items-center   mx-4 "><IoIosAddCircleOutline className="text-xl font-bold text-red-600" /></motion.div>
                            </div>

                            {/* drawer user name */}
                            <div className="w-full h-12 flex flex-col  justify-start ">
                                <div className="  text-sm text-white  mx-4 "><strong >apostrophe + Non</strong></div>
                                <div className=" mx-4 text-xs text-gray-600 "><p className=""  >@Round_AB</p></div>
                            </div>

                            {/* drawer user flower */}
                            <div className="flex flex-row justify-start text-xs font-medium mt-1 mb-4">
                                <div className="ml-4  text-white"><span>53</span> <span className="text-gray-600">Following</span></div>
                                <div><span className="ml-4  text-white">24</span> <span className=" text-gray-600">Follower</span></div>
                            </div>

                            {/* drawer list */}
                            <ListItem Icon={FaRegUser} title={"profile"} />
                            <ListItem Icon={BsCardList} title={"list"} />
                            <ListItem Icon={RiChatSmile3Line} title={"topic"} />
                            <ListItem Icon={FiBookmark} title={"bookmarks"} />
                            <ListItem Icon={AiOutlineThunderbolt} title={"moments"} />
                            <div className="w-full h-px bg-gray-800 " />
                            <ListItem Icon={MdOpenInNew} title={"Twitter Ads"} />
                            <ListItem Icon={RiBarChartLine} title={"analytics"} />
                            <div className="w-full h-px bg-gray-800 " />
                            <ListItem Icon={FiSettings} title={"setting and privacy"} />
                            <ListItem Icon={AiOutlineQuestionCircle} title={"help center"} />
                            <div className="w-full h-px bg-gray-800 " />
                            <ListItem Icon={MdDataUsage} title={"data saver"} />
                            <ListItem Icon={BsDisplay} title={"display"} />
                            <div className="w-full h-px bg-gray-800 " />
                            <ListItem Icon={FiLogOut} title={"logout"} />
                            <div className="h-24 w-full" ></div>
                        </div>


                        {/* end drawer screen */}
                    </motion.div>
                    <motion.div className="h-full w-1/4" onTap={closeDrawer} />
                </motion.div>
                <motion.div
                    animate={pageBottomSheet}

                    className="w-full h-full flex flex-col justify-start  absolute z-50  transform translate-y-full  bg-opacity-25 bg-white">
                    <motion.div className="h-full w-full flex-1" onTap={closeBottomSheet} />
                    <motion.div
                        drag="y"
                        style={{
                            borderTopRightRadius: '2rem',
                            borderTopLeftRadius: '2rem'
                        }}
                        onDragEnd={handleBottomSheetDragEnd}
                        transition={DEFAULT_TRANSION}
                        dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                        whileTap={{ cursor: "grabbing" }}
                        dragConstraints={{
                            bottom: 0,
                            top: 0
                        }}
                        className="w-full h-64 bottom-0 bg-gray-900 flex flex-col"
                    >
                        <div style={{ height: '7rem' }} className="w-full flex flex-col justify-center items-center  border-b-2 border-gray-800">
                            <FcAdvertising className="text-5xl p-2 " width={'24px'} height={'24px'} />
                            <p className="text-white text-center font-bold">Latest Tweets show up as they happen</p>
                        </div>
                        <div className="w-full h-24 flex flex-col items-stretch justify-around">
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
                        <div className="w-full px-6 py-3 justify-center h-16 flex items-center flex-col">
                            <button onClick={closeBottomSheet} className=" w-full h-full rounded-full text-center align-middle bg-gray-800 cursor-pointer font-bold flex justify-center items-center text-white ">
                                <span>cancel</span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={modal.show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    style={{ pointerEvents: "auto" }}
                    onClick={() => dispatch({ type: "hide", payload: "" })}
                    layout className="w-full h-full flex flex-col justify-center items-center absolute z-50 transform scale-0  bg-opacity-25 bg-white">
                    <motion.div
                        className="w-full h-full mb-2 rounded-lg flex items-center  overflow-hidden">
                        <img src={modal.image} className="w-full h-48 object-cover" alt="" />
                    </motion.div>

                </motion.div>

                <header className="w-full h-12 flex flex-row justify-between items-center bg-gray-900 border-b border-gray-700">
                    <motion.div onTap={openDrawer} className="rounded-full w-8 h-8 mr-6 ml-4 overflow-hidden"><img src={'/me_icon.jpg'} width={"100%"} height={"100%"} alt={"user icon"} /></motion.div>
                    <div className="flex-1 text-left"> <span className="text-lg text-white">Lastest Tweets</span></div>
                    <motion.div onTap={openBottomSheet} className="rounded-full w-8 h-8   mx-4 overflow-hidden"><AiTwotoneFire className="w-8 h-8 text-red-600" /></motion.div>
                </header>
                <motion.div className="flex-1 overflow-hidden ">
                    <motion.div
                        animate={controls}
                        style={{ width: PAGE_WIDTH * PAGE_COUNT, resize: "vertical" }}
                        whileTap={{ cursor: "grabbing" }}

                        className="flex flex-row flex-1  h-full relative bg-gray-900">

                        {PAGES_BODY}

                    </motion.div>
                </motion.div>

                <nav className="w-full h-12 flex flex-row items-stretch relative border-t-2 border-gray-700 bg-gray-900">
                    {/* items builder */}
                    {HEADER_ITEMS.map((val, index) => <Item Text={val} key={index} page_number={index} />)}
                    {/* bottom bar */}
                    <motion.div animate={page_underline} style={{ width: SHOW_PAGE_LINE_WIDTH }} transition={DEFAULT_TRANSION} className="absolute bottom-0 left-0 rounded-full mb-1  h-1 bg-red-600"> </motion.div>
                </nav>

            </motion.div>

        </AnimatePresence>

    )
}

export default TweetDetails

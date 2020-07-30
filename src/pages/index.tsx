import React from 'react'
import { motion, useMotionValue, useAnimation, PanInfo, Transition, } from 'framer-motion'
import { AiTwotoneFire, AiOutlineSetting } from 'react-icons/ai'
import { BsArrowLeftRight } from 'react-icons/bs'
import { FcAdvertising } from 'react-icons/fc'
interface Props {

}
const DEFAULT_TRANSION = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] }



const Index = (props: Props) => {
    // const value can use as get from props (not yet)
    const PAGES_ITEMS = [
        {
            body: (
                <motion.div key={0} className="flex-1  h-full flex justify-center items-center">
                    <span >one</span>
                </motion.div>
            ), title: "one"
        },
        {
            body: (
                <motion.div key={1} className="flex-1  h-full flex justify-center items-center">
                    <span >two</span>
                </motion.div>
            ), title: "two"
        },
        {
            body: (
                <motion.div key={2} className="flex-1  h-full flex justify-center items-center">
                    <span >three</span>
                </motion.div>
            ), title: "three"
        },
        {
            body: (
                <motion.div key={3} className="flex-1  h-full flex justify-center items-center">
                    <span >four</span>
                </motion.div>
            ), title: "four"
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
    const page = useMotionValue(0)

    const changePage = async (page_number: number) => {
        controls.start({
            x: TRANSITION_ITEM_WIDTH * page_number,
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

    const Item = ({ text, page_number }: { text: string; page_number: number }) => (
        <motion.div
            whileHover={{ color: "rgb(250,250,250)", backgroundColor: "rgb(100,123,230)" }}
            onClick={() => { page.set(page_number); changePage(page.get()) }}
            className="flex-1 bg-gray-900 cursor-pointer flex text-gray-400 justify-center items-center">
            <span >{text}</span>
        </motion.div>
    )

    async function handleDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset > OFFSET_TO_SNAP || velocity > VELOCITY_TO_SNAP) {
            if (page.get() < PAGE_COUNT - 1) {
                page.set(page.get() + 1)
                await changePage(page.get())
            }
        } else if (offset < -1 * OFFSET_TO_SNAP || velocity < -1 * VELOCITY_TO_SNAP) {
            if (page.get() > 0) {
                page.set(page.get() - 1)
                await changePage(page.get())
            }
        } else {
            await changePage(page.get())
        }
    }

    async function handleDrawerDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset > OFFSET_TO_SNAP / 2 || velocity > VELOCITY_TO_SNAP / 2) {
            await openDrawer()
        } else {
            await closeDrawer()
        }
    }

    async function handleBottomSheetDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        const offset = info.offset.y;
        const velocity = info.velocity.y;
        if (offset > OFFSET_TO_SNAP / 2 || velocity > VELOCITY_TO_SNAP / 2) {
            await closeBottomSheet()
        } else {
            await openBottomSheet()
        }
    }




    return (
        <motion.div style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }} className="h-screen relative bg-gray-200 mx-auto my-auto overflow-hidden  flex flex-col">
            <motion.div
                animate={pageDrawer}
                className="w-full h-full flex flex-row-reverse justify-end  absolute z-50 left-0 transform -translate-x-full bg-opacity-50 bg-gray-900">
                <motion.div
                    drag="x"
                    onDragEnd={handleDrawerDragEnd}
                    transition={DEFAULT_TRANSION}
                    dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                    whileTap={{ cursor: "grabbing" }}
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    className=" bg-gray-100 h-full w-3/4 left-0"
                >
                </motion.div>
                <motion.div className="h-full w-1/4" onTap={closeDrawer} />
            </motion.div>
            <motion.div
                animate={pageBottomSheet}

                className="w-full h-full flex flex-col justify-end  absolute z-50  transform translate-y-0  bg-opacity-25 bg-white">
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
                        <div className="flex flex-row-reverse px-2 items-center  justify-start text-white">
                            <div style={{ transform: "rotateY(180deg)" }} className=" origin-center"><BsArrowLeftRight className=" mx-2  block text-gray-500" /></div>
                            <div className="text-left">
                                <p className="text-gray-400 font-normal text-sm">Go back Home</p>
                                <p dir="rtl" className="text-gray-600 font-normal text-xs">You’ll see top Tweets first</p>

                            </div>
                        </div>
                        <div className="flex flex-row-reverse px-2  justify-start text-white">
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
            <header className="w-full h-12 flex flex-row-reverse justify-between items-center bg-gray-900 border-b border-gray-700">
                <motion.div onTap={openDrawer} className="rounded-full w-8 h-8  mx-4 overflow-hidden"><img src={'/me_icon.jpg'} width={"100%"} height={"100%"} alt={"user icon"} /></motion.div>
                <div className="flex-1 text-left"> <span className="text-lg text-white">Lastest Tweets</span></div>
                <motion.div onTap={openBottomSheet} className="rounded-full w-8 h-8   mx-4 overflow-hidden"><AiTwotoneFire className="w-8 h-8 text-red-600" /></motion.div>
            </header>
            <motion.div className="flex-1 h-full overflow-hidden ">
                <motion.div
                    drag="x"
                    animate={controls}
                    onDragEnd={handleDragEnd}
                    style={{ width: PAGE_WIDTH * PAGE_COUNT }}
                    transition={DEFAULT_TRANSION}
                    dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                    whileTap={{ cursor: "grabbing" }}
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    className="flex flex-row  h-full relative bg-gray-900">

                    {PAGES_BODY}

                </motion.div>
            </motion.div>

            <nav className="w-full h-12 flex flex-row-reverse items-stretch relative border-t-2 border-gray-700 bg-gray-900">
                {/* items builder */}
                {HEADER_ITEMS.map((val, index) => <Item text={val} key={index} page_number={index} />)}
                {/* bottom bar */}
                <motion.div animate={page_underline} style={{ width: SHOW_PAGE_LINE_WIDTH }} transition={DEFAULT_TRANSION} className="absolute bottom-0 left-0 rounded-full mb-1  h-1 bg-red-600"> </motion.div>
            </nav>

        </motion.div>


    )
}

export default Index

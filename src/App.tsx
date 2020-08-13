import React, { useEffect, useState, useReducer } from 'react';
import Index from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AnimatePresence, motion, Transition, useAnimation, useMotionValue, PanInfo } from "framer-motion";
import TweetDetails from './pages/TweetDetails';
import useWindowSize from './hook/useWindows';
import Tweet from './components/Tweet';
import { FiHome, FiBell, FiMail } from 'react-icons/fi';
import { RiSearchLine } from 'react-icons/ri';
import Drawer from './components/Drawer';
import BottomSheet from './components/BottomSheet';
import ImageModal from './components/ImageModal';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';

const DEFAULT_TRANSION = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] }
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

function App() {
  const [tweetWidth, setTweetWidth] = useState(Math.max(375, window.Math.min(window.innerWidth, 766)))
  const windowSize = useWindowSize()

  const PAGES_ITEMS = [
    {
      // body: (
      //   <motion.div variants={container} initial="hidden" animate="show" key={0} className="flex-1  top-0 flex flex-col overflow-y-scroll  justify-start items-start">
      //     <Tweet tweet_date="today" tweet_text={tweet_text} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
      //     <Tweet tweet_date="today" tweet_text={tweet_text} isReteet retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
      //     <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
      //     <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
      //   </motion.div>
      // ),
      title: FiHome
    },
    {
      body: (
        <motion.div key={1} className="flex-1  h-full flex justify-center items-center">
          <span >search</span>
        </motion.div>
      ),
      title: RiSearchLine
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
  // const PAGE_WIDTH = 375;
  // const PAGE_HEIGHT = 667;
  // const PAGE_HEIGHT = null;

  const OFFSET_TO_SNAP = 100
  const VELOCITY_TO_SNAP = 500
  const TRANSITION_DURATION = 0.4
  const PAGE_COUNT = PAGES_ITEMS.length
  const PAGES_BODY = PAGES_ITEMS.map((val) => val.body)
  const HEADER_ITEMS = PAGES_ITEMS.map((val) => val.title)
  const TRANSITION_CONFIG: Transition = { duration: TRANSITION_DURATION }


  // animation value
  const controls = useAnimation();
  const page_underline = useAnimation();
  const pageDrawer = useAnimation();
  const pageBottomSheet = useAnimation();
  const [modal, dispatch] = useReducer(showModalReducer, initialState);


  const page = useMotionValue(0)

  const changePage = async (page_number: number) => {
    controls.start({
      x: (-1) * windowSize.width * page_number,
      transition: TRANSITION_CONFIG
    });
    await page_underline.start({
      x: windowSize.width / PAGE_COUNT * page_number,
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
      y: windowSize.height,
      opacity: 0,
      transition: TRANSITION_CONFIG
    })
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
    // <AnimatePresence exitBeforeEnter >
    <Router>
      <AnimatePresence>
        <motion.div style={{ width: "100%", height: "100vh" }} className="relative bg-gray-200 mx-auto my-auto overflow-hidden  flex flex-col">
          <Drawer closeDrawer={closeDrawer} pageDrawer={pageDrawer} DEFAULT_TRANSION={DEFAULT_TRANSION} />
          <BottomSheet handleBottomSheetDragEnd={handleBottomSheetDragEnd} closeBottomSheet={closeBottomSheet} pageBottomSheet={pageBottomSheet} DEFAULT_TRANSION={DEFAULT_TRANSION} />
          <ImageModal onClick={() => dispatch({ type: "hide", payload: "" })} modal={modal} />
          <Header openBottomSheet={openBottomSheet} openDrawer={openDrawer} />

          {/* <motion.div className="flex-1 overflow-hidden "> */}
          {/* <motion.div
                animate={controls}
                style={{ width: windowSize.width * PAGE_COUNT, resize: "vertical" }}
                whileTap={{ cursor: "grabbing" }}
                className="flex flex-row flex-1  h-full relative "
              > */}
          <Index dispatch={dispatch} />
          {/* {PAGES_BODY} */}
          {/* </motion.div> */}
          {/* </motion.div> */}
          <BottomNavigation
            PAGE_COUNT={PAGE_COUNT}
            changePage={changePage}
            HEADER_ITEMS={HEADER_ITEMS}
            DEFAULT_TRANSION={DEFAULT_TRANSION}
            page={page}
            page_underline={page_underline}
          />
        </motion.div>
      </AnimatePresence>
    </Router >
    // </AnimatePresence>

  );
}

export default App;

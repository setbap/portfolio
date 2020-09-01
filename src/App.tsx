import {
  AnimatePresence,
  motion,
  PanInfo, Transition,
  useAnimation,
  useMotionValue
} from "framer-motion";
import React, { useReducer } from "react";
import { FiBell, FiHome, FiMail } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './app.css';
import BottomNavigation from "./components/BottomNavigation";
import BottomSheet from "./components/BottomSheet";
import DesktopDrawer from "./components/DesktopDrawer";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import ImageModal from "./components/ImageModal";
import Trend from "./components/Trend";
import useWindowSize from "./hook/useWindows";
import Index from "./pages";
import ContactUs from "./pages/ContactUs";
import Details from "./pages/Details";
import Me from "./pages/Me";
import Skills from "./pages/Skills";


const DEFAULT_TRANSION = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] };
const initialState = { show: false, image: "" };
function showModalReducer(
  _: typeof initialState,
  action: { type: "show" | "hide"; payload: string }
) {
  switch (action.type) {
    case "show":
      return { show: true, image: action.payload };
    case "hide":
      return { show: false, image: "" };
    default:
      throw new Error();
  }
}


function App() {
  const windowSize = useWindowSize();

  const PAGES_ITEMS = [
    {
      title: "home",
      icon: FiHome,
      path: "/",
    },
    {
      title: "skills",
      icon: RiSearchLine,
      path: "/skills",
    },
    {
      title: "notif",
      icon: FiBell,
      path: "/notification",
    },
    {
      title: "message",
      icon: FiMail,
      path: "/message",
    },
  ];
  // const PAGE_WIDTH = 375;
  // const PAGE_HEIGHT = 667;
  // const PAGE_HEIGHT = null;

  const OFFSET_TO_SNAP = 100;
  const VELOCITY_TO_SNAP = 500;
  const TRANSITION_DURATION = 0.1;
  const PAGE_COUNT = PAGES_ITEMS.length;
  const HEADER_ITEMS = PAGES_ITEMS.map((val) => ({
    icon: val.icon,
    title: val.title,
    path: val.path,
  }));
  const TRANSITION_CONFIG: Transition = { duration: TRANSITION_DURATION };

  // animation value
  const controls = useAnimation();
  const page_underline = useAnimation();
  const pageDrawer = useAnimation();
  const pageBottomSheet = useAnimation();
  const [modal, dispatch] = useReducer(showModalReducer, initialState);

  const page = useMotionValue(0);

  const changePage = async (page_number: number) => {
    controls.start({
      x: -1 * windowSize.width * page_number,
      transition: TRANSITION_CONFIG,
    });
    await page_underline.start({
      x: (windowSize.width / PAGE_COUNT) * page_number,
      transition: TRANSITION_CONFIG,
    });
  };

  const openDrawer = async () => {
    await pageDrawer.start({
      x: "0",
      transition: TRANSITION_CONFIG,
    });
  };

  const closeDrawer = async () => {
    await pageDrawer.start({
      x: "-100%",
      transition: TRANSITION_CONFIG,
    });
  };

  const openBottomSheet = async () => {
    pageBottomSheet.start({
      y: "0",
      opacity: 1,
      transition: TRANSITION_CONFIG,
    });
  };

  const closeBottomSheet = async () => {
    await pageBottomSheet.start({
      y: windowSize.height,
      opacity: 0,
      transition: TRANSITION_CONFIG,
    });
  };

  async function handleBottomSheetDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    if (offset > OFFSET_TO_SNAP / 2 || velocity > VELOCITY_TO_SNAP / 2) {
      await closeBottomSheet();
    } else {
      await openBottomSheet();
    }
  }

  return (
    // <AnimatePresence exitBeforeEnter >
    <Router>
      <AnimatePresence>
        <motion.div
          style={{ width: "100%", height: "100vh" }}
          className="relative bg-gray-900 mx-auto my-auto overflow-hidden  flex flex-col"
        >
          <Drawer
            closeDrawer={closeDrawer}
            pageDrawer={pageDrawer}
            DEFAULT_TRANSION={DEFAULT_TRANSION}
          />
          <BottomSheet
            handleBottomSheetDragEnd={handleBottomSheetDragEnd}
            closeBottomSheet={closeBottomSheet}
            pageBottomSheet={pageBottomSheet}
            DEFAULT_TRANSION={DEFAULT_TRANSION}
          />
          <ImageModal
            onClick={() => dispatch({ type: "hide", payload: "" })}
            modal={modal}
          />
          <Header openBottomSheet={openBottomSheet} openDrawer={openDrawer} />
          <DesktopDrawer HEADER_ITEMS={HEADER_ITEMS} />
          <div className="max-w-3xl md:max-w-2xl h-full flex w-full   justify-start  pb-24 md:pb-12 bg-gray-900 mx-auto border-r-2 border-l-2 border-gray-700">
            <Switch>
              <Route exact path="/">
                <Index dispatch={dispatch} />
              </Route>
              <Route exact path="/detail/:id">
                <Details dispatch={dispatch} />
              </Route>
              <Route exact path="/skills">
                <Skills />
              </Route>
              <Route exact path="/notification">
                <Me dispatch={dispatch} />
              </Route>
              <Route exact path="/message">
                <ContactUs />
              </Route>
            </Switch>
          </div>
          <Trend />

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
    </Router>
    // </AnimatePresence>
  );
}

export default App;

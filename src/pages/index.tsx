import React from 'react'
import { motion, } from 'framer-motion'
import Tweet from '../components/Tweet'
interface Props {
    PAGE_WIDTH?: number;
    PAGE_HEIGHT?: number;
    dispatch: (value: {
        type: "hide" | "show";
        payload: string;
    }) => void

}
const tweet_text = `: Did you know that while holding ⇧, you can scrub left or right on an input label to increase or decrease the value based on your Big Nudge setting?`


const container = {
    hidden: { opacity: 0.5 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}


const Index = ({ dispatch }: Props) => {

    return (
        <motion.div variants={container} initial="hidden" animate="show" key={0} className="flex-1  top-0 flex flex-col overflow-y-scroll  justify-start items-start">
            <Tweet tweet_date="today" tweet_text={tweet_text} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
            <Tweet tweet_date="today" tweet_text={tweet_text} isReteet retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
            <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
            <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
            <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
            <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
            <Tweet tweet_date="today" tweet_text={tweet_text} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} onImageTap={() => dispatch({ type: "show", payload: "/tweet_image.jpg" })} user_name="sina" tweet_image={"/tweet_image.jpg"} />
        </motion.div>


    )
}

export default Index

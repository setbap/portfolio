import React from 'react'
import { motion } from 'framer-motion'
import TweetTop from '../components/TweetTop'
import SubTweet from '../components/SubTweet'

interface Props {

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

const Details = (props: Props) => {
    return (
        <motion.div variants={container} initial="hidden" animate="show" key={0} className="flex-1 max-w-3xl lg:max-w-2xl top-0 flex flex-col overflow-y-scroll  justify-start items-start">
            <TweetTop tweet_date="today" tweet_text={"tweet asdadasd asd as das das dtext"} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
            <div className="m-1" />
            <SubTweet tweet_date="today" tweet_text={"tweet asdadasd asd as das das dtext"} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
            <SubTweet tweet_date="today" tweet_text={"tweet asdadasd asd as das das dtext"} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
            <SubTweet tweet_date="today" tweet_text={"asdasdd asas sdasd"} retweetParentId="sheeto" retweetParentName="mother of sheet" user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" tweet_image={"/tweet_image.jpg"} />

            <SubTweet isLats tweet_date="today" tweet_text={"tweet asdadasd asd as das das dtext"} user_image="/me_icon.jpg" user_id={"1asda"} user_name="sina" />
        </motion.div>
    )
}

export default Details

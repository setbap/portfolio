import React from 'react'
import { motion } from 'framer-motion'
import { AiOutlineRetweet, AiOutlineShareAlt } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'

interface Props {
    isReteet?: boolean;
    retweetTweet?: typeof Tweet;
    retweetParentName?: string;
    retweetParentId?: string;
    user_name: string;
    user_image: string;
    user_id: string;
    tweet_text: string;
    tweet_date: string;
    tweet_image?: string;
    next_tweet?: string;
    onTap?: VoidFunction;
    onImageTap?: VoidFunction;
}



const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}



const Tweet = ({ isReteet, tweet_text, user_image, user_name, user_id, tweet_date, tweet_image, onTap, onImageTap }: Props) => {

    return (
        <>
            <motion.div {...{ onTap }} whileHover={{ cursor: "pointer", backgroundColor: 'rgb(35, 45, 62)' }} variants={item} layout layoutId={user_id + user_image} className="  w-full border-b border-gray-700 px-3  pt-2 text-white">
                {/* show retweet */}
                {isReteet && (
                    <div className="flex flex-row justify-start items-center  text-xs text-gray-700">
                        <div className="ml-8 mr-4 text-right"><AiOutlineRetweet /></div>
                        <div className="text-left">{`${user_name} Retweeted`}</div>
                    </div>

                )}
                {/* tweet info */}
                <div className="flex flex-row my-1 justify-start items-start  text-sm text-white">
                    <div className=" w-16 rounded-full overflow-hidden text-right"><img className="w-10 rounded-full " src={user_image} width={"100%"} alt="user icon" /></div>
                    <div className="flex-1 flex flex-col">
                        {/* user name */}
                        <div className="text-left text-sm flex flex-row ">
                            <div className="mr-2 capitalize">{user_name}</div>
                            <div className="mr-2 text-gray-700 underline">@{user_id}</div>
                            <span className="text-gray-700">{tweet_date}</span>
                        </div>
                        <div className="text-left mb-2">
                            <span className="text-xs">{tweet_text}</span>
                        </div>
                        {tweet_image && (
                            <motion.div
                                onClick={onImageTap}
                                className="w-full h-48 mb-2 rounded-lg  overflow-hidden">
                                <img src={tweet_image} className="w-full h-48 object-cover" alt="" />
                            </motion.div>
                        )
                        }
                        <div className="w-full flex text-gray-700 flex-row justify-between items-center px-1 mb-2">
                            <div><BsChat /> </div>
                            <span><AiOutlineRetweet className="mr-2 inline" /> <span>3</span></span>
                            <span><FaRegHeart className="mr-2 inline" /> <span>3</span></span>
                            <div><AiOutlineShareAlt /></div>
                        </div>



                    </div>
                </div>



            </motion.div>
        </>
    )
}

export default Tweet

import React from 'react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface Props {

}

const ContactUs = (props: Props) => {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: [1.2, 1] }} className="w-4/5 mx-auto text-white pt-8">
            <form action="mailto:ebr.sina@outlook.com?subject=contact with you" method="post" encType="text/plain" className="flex flex-col">
                <h2 className="text-center text-xl font-bold capitalize">Contact me</h2>


                <h2 className="w-full flex flex-row text-3xl justify-center items-center p-8 ">
                    <a className="hover:border-white border-b-2 border-transparent pb-1" target="_blank" href="https://github.com/setbap"> <FaGithub className="text-white " /></a>
                    <div className="p-4"></div>
                    <a className="hover:border-blue-500 border-b-2 border-transparent pb-1" target="_blank" href="https://www.linkedin.com/in/sina-ebrahimi-88893314b/"><FaLinkedin className="text-blue-400" /></a>
                </h2>

                <h2 className="w-full flex flex-row text-xl justify-center items-center px-8 pb-8 ">
                    or email
                </h2>

                <label className="font-bold text-lg text-gray-400" htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required className="focus:bg-gray-600 font-semibold  focus:text-white focus:border-orange-600 transition-all duration-300 rounded-lg p-2 m-2 focus:outline-none placeholder-gray-800 text-gray-900  focus:shadow-outline bg-gray-500" placeholder="example@example.com" />
                <div className="h-4" />
                <label className="font-bold text-lg text-gray-400" htmlFor="desc">Description:</label>
                <textarea id="desc" required name="description" className="focus:bg-gray-600 focus:text-white font-semibold focus:border-orange-600 transition-all duration-300 rounded-lg p-2 m-2 focus:outline-none placeholder-gray-800 text-gray-900  focus:shadow-outline bg-gray-500" placeholder="some text" />
                <button type="submit" className="px-4 mt-8 py-2 bg-orange-600 rounded-lg "> Submit</button>
            </form>
        </motion.div>
    )
}

export default ContactUs

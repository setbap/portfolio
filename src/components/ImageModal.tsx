import React from 'react'
import { motion } from 'framer-motion'

interface Props {
    modal: {
        show: boolean;
        image: string;
    };
    onClick: VoidFunction;
}

const ImageModal = ({ modal, onClick }: Props) => {
    return modal.show ? (
        <motion.div
            initial={false}
            animate={modal.show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            onTap={onClick}
            style={{ pointerEvents: "auto", width: "100%", height: "100%" }}
            layout className="flex flex-col justify-center items-center absolute z-50 transform scale-0  bg-opacity-25 bg-white">
            <motion.div
                style={{ width: "100%", height: "100%" }}
                className=" mb-2 rounded-lg flex items-center  overflow-hidden">
                <img src={modal.image} className="w-full h-auto object-cover" alt="" />
            </motion.div>

        </motion.div>) : <></>

}

export default ImageModal

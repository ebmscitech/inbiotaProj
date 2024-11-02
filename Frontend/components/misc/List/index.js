import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../Layout/ScrollAnimationWrapper";

const list = [
    "List 1.",
    "List 2.",
    "List 3.",
    "List 4.",
]

const ListAnimation = () => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (
        <ScrollAnimationWrapper>
            <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
                <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
                    loremipsum blablabla
                </h3>
                <p className="my-2 text-black-500">
                    loremipsum blablabla
                </p>
                <ul className="text-black-500 self-start list-inside ml-8">
                    {list.map((item, index) => (
                        <motion.li
                            className="relative circle-check custom-list"
                            custom={{ duration: 2 + index }}
                            variants={scrollAnimation}
                            key={item}
                            whileHover={{
                                scale: 1.1,
                                transition: {
                                    duration: .2
                                }
                            }}>
                            {item}
                        </motion.li>
                    )
                    )}
                </ul>
            </motion.div>
        </ScrollAnimationWrapper>
    );
};

export default ListAnimation;

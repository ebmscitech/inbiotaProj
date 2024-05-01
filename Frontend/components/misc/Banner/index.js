import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "../../Layout/ScrollAnimationWrapper";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ButtonPrimary from "../ButtonPrimary";
import { Flag20Filled, Location20Filled, Search20Filled } from "@fluentui/react-icons";

const Banner = ({ isDetail = false }) => {
    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    return (
        <div className="min-w-full bg-primary-500 grid justify-items-center text-center mt-36 h-36 sm:mt-32 px-4 sm:px-8 xl:px-16 mx-auto">
            <div className="max-w-screen-xl grid items-center justify-items-center py-6 text-w-50">
                {isDetail ?
                    <h1 className="w-full sm:w-2/3 leading-relaxed font-semibold sm:text-xl">
                        Ayo, bersama-sama kita wujudkan perubahan yang kita impikan. Sampaikan aspirasi dan gagasan Anda untuk menciptakan perubahan yang positif.
                    </h1> : <>
                        <h1 className="font-semibold text-xl">
                            Berikut adalah list Calon Legislatif yang terdaftar di Aspirasi.net
                        </h1>
                        <div>
                            Kamu bisa melihat detail profile  caleg & membuat aspirasi kepada caleg terkait
                        </div>
                    </>}
                {/* <ScrollAnimationWrapper
                    className="w-full sm:w-10/12 grid max-h-28 mb-12 sm:mb-0 sm:max-h-28 grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 sm:divide-x-2 divide-gray-100 z-10">
                    <motion.div
                        className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
                        custom={{ duration: 2 }}
                        variants={scrollAnimation}
                    >
                        <div className="flex mx-auto w-auto">
                            <div className="flex border-b-[1px] items-center p-2">
                                <Search20Filled className="mr-2" />
                                <input type="text" placeholder="Cari Nama Caleg"
                                    className=" focus:outline-none text-gray-700" />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
                        custom={{ duration: 3 }}
                        variants={scrollAnimation}
                    >
                        <div className="flex mx-auto w-auto ">
                            <div className="flex border-b-[1px] items-center p-2">
                                <Flag20Filled className="mr-2" />
                                <input type="text" placeholder="Cari Nama Partai"
                                    className=" focus:outline-none text-gray-700" />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
                        custom={{ duration: 3 }}
                        variants={scrollAnimation}
                    >
                        <div className="flex mx-auto w-auto">
                            <div className="flex border-b-[1px] items-center p-2">
                                <Location20Filled className="mr-2" />
                                <input type="text" placeholder="Cari Dapil"
                                    className=" focus:outline-none text-gray-700" />
                            </div>
                        </div>
                    </motion.div>
                </ScrollAnimationWrapper>
                <div className="py-10 px-5 text-center w-full sm:w-2/12">
                    <ButtonPrimary addClass={"py-3 lg:py-4 px-5 lg:px-7"}>Cari</ButtonPrimary>
                </div> */}
            </div>
        </div>
    );
};

export default Banner;

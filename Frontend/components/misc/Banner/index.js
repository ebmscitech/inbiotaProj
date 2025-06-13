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
            </div>
        </div>
    );
};

export default Banner;

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const Inforial2 = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="relative max-w-screen-xl px-8 xl:px-16 mx-auto" id="inforial-2">
      <ScrollAnimationWrapper>
        <div className="font-bold text-3xl sm:pt-16">Powered by:</div>
        <motion.div
          className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-start sm:pb-16"
          variants={scrollAnimation}>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8 p-4">
            <motion.div className="h-[117px] w-auto" variants={scrollAnimation}>
              <Image
                src="/assets/puipt-logo.png"
                alt="PUI-PT Nutrasetikal"
                quality={100}
                width={341}
                height={50}
                className="h-[117px] w-auto"
              />
            </motion.div>
            <motion.div className="h-[117px] w-auto" variants={scrollAnimation}>
              <Image
                src="/assets/itb-logo.png"
                alt="Institut Teknologi Bandung"
                quality={100}
                width={341}
                height={50}
                className="h-[117px] w-auto"
              />
            </motion.div>
            <motion.div className="h-[117px] w-auto" variants={scrollAnimation}>
              <Image
                src="/assets/ebm-logo.png"
                alt="EBM Scitech"
                quality={100}
                width={341}
                height={50}
                className="h-[117px] w-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      {/* <div
        className="absolute top-0 -left-52 h-full w-[45%] bg-no-repeat bg-top rotate-180"
        style={{ backgroundImage: `url('/assets/vector.svg')`, backgroundSize: "contain" }}
      ></div> */}
    </div>
  );
};

export default Inforial2;

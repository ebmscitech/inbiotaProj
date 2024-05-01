import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import ButtonPrimary from "./misc/ButtonPrimary";

const Inforial3 = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl px-8 xl:px-16 mx-auto"
      id="inforial-3"
    >
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}>
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <div className="relative">
              <div className="absolute h-full -left-5 sm:-left-8 border-[3px] border-solid border-opacity-20 border-secondary-500"></div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                <strong>Kenali dan Ingat Calegmu</strong>
              </h1>
            </div>
            <p className="text-black-500 mt-4 mb-6">
              Eits, jangan asal pilih! Kenali lebih dalam calegmu dan tentukan pilihan yang tepat
            </p>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/assets/photo-2.svg"
                alt="Legislatif"
                quality={100}
                width={612}
                height={383}
                layout="responsive"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Inforial3;

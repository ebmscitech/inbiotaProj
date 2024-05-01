import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import SearchBox from "./misc/SearchBox";
import { useRouter } from "next/navigation";

const Inforial1 = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter()

  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="inforial-1"
    >
      {/* <SearchBox /> */}
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}>
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <div className="relative">
              <div className="absolute h-full -left-5 sm:-left-8 border-[3px] border-solid border-opacity-20 border-secondary-500"></div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                <strong>Sumber Data Bahan Alam dengan Basis Data Terpercaya</strong>
              </h1>
            </div>
            <p className="text-black-500 mt-4 mb-6">
              Inbiota adalah software database yang menghimpun data tanaman dengan senyawa yang ada di dalamnya yang bermanfaat bagi kehidupan
            </p>
            {/* <ButtonPrimary type='button' onClick={() => router.push('/aspirasi-rakyat')} addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
              Buat Aspirasi
            </ButtonPrimary> */}
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/assets/about-img.png"
                alt="about image"
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

export default Inforial1;

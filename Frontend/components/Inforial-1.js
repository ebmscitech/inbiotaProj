import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import SearchBox from "./misc/SearchBox";
import { useRouter } from "next/navigation";
import Diamond from "../public/assets/diamond.svg";

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
          <div className="flex flex-col justify-center items-start row-start-1 z-10">
            <div className="relative">
              {/* <div className="absolute h-full -left-5 sm:-left-8 border-[3px] border-solid border-opacity-20 border-secondary-500"></div> */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-white-300 leading-normal">
                <strong>Natural Product Trusted
                  <p className="from-[#FF5DD9] bg-clip-text text-transparent bg-gradient-to-r to-[#890670]">Data Source</p></strong>
              </h1>
            </div>
            <p className="text-white-500 text-[26px] font-medium mt-4 mb-6">
              Inbiota is an intelligent database designed to organize and provide access to organism-based compound data. It is a breakthrough in natural product research, utilizing AI to streamline data discovery and analysis.
            </p>
            <ButtonPrimary type='button' onClick={() => router.push('/search')}
              addClass={"py-3 lg:py-4 px-10 lg:px-12"}>
              Get Started!
            </ButtonPrimary>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div
        className="absolute hidden sm:flex -top-0 right-0 sm:-right-96 bottom-0 w-2/5 z-0 sm:w-[110%] bg-no-repeat bg-right bg-mobile-size lg:bg-cover"
        style={{ backgroundImage: `url('/assets/diamond.png')` }}
      ></div>
      <div
        className="absolute top-0 -left-10 -bottom-[33rem] w-2/5 sm:w-w-[45%] bg-no-repeat bg-right"
        style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "400px 400px" }}
      ></div>
    </div>
  );
};

export default Inforial1;

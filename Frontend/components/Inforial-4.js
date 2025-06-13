import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import ButtonPrimary from "./misc/ButtonPrimary";
import { useRouter } from "next/navigation";

const Inforial4 = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter()

  return (
    <div
      className="max-w-screen-xl px-8 xl:px-16 mx-auto"
      id="inforial-4"
    >
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/assets/photo-3.svg"
                alt="Pasal"
                quality={100}
                width={612}
                height={383}
                layout="responsive"
              />
            </motion.div>
          </div>
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <div className="relative">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-300 leading-normal">
                <strong>Sources</strong>
              </h1>
            </div>
            <p className="text-black-500 text-[26px] font-medium mt-4 mb-6">
              We gather research data related to bioactivity and phytochemical references from various scientific sources.
            </p>
            <ButtonPrimary type='button' onClick={() => router.push('/docs')}
              addClass={"py-3 lg:py-4 px-10 lg:px-12"}>
              See Documents
            </ButtonPrimary>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Inforial4;

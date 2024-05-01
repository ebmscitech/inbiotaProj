import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import SearchBox from "./misc/SearchBox";
import { useRouter } from "next/navigation";

const Inforial2 = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter()

  return (
    <div
      className="max-w-screen-xl px-8 xl:px-16 mx-auto"
      id="inforial-2"
    >
      <ScrollAnimationWrapper>
        <motion.div
          className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-start sm:py-16"
          variants={scrollAnimation}>
          <div className="flex w-full sm:w-1/3 mb-14 sm:mb-0">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/assets/inbiota-logo.png"
                alt="Aspirasi Logo"
                quality={100}
                width={341}
                height={85}
              // layout="responsive"
              />
            </motion.div>
          </div>
          <div className="w-full sm:w-2/3 flex flex-col justify-center items-start row-start-2 sm:row-start-1 mb-14 sm:mb-0">
            <div className="relative">
              <div className="absolute h-full -right-5 sm:-right-8 border-[3px] border-solid border-opacity-20 border-secondary-500"></div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                <strong>Jangan Pilih Karena Janji, Pilih Pemimpin yang Berprestasi dan Menerima Aspirasi</strong>
              </h1>
            </div>
            <p className="text-black-500 mt-4 mb-6">
              Aspirasi.net hadir sebagai wadah terpercaya untuk menyampaikan aspirasi rakyat secara langsung kepada caleg yang akan dipilih dengan nilai-nlai transparansi
            </p>
          </div>
        </motion.div>
        <div className="w-full grid justify-center text-center mb-14 sm:mb-7">
          <div className="grid justify-center place-items-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal mb-10">
              <strong>Suarakan Aspirasimu Sekarang!</strong>
            </h1>
            <ButtonPrimary type='button' onClick={() => router.push('/aspirasi-rakyat')} addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
              Wujudkan Aspirasimu
            </ButtonPrimary>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Inforial2;

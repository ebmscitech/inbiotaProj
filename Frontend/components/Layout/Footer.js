import React from "react";
import Facebook from "../../public/assets/Icon/facebook.svg";
import Tiktok from "../../public/assets/Icon/tiktok.svg";
import Instagram from "../../public/assets/Icon/instagram.svg";
import * as fbq from '@/lib/fpixel'
import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative bg-[#020230] text-white-500 pt-12 pb-0 sm:pb-20 overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-3 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-2 sm:grid-cols-12 gap-4 relative z-10">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-2 sm:col-end-3 flex flex-col items-start ">
          <Image
            src="/assets/inbiota-logo.png"
            alt="Inbiota Logo"
            quality={100}
            width={200}
            height={100}
          />
          <p className="text-gray-400">©{new Date().getFullYear()} - Inbiota</p>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-4 sm:col-end-10 flex flex-col">
          <p className="text-white-500 mb-4 text-lg font-bold">PT. EBM Saintifik dan Teknologi</p>
          <ul className=" ">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Address : Jl. Bukit Raya No.582, Kp. Sekejulang, Ciumbuleuit, Cidadap, Bandung 40142, Jawa Barat, Indonesia{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <div>
                follow me on:
              </div>
              <Instagram className="h-6 w-6 fill-white-300" />
            </li>
          </ul>
        </div>
      </div>
      <div
        className="absolute top-0 right-0 sm:right-80 bottom-0 w-2/5 sm:w-1/4 bg-no-repeat bg-right bg-mobile-size lg:bg-cover"
        style={{ backgroundImage: `url('/assets/molecules.svg')` }}
      ></div>
    </div>
  );
};

export default Footer;

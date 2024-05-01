import React from "react";
import Facebook from "../../public/assets/Icon/facebook.svg";
import Tiktok from "../../public/assets/Icon/tiktok.svg";
import Instagram from "../../public/assets/Icon/instagram.svg";
import * as fbq from '@/lib/fpixel'

const Footer = () => {

  // const handlePixel = () => {
  //   fbq.event('AddToCart', {
  //     content_name: `Registrasi Caleg`,
  //     content_category: 'Aspirasi > Registrasi Caleg',
  //     content_type: 'caleg',
  //     value: 1,
  //   })
  // }

  return (
    <div className="bg-[#020230] text-white-500 pt-12 pb-0 sm:pb-20">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-4 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-2 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          {/* <LogoVPN className="h-8 w-auto mb-6" /> */}
          <h1 className="h-8 w-auto mb-6 font-bold">About Us</h1>
          <p className="mb-4 text-white-500">
            <strong className="font-medium leading-relaxed">Inbiota</strong> adalah software database yang menghimpun data tanaman dengan senyawa yang ada di dalamnya yang bermanfaat bagi kehidupan.
          </p>
          {/* <p className="mb-4 text-white-500">
            Aspirasi tanpa perantara menjadi penyambung utama aspirasi dari hati masyarakat kepada pengemban mandat rakyat.
          </p> */}
          {/* <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Facebook className="h-6 w-6" />
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Twitter className="h-6 w-6" />
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Instagram className="h-6 w-6" />
            </div>
          </div> */}
          <p className="text-gray-400">©{new Date().getFullYear()} - Inbiota</p>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-10 flex flex-col">
          <p className="text-white-500 mb-4 text-lg font-bold">Contact Info</p>
          <ul className=" ">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Address : Jl. Bukit Raya No.582, Kp. Sekejulang, Ciumbuleuit, Cidadap, Bandung 40142, Jawa Barat, Indonesia{" "}
            </li>
            {/* <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Phone : +62 123 456 789{" "}
            </li> */}
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Email : <a target="_blank" href="mailto:info@aspirasi.net">info@inbiota.net</a>
            </li>
            {/* <li className="my-2 cursor-pointer transition-all">
              <a className="flex bg-white-300 border border-solid hover:scale-105 border-black-600 rounded-md max-w-fit"
                href="https://aspirasi.net/auth/register"
                onClick={() => handlePixel()}
                target="_blank">
                <p className="py-1 px-2 text-primary-500 font-bold text-center cursor-pointer transition-all">
                  Daftar Sebagai Caleg
                </p>
              </a>
            </li> */}
          </ul>
        </div>
        {/* <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Aspirasi ?{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              FAQ{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tutorials{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              About Us{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Privacy Policy{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Terms of Service{" "}
            </li>
          </ul>
        </div> */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-white-500 mb-4 text-lg font-bold">Social Media</p>
          <ul className="">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <a className="flex"
                href="https://www.instagram.com/Inbiota_net/"
                target="_blank">
                <Instagram className="h-6 w-6 fill-white-300" />
                <p className="pl-3 text-white-500 hover:text-orange-500 cursor-pointer transition-all">
                  Inbiota_proj{" "}
                </p>
              </a>
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <a className="flex"
                href="https://www.facebook.com/profile.php?id=61551382244940"
                target="_blank">
                <Facebook className="h-6 w-6 fill-white-300" />
                <p className="pl-3 text-white-500 hover:text-orange-500 cursor-pointer transition-all">
                  Inbiota{" "}
                </p>
              </a>
            </li>
            {/* <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              <a className="flex"
                href="https://www.tiktok.com/@aspirasi_net"
                target="_blank">
                <Tiktok className="h-6 w-6 fill-white-300" />
                <p className="pl-3 text-white-500 hover:text-orange-500 cursor-pointer transition-all">
                  Aspirasi_net{" "}
                </p>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

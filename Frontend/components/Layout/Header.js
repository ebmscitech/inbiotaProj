import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
// import ButtonOutline from "../misc/ButtonOutline.";
import ButtonPrimary from "../misc/ButtonPrimary";
import LogoAspirasi from "../../public/assets/logo-aspirasi.svg"
import { Document20Filled, Home20Filled, PeopleTeam20Regular, Speaker020Filled } from "@fluentui/react-icons";
import { usePathname } from 'next/navigation'
import Image from "next/image";
import { useRouter } from "next/router";
import * as fbq from '@/lib/fpixel'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter();
  const { username } = router.query;
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);

  // const handlePixel = () => {
  //   fbq.event('AddToCart', {
  //     content_name: `Registrasi Caleg`,
  //     content_category: 'Aspirasi > Registrasi Caleg',
  //     content_type: 'caleg',
  //     value: 1,
  //   })
  // }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-30 bg-black-600 transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            {/* <LogoAspirasi className="h-20 w-auto" /> */}
            <Image
              src="/assets/inbiota-logo.png"
              alt="Inbiota Logo"
              quality={100}
              width={150}
              height={70}
            // layout="responsive"
            />
          </div>
          <ul className="hidden lg:flex col-start-10 col-end-10 text-white-500 items-right">
            <Link
              href="/"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/' ? 'text-orange-500 animation-active' : 'text-white-500 hover:text-orange-500 a'}`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/docs' ? 'text-orange-500 animation-active' : 'text-white-500 hover:text-orange-500 a'}`}
            >
              Docs
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/contact' ? 'text-orange-500 animation-active' : 'text-white-500 hover:text-orange-500 a'}`}
            >
              Contact
            </Link>
          </ul>
          <div className="col-start-11 col-end-11 flex text-sm justify-end items-center">
            {/* <Link href="/">
              <div className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                Sign In
              </div>
            </Link> */}
            <div className="max-w-sm">
              <Link href="/auth/login"
              // onClick={() => handlePixel()}
              >
                <button className="bg-gradient-custom text-white-500 py-2 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  Sign In
                </button>
                {/* <ButtonPrimary addClass={"py-3 lg:py-3 px-5 lg:px-7"}>Sign In</ButtonPrimary> */}
              </Link>
            </div>
            <div className="max-w-sm pl-5">
              <Link href="/auth/register"
              // onClick={() => handlePixel()}
              >
                <button className="bg-gradient-custom-2 border-warning-400 border text-white-500 py-2 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  Sign Up
                </button>
                {/* <ButtonPrimary addClass={"py-3 lg:py-3 px-5 lg:px-7"}>Sign In</ButtonPrimary> */}
              </Link>
            </div>
            {/* <button className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-2 px-6 rounded-full shadow-md hover:from-purple-800 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Sign Up
            </button> */}
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-0 sm:px-8 shadow-t ">
        <div className="bg-black-600 sm:px-3">
          <ul className="flex w-full justify-between items-center text-white-500">
            <Link
              href="/"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === '/'
                  ? "  border-warning-300 text-orange-500"
                  : " border-transparent")
              }
            >
              <Home20Filled />
              Home
            </Link>
            <Link
              href="/docs"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === '/docs'
                  ? "  border-warning-300 text-orange-500"
                  : " border-transparent ")
              }
            >
              <Document20Filled />
              Docs
            </Link>
            <Link
              href="/contact"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === '/contact'
                  ? "  border-warning-300 text-orange-500"
                  : " border-transparent ")
              }
            >
              <PeopleTeam20Regular />
              Contact
            </Link>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;

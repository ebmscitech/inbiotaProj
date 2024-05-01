import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
// import ButtonOutline from "../misc/ButtonOutline.";
import ButtonPrimary from "../misc/ButtonPrimary";
import LogoAspirasi from "../../public/assets/logo-aspirasi.svg"
import { Home20Filled, PeopleTeam20Regular, Speaker020Filled } from "@fluentui/react-icons";
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
          "fixed top-0 w-full  z-30 bg-white-500 transition-all " +
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
              width={170}
              height={80}
            // layout="responsive"
            />
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500 items-center">
            <Link
              href="/"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/' ? 'text-[#020230] animation-active' : 'text-black-500 hover:text-[#020230] a'}`}
            >
              Home
            </Link>
            <Link
              href="/aspirasi-rakyat"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/aspirasi-rakyat' ? 'text-[#020230] animation-active' : 'text-black-500 hover:text-[#020230] a'}`}
            >
              Docs
            </Link>
            <Link
              href="/list-caleg"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/list-caleg' ? 'text-[#020230] animation-active' : 'text-black-500 hover:text-[#020230] a'}`}
            >
              Contact
            </Link>
          </ul>
          <div className="col-start-11 col-end-11 flex text-sm justify-end items-center">
            {/* <Link href="/">
              <div className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-[#020230] transition-all">
                Sign In
              </div>
            </Link> */}
            <div className="max-w-sm">
              <Link href="/auth/register"
              // onClick={() => handlePixel()}
              >
                <ButtonPrimary addClass={"py-3 lg:py-3 px-5 lg:px-7"}>Sign Up</ButtonPrimary>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-0 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <Link
              href="/"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === '/'
                  ? "  border-[#020230] text-[#020230]"
                  : " border-transparent")
              }
            >
              <Home20Filled />
              Home
            </Link>
            <Link
              href="/aspirasi-rakyat"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === '/aspirasi-rakyat'
                  ? "  border-[#020230] text-[#020230]"
                  : " border-transparent ")
              }
            >
              <Speaker020Filled />
              Docs
            </Link>
            <Link
              href="/list-caleg"
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (pathname === '/list-caleg'
                  ? "  border-[#020230] text-[#020230]"
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

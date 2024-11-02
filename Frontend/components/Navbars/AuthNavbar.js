import React from "react";
import Link from "next/link";
// components

import PagesDropdown from "../../components/Dropdowns/PagesDropdown.js";
import LogoAspirasi from "../../public/assets/logo-aspirasi.svg"
import Image from "next/image";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute bg-black-600 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-center">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              {/* <LogoAspirasi className="h-20 w-auto" /> */}
              <Image
                src="/assets/inbiota-logo.png"
                alt="Inbiota Logo"
                quality={100}
                width={170}
                height={80}
              // layout="responsive"
              />
              {/* <div
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"

              >
                Aspirasi
              </div> */}
            </Link>
            {/* <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button> */}
          </div>
          {/* <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
          </div> */}
        </div>
      </nav>
    </>
  );
}

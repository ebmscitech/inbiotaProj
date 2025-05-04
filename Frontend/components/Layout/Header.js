import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Document20Filled, Home20Filled, PeopleTeam20Regular } from "@fluentui/react-icons";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { getStorage, setStorage } from "@/utils/storage";
import ChangeAccountDropdown from "../Dropdowns/ChangeAppDropdown";

const Header = () => {
  const pathname = usePathname();
  const [scrollActive, setScrollActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });

    const loggedIn = getStorage('HasLoged');
    setIsLoggedIn(loggedIn === true || loggedIn === "true");
  }, []);

  const handleLogout = () => {
    setStorage('HasLoged', false);
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-30 bg-black-600 transition-all ${scrollActive ? "shadow-md pt-0" : "pt-4"}`}>
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Image
              src="/assets/inbiota-logo.png"
              alt="Inbiota Logo"
              quality={100}
              width={150}
              height={70}
            />
          </div>
          <ul className="hidden lg:flex col-start-10 col-end-10 text-white-500 items-right items-center">
            <Link href="/" className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/' ? 'text-orange-500 animation-active' : 'text-white-500 hover:text-orange-500'}`}>Home</Link>
            <Link href="/docs" className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/docs' ? 'text-orange-500 animation-active' : 'text-white-500 hover:text-orange-500'}`}>Docs</Link>
            <Link href="/contact" className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${pathname === '/contact' ? 'text-orange-500 animation-active' : 'text-white-500 hover:text-orange-500'}`}>Contact</Link>
          </ul>

          <div className="col-start-11 col-end-11 flex text-sm justify-end items-center">
            {!isLoggedIn ? (
              <>
                <div className="max-w-sm">
                  <Link href="/auth/login">
                    <button className="bg-gradient-custom text-white-500 py-2 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                      Sign In
                    </button>
                  </Link>
                </div>
                <div className="max-w-sm pl-5">
                  <Link href="/auth/register">
                    <button className="bg-gradient-custom-2 border-warning-400 border text-white-500 py-2 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <ChangeAccountDropdown />
                <div className="max-w-sm pl-5">
                  <button
                    onClick={handleLogout}
                    className="bg-primary-500 border-warning-400 border text-white-500 py-2 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-0 sm:px-8 shadow-t">
        <div className="bg-black-600 sm:px-3">
          <ul className="flex w-full justify-between items-center text-white-500">
            <Link href="/" className={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ${pathname === '/' ? "border-warning-300 text-orange-500" : "border-transparent"}`}>
              <Home20Filled />
              Home
            </Link>
            <Link href="/docs" className={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ${pathname === '/docs' ? "border-warning-300 text-orange-500" : "border-transparent"}`}>
              <Document20Filled />
              Docs
            </Link>
            <Link href="/contact" className={`mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ${pathname === '/contact' ? "border-warning-300 text-orange-500" : "border-transparent"}`}>
              <PeopleTeam20Regular />
              Contact
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;

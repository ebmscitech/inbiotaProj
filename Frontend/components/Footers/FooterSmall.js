import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " py-6"
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-center">
          <div className="w-auto static block justify-start">
            <Link href="/">
              <Image
                src="/assets/inbiota-logo-black.png"
                alt="Inbiota Logo"
                quality={100}
                width={170}
                height={80}
              // layout="responsive"
              />
            </Link>
            {/* <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button> */}
          </div>
        </div>
      </footer>
    </>
  );
}

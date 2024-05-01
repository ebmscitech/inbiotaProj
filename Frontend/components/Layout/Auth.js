import React from "react";

// components

import Navbar from "../../components/Navbars/AuthNavbar.js";
import FooterSmall from "../../components/Footers/FooterSmall.js";
import SeoHead from "../SeoHead.js";
import { ToastContainer } from "react-toastify";

export default function Auth({ children }) {
  return (
    <>
      <SeoHead title='EbmScitech Auth Page' />
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-24 min-h-screen">
          {/* <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div> */}
          {children}
          <FooterSmall absolute />
        </section>
      </main>
      <ToastContainer
          autoClose={3000}
          closeOnClick={false}
          draggable
          hideProgressBar={false}
          limit={3}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position="bottom-right"
          rtl={false}
          theme={"colored"}
        />
    </>
  );
}

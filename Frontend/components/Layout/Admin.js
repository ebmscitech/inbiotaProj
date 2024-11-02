import React from "react";

// components

import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import HeaderStats from "../../components/Headers/HeaderStats.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import SeoHead from "../SeoHead.js";
import { ToastContainer } from "react-toastify";

export default function Admin({ children }) {
  return (
    <>
      <SeoHead title='EbmScitech Admin Page' />
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full min-h-[95vh] -m-24 bg-w-75">
          {children}
          <FooterAdmin />
        </div>
      </div>
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

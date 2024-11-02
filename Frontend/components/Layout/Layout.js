import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import AspirasiModal from "../Modals/AspirasiModal";
import { useSelector } from "react-redux";
import { noValue } from "@/utils/validateInput";

const Layout = ({ children }) => {

  const store = useSelector((state) => state.caleg);

  const [isStickyButton, setIsStickyButton] = useState(false);

  useEffect(() => {
    if (!noValue(store?.dataCaleg)) {
      console.log("ini data caleg detail", store?.dataCaleg)
      var temp = store?.dataCaleg
      setIsStickyButton(temp.account?.sticky_button)
    }
  }, [store?.dataCaleg])

  return (
    <>
      <Header />
      {children}
      <div className={`bg-primary-500 ${isStickyButton ? "pb-20" : ""}`}>
        <Footer />
      </div>
      <AspirasiModal />
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
};

export default Layout;

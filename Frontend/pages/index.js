import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import ScrollTop from "../components/scrolltop";
import ButtonPrimary from "../components/misc/ButtonPrimary";
import { ArrowUp20Filled } from "@fluentui/react-icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Inforial1 from "@/components/Inforial-1";
import Inforial3 from "@/components/Inforial-3";
import Inforial4 from "../components/Inforial-4";
import Inforial5 from "../components/Inforial-5";
import Inforial2 from "@/components/Inforial-2";
// import PageViewGa from "../config/pageViewGA";

function Home() {

  return (
    <>
      <SeoHead title='Inbiota Database Plant App' />
      <Layout>
        <div className="py-8 h-screen bg-[#080D28]">
          <Inforial1 />
        </div>
        <Inforial2 />
        {/* <Inforial3 /> */}
        <Inforial4 />
        {/* <Inforial5 /> */}
        <div className='scroll-to-top'>
          <ScrollTop showOffset={300} className='scroll-top block'>
            <ButtonPrimary addClass={"py-3 px-5 lg:px-4"}>
              <ArrowUp20Filled size={14} />
            </ButtonPrimary>
          </ScrollTop>
        </div>
      </Layout>
    </>
  );
}

export default Home

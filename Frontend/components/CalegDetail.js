import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import ButtonPrimary from "./misc/ButtonPrimary";
// import { motion } from "framer-motion";
// import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
// import SearchBox from "./misc/SearchBox";
// import CardProfile from "./Cards/CardProfile";
import CardCaleg from "./Cards/CardCaleg";
import Banner from "./misc/Banner";
import CardCalegDetail from "./Cards/CardCalegDetail";
import { noValue } from "@/utils/validateInput";
import { useSelector } from "react-redux";
// import AspirasiModal from "./Modals/AspirasiModal";

const CalegDetail = ({ isLoading }) => {
  // const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const store = useSelector((state) => state.caleg);

  const [caleg, setCaleg] = useState({});

  useEffect(() => {
    if (!noValue(store?.dataCaleg)) {
      console.log("ini data caleg detail", store?.dataCaleg)
      var temp = store?.dataCaleg
      setCaleg(temp)
    }
  }, [store?.dataCaleg])

  return (
    <>
      <Banner isDetail={true} />
      <div
        className="max-w-screen-xl mt-2 px-8 xl:px-16 mx-auto"
        id="list-caleg-detail"
      >
        <ScrollAnimationWrapper>
          <div className="grid sm:flex">
            <div className="w-full sm:w-3/12">
              <CardCaleg dataCaleg={caleg.account} />
            </div>
            <div className="w-full sm:w-9/12">
              <CardCalegDetail dataCaleg={caleg} isLoading={isLoading} />
            </div>
          </div>
        </ScrollAnimationWrapper>
        {/* <AspirasiModal /> */}
      </div>
    </>
  );
};

export default CalegDetail;

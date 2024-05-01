import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import SearchBox from "./misc/SearchBox";
import CardProfile from "./Cards/CardProfile";
import CardCaleg from "./Cards/CardCaleg";
import Banner from "./misc/Banner";
import { isObjEmpty } from "../utils";
import { useSelector } from "react-redux";

const Caleg = () => {
  const store = useSelector((state) => state.global);
  const [listCaleg, setListCaleg] = useState([]);

  useEffect(() => {
    if (!isObjEmpty(store?.listCaleg)) {
      console.log("ini list caleg path /list-caleg", store?.listCaleg)
      var temp = store?.listCaleg
      setListCaleg(temp.docs)
    }
  }, [store?.listCaleg])

  return (
    <>
      <Banner />
      <div
        className="max-w-screen-xl mt-2 px-8 xl:px-16 mx-auto"
        id="list-caleg"
      >
        <ScrollAnimationWrapper>
          <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-4 justify-items-center">
            {listCaleg.map((item, index) => {
              return (
                <div key={index} className="grid justify-items-center w-full" >
                  <CardCaleg dataCaleg={item} isButton={true} />
                </div>
              )
            })}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </>
  );
};

export default Caleg;

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
import { usePathname } from "next/navigation";
import CardSearchSidebar from "./Cards/CardSearchSidebar";
import { XboxConsole24Filled } from "@fluentui/react-icons";

const CalegSearch = () => {
    const pathname = usePathname()
    const store = useSelector((state) => state.search);
    const [listCaleg, setListCaleg] = useState([]);

    useEffect(() => {
        if (!isObjEmpty(store?.listUserSearch)) {
            console.log("ini list caleg path /list-caleg/search", store?.listUserSearch)
            var temp = store?.listUserSearch
            setListCaleg(temp)
        } else {
            console.log("ini list caleg search no data")
            setListCaleg([])
        }
    }, [store?.listUserSearch])

    return (
        <>
            <SearchBox />
            <div
                className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
                id="list-caleg-search"
            >
                <ScrollAnimationWrapper>
                    <div>
                        <h1 className="text-sm font-semibold mb-4">Hasil Pencarian : <span>{store?.selectedCaleg ? store?.selectedCaleg : "-"}</span></h1>
                        <hr className="w-full border border-solid border-neutral-100" />
                    </div>
                    <div className="grid sm:flex">
                        <div className="w-full sm:w-1/4 pr-2">
                            <CardSearchSidebar />
                        </div>
                        {listCaleg.length === 0 ?
                            <div className="flex flex-col justify-center items-center w-full sm:w-3/4 pl-2">
                                <Image src="/assets/no-data.svg" width={380} height={420} />
                                <h1 className="text-3xl font-semibold text-neutral-100 mt-5">Hasil pencarian tidak ditemukan</h1>
                            </div> :
                            <div className="grid grid-rows-1 h-min grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center w-full sm:w-3/4 pl-2">
                                {listCaleg.map((item, index) => {
                                    return (
                                        <div key={index} className="grid justify-items-center w-full" >
                                            <CardCaleg dataCaleg={item} isButton={true} />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </ScrollAnimationWrapper>
            </div>
        </>
    );
};

export default CalegSearch;

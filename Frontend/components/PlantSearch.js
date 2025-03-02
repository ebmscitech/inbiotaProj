import React from "react";
import toastAlert from "@/utils/alert";
import Loader from "@/components/Loader/index.js";
import SearchBox from "./misc/SearchBox";

const PlantSearch = () => {
    return (
        <>
            <div
                className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
                id="inbiota"
            >
                <div className="flex pt-8">
                    <div className="w-full min-h-screen-75 px-0 sm:px-16 z-10">
                        <SearchBox />
                    </div>
                </div>
                <div
                    className="absolute -top-72 left-0 bottom-0 w-2/5 sm:w-[45%] bg-no-repeat bg-right bg-mobile-size"
                    style={{ backgroundImage: `url('/assets/molecules.svg')` }}
                ></div>
                <div
                    className="absolute top-0 right-0 sm:right-32 bottom-[10rem] w-2/5 sm:w-w-[45%] bg-no-repeat bg-bottom"
                    style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "230px 230px" }}
                ></div>
                <div
                    className="absolute top-0 left-32 bottom-0 w-2/5 sm:w-w-[45%] bg-no-repeat bg-bottom"
                    style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "230px 230px" }}
                ></div>
            </div>
        </>
    );
};

export default PlantSearch;

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "../../Layout/ScrollAnimationWrapper";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ButtonPrimary from "../ButtonPrimary";
import DapilDropdown from "@/components/Dropdowns/DapilDropdown";
import PartaiDropdown from "@/components/Dropdowns/PartaiDropdown";
import CalegDropdown from "@/components/Dropdowns/CalegDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getFindUser, selectCaleg } from "@/redux/search";
import { useRouter } from "next/navigation";

const SearchBox = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const store = useSelector((state) => state.search);

    const scrollAnimation = useMemo(() => getScrollAnimation(), []);

    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: store?.selectedCaleg,
            dapil: store?.selectedDapil?.id,
            partai: store?.selectedPartai?.id
        }
        // console.log("ini submit search", data)
        dispatch(getFindUser(data))
        router.push('/list-caleg/search')
    }

    return (
        <div className="max-w-screen-xl mt-28 sm:mt-32 px-4 sm:px-8 xl:px-16 mx-auto">
            <div className="relative w-full flex flex-col sm:flex-row bg-white-500 rounded-lg shadow-lg items-center pt-5 sm:pt-0">
                <ScrollAnimationWrapper
                    className="w-full sm:w-10/12 grid max-h-28 mb-12 sm:mb-0 sm:max-h-28 grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 sm:divide-x-2 divide-gray-100 z-10">
                    <motion.div
                        className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
                        custom={{ duration: 2 }}
                        variants={scrollAnimation}
                    >
                        <CalegDropdown />
                    </motion.div>
                    <motion.div
                        className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
                        custom={{ duration: 3 }}
                        variants={scrollAnimation}
                    >
                        <PartaiDropdown />
                    </motion.div>
                    <motion.div
                        className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
                        custom={{ duration: 3 }}
                        variants={scrollAnimation}
                    >
                        <DapilDropdown />
                    </motion.div>
                </ScrollAnimationWrapper>
                <div className="py-10 px-5 text-center w-full sm:w-2/12">
                    <ButtonPrimary type={"submit"} addClass={"py-3 lg:py-4 px-5 lg:px-7"} onClick={(e) => onSubmit(e)}>Cari</ButtonPrimary>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;

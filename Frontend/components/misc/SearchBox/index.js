import React, { useEffect, useMemo, useState } from "react";
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

import Select, { components, StylesConfig } from "react-select";
import { selectThemeColors } from "@/utils/index";
const SearchBox = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const store = useSelector((state) => state.search);
    const [listAtributeOrder, setListAtributeOrder] = useState([
        { value: "ASC", label: "ASC" },
        { value: "Synonym", label: "Synonym" },
        { value: "CAS Number", label: "CAS Number" },
        { value: "Chemical Formula", label: "Chemical Formula" },
    ]);
    const [atributeOrder, setAtributeOrder] = useState({
        value: "",
        label: "Choose Atribute Color"
    });
    const [listType, setListType] = useState([
        { value: "Plant", label: "Plant" },
        { value: "Bioactivity", label: "Bioactivity" },
        { value: "Phytochemical", label: "Phytochemical" },
    ]);
    const [type, setType] = useState({
        value: "",
        label: "Choose Type"
    });

    const scrollAnimation = useMemo(() => getScrollAnimation(), []);
    const DropdownComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center cursor-pointer">
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };
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

    // Custom styles for react-select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '', // Change background color of the control
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black', // Change the color of the selected option text
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#C78643' : 'white', // Selected option bg color
            color: state.isSelected ? 'white' : 'black', // Selected option text color
            '&:hover': {
                backgroundColor: '#F0F8CC', // Hover bg color
                color: 'black', // Hover text color
            },
        }),
    };

    return (
        // <div className="max-w-screen-xl mt-28 sm:mt-32 px-4 sm:px-8 xl:px-16 mx-auto">
        //     <div className="relative w-full flex flex-col sm:flex-row bg-white-500 rounded-lg shadow-lg items-center pt-5 sm:pt-0">
        //         <ScrollAnimationWrapper
        //             className="w-full sm:w-10/12 grid max-h-28 mb-12 sm:mb-0 sm:max-h-28 grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 sm:divide-x-2 divide-gray-100 z-10">
        //             <motion.div
        //                 className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
        //                 custom={{ duration: 2 }}
        //                 variants={scrollAnimation}
        //             >
        //                 <CalegDropdown />
        //             </motion.div>
        //             <motion.div
        //                 className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
        //                 custom={{ duration: 3 }}
        //                 variants={scrollAnimation}
        //             >
        //                 <PartaiDropdown />
        //             </motion.div>
        //             <motion.div
        //                 className="flex items-center h-6 self-center justify-center py-7 sm:py-6 w-full sm:w-auto mx-auto sm:mx-0"
        //                 custom={{ duration: 3 }}
        //                 variants={scrollAnimation}
        //             >
        //                 <DapilDropdown />
        //             </motion.div>
        //         </ScrollAnimationWrapper>
        //         <div className="py-10 px-5 text-center w-full sm:w-2/12">
        //             <ButtonPrimary type={"submit"} addClass={"py-3 lg:py-4 px-5 lg:px-7"} onClick={(e) => onSubmit(e)}>Cari</ButtonPrimary>
        //         </div>
        //     </div>
        // </div>
        <div className="flex flex-col items-center bg-white dark:bg-zinc-900">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-black-900 dark:text-white">Inbiota Search Engine</h1>
                <p className="text-black-600 text-xl dark:text-black-300">What are you looking for?</p>
            </div>
            <div className="dark:bg-zinc-800 p-4 px-0 sm:px-8 rounded-lg w-full max-w-5xl">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <div className="flex-1">
                        <label
                            htmlFor="search-by"
                            className="mb-3 block text-base sm:text-lg font-medium text-[#07074D]"
                        >
                            Search By
                        </label>
                        <Select
                            id="search-by"
                            className={"react-select bg-white-200"}
                            classNamePrefix="select"
                            // isClearable={false}
                            isSearchable={true}
                            options={listType}
                            styles={customStyles}
                            theme={selectThemeColors}
                            value={type}
                            onChange={(data) => setType(data)}
                            // components={{ Option: DropdownComponent }}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <label
                                htmlFor="attribute-order"
                                className="mb-3 block text-base sm:text-lg font-medium text-[#07074D]"
                            >
                                Attribute Order
                            </label>
                            <Select
                                id="attribute-order"
                                className={"react-select bg-white-200"}
                                classNamePrefix="select"
                                // isClearable={false}
                                isSearchable={true}
                                options={listAtributeOrder}
                                styles={customStyles}
                                theme={selectThemeColors}
                                value={atributeOrder}
                                onChange={(data) => setAtributeOrder(data)}
                                // components={{ Option: DropdownComponent }}
                            />
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Type your keyword here" className="block w-full bg-white dark:bg-zinc-700 border border-warning-400 dark:border-zinc-600 text-black-700 dark:text-black-300 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-zinc-700 focus:border-warning-500 dark:focus:border-warning-500" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="fill-current h-5 w-5 text-black-500 dark:text-black-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.242a1 1 0 01-1.414 1.415l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;

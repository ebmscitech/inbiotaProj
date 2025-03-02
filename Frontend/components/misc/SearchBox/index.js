import React, { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import ScrollAnimationWrapper from "../../Layout/ScrollAnimationWrapper";
// import getScrollAnimation from "../../../utils/getScrollAnimation";
import ButtonPrimary from "../ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import Select, { components, StylesConfig } from "react-select";
import { selectThemeColors } from "@/utils/index";
import { getSearch } from "@/api/index";
import PlantList from "@/components/PlantList";
import Pagination from "@/components/Pagination/Pagination";

const SearchBox = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const store = useSelector((state) => state.search);
    const [listAtributeOrder, setListAtributeOrder] = useState([]);
    const [atributeOrder, setAtributeOrder] = useState(null);
    const [listType, setListType] = useState([]);
    const [type, setType] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totals, setTotals] = useState(0);
    const [isDetail, setIsDetail] = useState(false);

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (!type || !atributeOrder || !keyword) {
            console.error("Please select a type, attribute order, and enter a keyword.");
            return;
        }

        try {
            const response = await getSearch(`/search?attribute=${atributeOrder.value}&search=${keyword === "" ? "0" : keyword}&orderBy=${type.value}&row=10&pageNo=${currentPage}`);
            const result = response.data;
            console.log("Search results:", result);
            setSearchResults(result); // Store the search results
            setTotals(result.totalCount)
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const fetchParameters = async (parameter) => {
        try {
            const response = await getSearch(`/parameter?parameter=${parameter}`);
            const result = response.data;
            console.log("ini res", response);
            if (result.status === 200) {
                const options = result.data.map(item => ({
                    value: item.id,
                    label: item.result
                }));
                if (parameter === "searchBy") {
                    setListType(options);
                } else {
                    setListAtributeOrder(options);
                }
            }
        } catch (error) {
            console.error("Error fetching search by options:", error);
        }
    };

    useEffect(() => {
        handleSearch(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchParameters("searchBy");
    }, []);

    useEffect(() => {
        if (type) {
            fetchParameters(type.label);
        }
    }, [type]);

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
        <>
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
                                placeholder="Choose Type"
                                isSearchable={true}
                                options={listType}
                                styles={customStyles}
                                theme={selectThemeColors}
                                value={type}
                                onChange={(data) => {
                                    setType(data),
                                        setSearchResults([]),
                                        setAtributeOrder(null),
                                        setKeyword(''),
                                        setCurrentPage(1)
                                }}
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
                                    placeholder="Choose Attribute"
                                    isSearchable={true}
                                    options={listAtributeOrder}
                                    styles={customStyles}
                                    theme={selectThemeColors}
                                    value={atributeOrder}
                                    onChange={(data) => { setAtributeOrder(data), setCurrentPage(1) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Type your keyword here"
                            className="block w-full bg-white dark:bg-zinc-700 border border-warning-400 dark:border-zinc-600 text-black-700 dark:text-black-300 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-zinc-700 focus:border-warning-500 dark:focus:border-warning-500"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSearch}>
                            <svg className="fill-current h-5 w-5 text-black-500 dark:text-black-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.242a1 1 0 01-1.414 1.415l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            {searchResults?.data?.length > 0 && type &&
                <div className="p-4 sm:px-8">
                    <PlantList
                        searchResults={searchResults}
                        type={type}
                        attribute={atributeOrder}
                        keyword={keyword}
                        setIsDetail={setIsDetail}
                    />
                    {!isDetail &&
                        <div className="flex place-content-center py-5">
                            <Pagination
                                totalPages={Math.ceil(totals / rowsPerPage)}
                                page={currentPage}
                                onNumberClick={setCurrentPage}
                                totalDocs={totals}
                            />
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default SearchBox;

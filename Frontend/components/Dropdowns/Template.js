import React, { useState } from "react";

const DapilDropdown = () => {
    const [sortType, setSortType] = useState('Sort by');
    const [openSort, setOpenSort] = useState(false);

    const handleSortTypeChange = (newSortType) => {
        setSortType(newSortType);
        setOpenSort(false);
    };

    return (
        <div className="w-full h-screen  flex justify-center items-center">
            <div className="w-full flex justify-center">
                <div onClick={() => setOpenSort(!openSort)} className="relative" style={{ position: 'elative' }} >
                    <button className="flex text-white bg-secondary-300 items-center justify-start w-40 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg"
                        style={{ position: 'elative' }} >
                        <span>{sortType}</span>
                        <svg fill="currentColor" viewBox="0 0 20 20" className={`w-4 h-4 transition-transform duration-200 transform ${openSort ? 'rotate-180' : 'rotate-0'}`} >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {openSort && (
                        <div className="absolute z-50 w-full origin-top-right" style={{ position: 'absolute', top: '100%', right: 0 }} >
                            <div className="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg dark-mode:bg-gray-700" style={{ position: 'elative' }} >
                                <div className="flex flex-col">
                                    <a onClick={() => handleSortTypeChange('Most disscussed')} className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200"
                                        href="#" style={{ position: 'elative' }} >
                                        <div className="">
                                            <p className="font-semibold">Most disscussed</p>
                                        </div>
                                    </a>
                                    <a onClick={() => handleSortTypeChange('Most popular')} className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200"
                                        href="#" style={{ position: 'elative' }} >
                                        <div className="">
                                            <p className="font-semibold">Most popular</p>
                                        </div>
                                    </a>
                                    <a onClick={() => handleSortTypeChange('Most upvoted')} className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200"
                                        href="#" style={{ position: 'elative' }} >
                                        <div className="">
                                            <p className="font-semibold">Most upvoted</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default DapilDropdown;
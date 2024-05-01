import { selectCaleg } from "@/redux/search";
import { isObjEmpty } from "@/utils/index";
import { Search20Filled } from "@fluentui/react-icons";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const CalegDropdown = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.global);
    const selectedCaleg = useSelector((state) => state.search.selectedCaleg);

    const [caleg, setCaleg] = useState("");
    const [listCaleg, setListCaleg] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownButtonRef = useRef(null);
    const dropdownMenuRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = (e) => {
        if (!dropdownButtonRef.current.contains(e.target) && !dropdownMenuRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleSetCaleg = (item) => {
        setCaleg(item.full_name);
        dispatch(selectCaleg(item.full_name))
        // console.log("ini selected caleg", item)
        setIsDropdownOpen(false);
    };

    const handleSearch = (event) => {
        setCaleg(event.target.value);
        dispatch(selectCaleg(""))
    };

    useEffect(() => {
        if (!isObjEmpty(store?.listCaleg)) {
            // console.log("ini list caleg", store?.listCaleg)
            var temp = store?.listCaleg
            setListCaleg(temp.docs)
        }
    }, [store?.listCaleg])

    const filteredSort = listCaleg.filter(item => item.full_name.toLowerCase().includes(caleg.toLowerCase()));

    useEffect(() => {
        window.addEventListener('click', closeDropdown);
        return () => {
            window.removeEventListener('click', closeDropdown);
        };
    }, []);

    useEffect(() => {
        if (selectedCaleg !== "") {
            // console.log("ini masih ada caleg", selectedCaleg)
            var temp = selectedCaleg
            setCaleg(temp)
        }else{
            // console.log("ini tidak ada caleg", selectedCaleg)
            setCaleg("")
        }
    }, [selectedCaleg])

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center">
                <div className="relative" >
                    <div ref={dropdownButtonRef} onClick={() => toggleDropdown()} className="flex mx-auto w-auto ">
                        <div className="flex border-b-[1px] items-center p-2">
                            <Search20Filled className="mr-2" />
                            <input type="text" placeholder="Cari Nama Caleg"
                                value={caleg}
                                className=" focus:outline-none text-gray-700"
                                onChange={(event) => handleSearch(event)}
                            />
                        </div>
                    </div>
                    <div ref={dropdownMenuRef} className={`absolute z-50 w-full origin-top-right ${isDropdownOpen ? '' : 'hidden'}`} style={{ position: 'absolute', top: '100%', right: 0 }} >
                        <div className="px-2 pt-2 pb-2 bg-w-50 rounded-md shadow-lg max-h-64 min-h-max dark-mode:bg-w-50" style={{ position: 'relative', overflowY: 'auto' }} >
                            <div className="flex flex-col">
                                {filteredSort.map((item, index) => {
                                    return (
                                        <a key={index} onClick={() => handleSetCaleg(item)} className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-secondary-200"
                                            href="#" style={{ position: 'elative' }} >
                                            <div className="">
                                                <p className="font-semibold">{item.full_name}</p>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalegDropdown;

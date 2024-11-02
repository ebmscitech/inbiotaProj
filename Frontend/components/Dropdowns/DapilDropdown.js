import { selectDapil } from "@/redux/search";
import { isObjEmpty } from "@/utils/index";
import { Location20Filled } from "@fluentui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DapilDropdown = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.global);
    const selectedDapil = useSelector((state) => state.search.selectedDapil);

    const [dapil, setDapil] = useState("");
    const [listDapil, setListDapil] = useState([]);
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
    
    const handleSetDapil = (item) => {
        setDapil(item.name);
        dispatch(selectDapil({ id: item._id, name: item.name}))
        // console.log("ini selected dapil", item)
        setIsDropdownOpen(false);
    };

    const handleSearch = (event) => {
        setDapil(event.target.value);
        dispatch(selectDapil(""))
    };

    useEffect(() => {
        if (!isObjEmpty(store?.listDapil)) {
            // console.log("ini list Dapil", store?.listDapil)
            setListDapil(store?.listDapil)
        }
    }, [store?.listDapil])

    const filteredSort = listDapil.filter(item => item.name.toLowerCase().includes(dapil.toLowerCase()));

    useEffect(() => {
        window.addEventListener('click', closeDropdown);
        return () => {
            window.removeEventListener('click', closeDropdown);
        };
    }, []);

    useEffect(() => {
        if (!isObjEmpty(selectedDapil)) {
            // console.log("ini masih ada dapil", selectedDapil)
            var temp = selectedDapil.name
            setDapil(temp)
        }
    }, [selectedDapil])

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center">
                <div className="relative" >
                    <div ref={dropdownButtonRef} onClick={() => toggleDropdown()} className="flex mx-auto w-auto ">
                        <div className="flex border-b-[1px] items-center p-2">
                            <Location20Filled className="mr-2" />
                            <input type="text" placeholder="Cari Nama dapil"
                                value={dapil}
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
                                        <a key={index} onClick={() => handleSetDapil(item)} className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-secondary-200"
                                            href="#" style={{ position: 'elative' }} >
                                            <div className="">
                                                <p className="font-semibold">{item.name}</p>
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

export default DapilDropdown;

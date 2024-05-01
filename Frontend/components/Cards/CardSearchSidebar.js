import React, { useEffect, useState } from "react";
// import ButtonPrimary from "../misc/ButtonPrimary";
// import ButtonSecondary from "../misc/ButtonSecondary";
// import { useRouter } from "next/navigation";
import { isObjEmpty } from "@/utils/index";
import { useDispatch, useSelector } from "react-redux";
import { selectDapil, selectPartai } from "@/redux/search";

// components

export default function CardSearchSidebar() {
    // const router = useRouter()
    const dispatch = useDispatch();
    const store = useSelector((state) => state.global);
    const selectedDapil = useSelector((state) => state.search.selectedDapil);
    const selectedPartai = useSelector((state) => state.search.selectedPartai);
    const [listPartai, setListPartai] = useState([])
    const [partai, setPartai] = useState("")
    const [listDapil, setListDapil] = useState([])
    const [dapil, setDapil] = useState("")

    const handleSetPartai = (item) => {
        setPartai(item.name);
        dispatch(selectPartai({ id: item._id, name: item.name }))
    };

    const handleSetDapil = (item) => {
        setDapil(item.name);
        dispatch(selectDapil({ id: item._id, name: item.name}))
    };

    useEffect(() => {
        if (!isObjEmpty(store?.listPartai)) {
            setListPartai(store?.listPartai)
        }
    }, [store?.listPartai])

    useEffect(() => {
        if (!isObjEmpty(store?.listDapil)) {
            setListDapil(store?.listDapil)
        }
    }, [store?.listDapil])

      useEffect(() => {
        if (!isObjEmpty(selectedDapil)) {
            var temp = selectedDapil.name
            setDapil(temp)
        }
    }, [selectedDapil])

    useEffect(() => {
        if (!isObjEmpty(selectedPartai)) {
            var temp = selectedPartai.name
            setPartai(temp)
        }
    }, [selectedPartai])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full px-1">
                        <div className="p-5">
                            <div className="mb-7">
                                <h1 className="text-xl font-semibold mt-3 mb-5">
                                    Partai
                                </h1>
                                <div className="max-h-64 overflow-y-auto">
                                    {listPartai.map((item, index) => {
                                        return (
                                            <div key={index} className="pb-2">
                                                <label className="flex items-center cursor-pointer">
                                                    <div className="mr-2 mt-1">
                                                        <input
                                                            id="partai-radio"
                                                            type="radio"
                                                            checked={partai === item.name}
                                                            className="border-0 rounded text-primary-500 w-5 h-5 ease-linear transition-all duration-150"
                                                            onChange={() => handleSetPartai(item)}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-neutral-400">
                                                        {item.name}
                                                    </span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="mb-3">
                                <h1 className="text-xl font-semibold mt-3 mb-5">
                                    Dapil
                                </h1>
                                <div className="max-h-64 overflow-y-auto">
                                    {listDapil.map((item, index) => {
                                        return (
                                            <div key={index} className="pb-2">
                                                <label className="flex items-center cursor-pointer">
                                                    <div className="mr-2 mt-1">
                                                        <input
                                                            id="dapil-radio"
                                                            type="radio"
                                                            checked={dapil === item.name}
                                                            className="border-0 rounded text-primary-500 w-5 h-5 ease-linear transition-all duration-150"
                                                            onChange={() => handleSetDapil(item)}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-neutral-400">
                                                        {item.name}
                                                    </span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPhoto } from "@/api/index.js";
import { useDropzone } from 'react-dropzone';
import Input from "../Fields/Input";
import { Add20Filled, Delete20Filled } from "@fluentui/react-icons";
import { useDispatch } from "react-redux";
import { setDataLembaga } from "@/redux/profile";

function Lembaga({ data }) {
    const dispatch = useDispatch()
    const [lembaga, setLembaga] = useState("");

    const handleSetLembaga = (name) => {
        setLembaga(name)
        dispatch(setDataLembaga(name))
    };

    useEffect(() => {
        if (data) {
            var tempLembaga = data?.lembaga;
            // console.log("ini temp cover", tempCover)
            setLembaga(tempLembaga)
            dispatch(setDataLembaga(tempLembaga))
        }
    }, [data]);

    return (
        <div className="mb-5 px-3">
            <label
                htmlFor="dapil"
                className="mb-3 block text-base font-medium text-[#07074D]"
            >
                Lembaga
            </label>
            <div className="w-full grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-4 justify-items-start items-center">
                <div className="grid justify-items-center" >
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPR"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => handleSetLembaga("DPR")}
                            />
                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPR
                            </span>
                        </label>
                    </div>
                </div>
                <div className="grid justify-items-center" >
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPD"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => handleSetLembaga("DPD")}
                            />
                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPD
                            </span>
                        </label>
                    </div>
                </div>
                <div className="grid justify-items-center" >
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPRD Provinsi"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => handleSetLembaga("DPRD Provinsi")}
                            />
                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPRD Provinsi
                            </span>
                        </label>
                    </div>
                </div>
                <div className="grid justify-items-center" >
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPRD Kota / Kabupaten"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => handleSetLembaga("DPRD Kota / Kabupaten")}
                            />
                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPRD Kota / Kabupaten
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

Lembaga.propTypes = {
    dataCaleg: PropTypes.object,
};

export default Lembaga;

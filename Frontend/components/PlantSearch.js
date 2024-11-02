import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { isObjEmpty, selectThemeColors } from "../utils";
import Select, { components, StylesConfig } from "react-select";
import { getListDapil } from "@/redux/global";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/Fields/Input.js";
import { Form, Formik } from "formik";
import { AspirasiSchema } from "../validation";
import { postByPath } from "../api";
import toastAlert from "@/utils/alert";
import Loader from "@/components/Loader/index.js";
import { setDataDevelopment, setDataDevelopmentLainnya } from "@/redux/aspirasi";
import * as fbq from '@/lib/fpixel'
import SearchBox from "./misc/SearchBox";
import PlantTable from "./PlantTable";

const PlantSearch = () => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.global);
    const dataDevelopment = useSelector((state) => state.aspirasi.dataDevelopment);
    const dataDevelopmentLainnya = useSelector((state) => state.aspirasi.dataDevelopmentLainnya);

    const [listDapil, setListDapil] = useState([]);
    const [dapil, setDapil] = useState({
        value: "",
        label: "Pilih Dapil"
    });
    const [expectation, setExpectation] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const DropdownComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center cursor-pointer">
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };

    function handleClearFields() {
        setDapil({
            value: "",
            label: "Pilih Dapil"
        })
        setExpectation("")
        dispatch(setDataDevelopment([]));
        dispatch(setDataDevelopmentLainnya(""));
    }

    const handlePixel = () => {
        // fbq.event('AddToCart', {
        //     content_name: `Aspirasi Rakyat`,
        //     content_category: 'Aspirasi > Aspirasi Rakyat',
        //     content_type: 'dapil',
        //     value: 1,
        // })
    }

    useEffect(() => {
        if (!isObjEmpty(store?.listDapil)) {
            console.log("ini list Dapil register", store?.listDapil)
            var tempList = store?.listDapil
            const temp = tempList.map((v, index) => {
                return {
                    label: v.name,
                    value: v._id
                }
            });
            setListDapil(temp)
        } else {
            dispatch(getListDapil())
        }
    }, [store?.listDapil])

    const onSubmit = async (values, actions) => {
        let data = {
            expectation: expectation,
            type: "dapil", //dapil atau caleg
            type_id: dapil.value, //dapil id atau caleg id
            pembangunan: dataDevelopment,
            etc: {
                lainnya: dataDevelopmentLainnya,
            }
        }
        let validatedData = {
            ...data,
            ...values,
        };
        // console.log("udah di validasi", validatedData)
        const containsLainnya = dataDevelopment.includes("Lainnya");
        // console.log("udah di validasi", containsLainnya)
        if ((containsLainnya && dataDevelopmentLainnya === "")) {
            return toastAlert(
                "warning",
                "Mohon untuk melengkapi dokumen Lainnya terlebih dahulu !"
            );
        }
        if (
            dapil.value !== "" &&
            expectation !== ""
        ) {
            console.log("udah di validasi", validatedData)
            setIsLoading(true);

            postByPath(validatedData, '/aspiration').then((res) => {
                setIsLoading(false)
                console.log("ini post aspirasi", res)
                toastAlert("success", "Berhasil mengirim aspirasi !")
                handleClearFields()
                handlePixel()
                actions.resetForm({
                    values: {
                        name: "",
                        nomor_hp: "",
                        email: "",
                        nik: "",
                    },
                });
            })
                .catch((err) => {
                    setIsLoading(false)
                    console.log(err)
                    if (err.code === "ERR_BAD_REQUEST") {
                        toastAlert("error", err.response.data.message)
                    }
                    console.error(err)
                })
        } else {
            toastAlert(
                "warning",
                "Mohon untuk melengkapi dokumen terlebih dahulu !"
            );
        }
    };

    return (
        <>
            <div
                className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
                id="inbiota"
            >
                <div className="flex pt-8">
                    <div className="w-full px-0 sm:px-16 z-10">
                        <SearchBox />
                        <PlantTable />
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

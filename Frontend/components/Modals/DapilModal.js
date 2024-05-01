import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../misc/ButtonPrimary";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { setIsAspirasiModal } from "@/redux/aspirasi";
import { postByPath } from "@/api/index";
import { DapilSchema } from "@/validation/index";
import toastAlert from "@/utils/alert";
import Loader from "@/components/Loader/index.js";
import { setDataDevelopment } from "@/redux/aspirasi";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import CardDevelopment from "@/components/Cards/CardDevelopment.js";
import { getDistricts, getSubDistricts, setIsDapilModal } from "@/redux/dapil";
import { isObjEmpty, selectThemeColors } from "@/utils/index";
import Select, { components, StylesConfig } from "react-select";
import { noValue } from "@/utils/validateInput";


export default function DapilModal() {
    const dispatch = useDispatch();
    const router = useRouter()
    const store = useSelector((state) => state.dapil);
    // const dataDevelopment = useSelector((state) => state.aspirasi.dataDevelopment);

    // const [expectation, setExpectation] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [lembaga, setLembaga] = useState("");

    const [listProvinces, setListProvinces] = useState([]);
    const [province, setProvince] = useState({
        value: "",
        label: "Pilih Provinsi"
    });
    const [listDistricts, setListDistricts] = useState([]);
    const [district, setdistrict] = useState([]);
    const [listSubDistricts, setListSubDistricts] = useState([]);
    const [subDistrict, setSubDistrict] = useState([]);
    const [selectedAreaCodes, setSelectedAreaCodes] = useState([]);

    const DropdownComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center cursor-pointer">
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };

    async function getDataDistricts(id) {
        // setIsLoading(true);
        await dispatch(getDistricts(id)).then((res) => {
            // setIsLoading(false);
            var temp = res.payload.data || null
            var tempList = temp.regencies
            const tempData = tempList.map((v) => {
                return {
                    label: v.name,
                    value: v.id
                }
            });
            setListDistricts(tempData)
            console.log("ini get list district", temp)
        })
            .catch((err) => {
                // setIsLoading(false);
                toastAlert("error", "Proses mendapatkan data kab / kota sedang gangguan");
                console.error(err);
            });
    }

    async function getDataSubDistricts(id) {
        // setIsLoading(true);
        await dispatch(getSubDistricts(id)).then((res) => {
            // setIsLoading(false);
            var temp = res.payload.data || null
            var tempList = temp.districts
            const tempData = tempList.map((v) => {
                return {
                    label: v.name,
                    value: v.id
                }
            });
            setListSubDistricts(tempData)
            console.log("ini get list sub district", temp)
        })
            .catch((err) => {
                // setIsLoading(false);
                toastAlert("error", "Proses mendapatkan data kecamatan sedang gangguan");
                console.error(err);
            });
    }

    useEffect(() => {
        if (!noValue(store?.dataProvinces)) {
            console.log("ini list Provinces", store?.dataProvinces)
            var tempList = store?.dataProvinces
            const temp = tempList.map((v) => {
                return {
                    label: v.name,
                    value: v.id
                }
            });
            setListProvinces(temp)
        }
    }, [store?.dataProvinces])

    useEffect(() => {
        if (!noValue(lembaga)) {
            if (lembaga === "DPRD Kota / Kabupaten") {
                setdistrict([])
            }
        }
    }, [lembaga])

    useEffect(() => {
        if (!noValue(province.value)) {
            getDataDistricts(province.value)
        }
    }, [province])

    useEffect(() => {
        if (!noValue(district.value)) {
            getDataSubDistricts(district.value)
        }
        console.log("ini districts", district)
    }, [district])

    useEffect(() => {
        if (lembaga === "DPRD Kota / Kabupaten") {
            console.log("ini DPRD Kota / Kabupaten", district)
            if (!noValue(subDistrict)) {
                if (Array.isArray(subDistrict)) {
                    const temp = [...subDistrict]
                    const subDistrictArray = temp.map(item => item.value);
                    const districtValue = district.value;
                    const valuesArray = [districtValue, ...subDistrictArray]
                    setSelectedAreaCodes(valuesArray)
                    console.log(valuesArray);
                    console.log("ini districts", district)
                    console.log("ini subdistricts", subDistrict)
                } else {
                    console.log("subdistricts is not an array");
                }
            }
        } else {
            if (!noValue(district)) {
                if (Array.isArray(district)) {
                    const temp = [...district]
                    const valuesArray = temp.map(item => item.value);
                    setSelectedAreaCodes(valuesArray)
                    console.log(valuesArray);
                    console.log("ini districts", district)
                } else {
                    console.log("district is not an array");
                }
            }
        }
    }, [district, subDistrict])

    const handleClose = () => {
        dispatch(setIsDapilModal(false))
        // setExpectation("")
        // dispatch(setDataDevelopment([]));
        setProvince({
            value: "",
            label: "Pilih Provinsi"
        })
        setdistrict([])
        setSubDistrict([])
        setLembaga("")
        // router.push('/')
    }

    const onSubmit = async (values, actions) => {
        let data = {
            province_code: province.value,
            area_code: selectedAreaCodes,
            type: lembaga // "DPR" atau "DPD" atau "DPRD Provinsi" atau "DPRD Kota / Kabupaten"
        }

        let validatedData = {
            ...data,
            ...values,
        };
        // console.log("udah di validasi", validatedData)
        if (
            province.value !== "" &&
            selectedAreaCodes.length !== 0 &&
            lembaga !== ""
        ) {
            console.log("udah di validasi", validatedData)
            setIsLoading(true);

            postByPath(validatedData, '/dapil').then((res) => {
                setIsLoading(false)
                console.log("ini post dapil", res)
                toastAlert("success", "Berhasil membuat dapil !")
                handleClose()
                actions.resetForm({
                    values: {
                        name: "",
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
            {store.isDapilModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-0 sm:my-6 mx-auto max-w-3xl ">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-w-50 min-h-max outline-none focus:outline-none">
                                <div className="flex flex-row items-center text-w-50 bg-primary-500 justify-between p-5 border-b border-solid border-neutral-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Tambah Dapil
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => handleClose()}
                                    >
                                        <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6">
                                    <div className="grid place-items-center">
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{
                                                name: "",
                                                jumlah_kursi: 0,
                                            }}
                                            validationSchema={DapilSchema}
                                            onSubmit={onSubmit}
                                        >
                                            {({ isSubmitting, values }) => (
                                                <Form className="w-full pt-5 sm:pt-5">
                                                    <div className="-mx-3 flex flex-wrap">
                                                        <div className="w-full px-3 sm:w-1/2">
                                                            <div className="mb-5">
                                                                <Input
                                                                    label={"Nama"}
                                                                    name="name"
                                                                    type="text"
                                                                    placeholder="Masukkan Nama Dapil"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full px-3 sm:w-1/2">
                                                            <div className="mb-5">
                                                                <Input
                                                                    label={"Jumlah Kursi"}
                                                                    name="jumlah_kursi"
                                                                    type="text"
                                                                    placeholder="Masukkan Jumlah Kursi"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="-mx-3 flex flex-wrap">
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
                                                                                onChange={() => setLembaga("DPR")}
                                                                            />
                                                                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                                                                DPR
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="grid justify-items-center" >
                                                                    <div>
                                                                        <label className="inline-flex items-center cursor-pointer">
                                                                            <input
                                                                                id="lembaga-radio"
                                                                                type="radio"
                                                                                checked={lembaga === "DPD"}
                                                                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                                                onChange={() => setLembaga("DPD")}
                                                                            />
                                                                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                                                                DPD
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div> */}
                                                                <div className="grid justify-items-center" >
                                                                    <div>
                                                                        <label className="inline-flex items-center cursor-pointer">
                                                                            <input
                                                                                id="lembaga-radio"
                                                                                type="radio"
                                                                                checked={lembaga === "DPRD Provinsi"}
                                                                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                                                onChange={() => setLembaga("DPRD Provinsi")}
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
                                                                                onChange={() => setLembaga("DPRD Kota / Kabupaten")}
                                                                            />
                                                                            <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                                                                DPRD Kota / Kabupaten
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="-mx-3 flex flex-wrap">
                                                        <div className="w-full px-3 sm:w-1/2">
                                                            <div className="mb-5">
                                                                <label
                                                                    htmlFor="dapil"
                                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                                >
                                                                    Provinsi
                                                                </label>
                                                                <Select
                                                                    id="province-select"
                                                                    className={"react-select"}
                                                                    classNamePrefix="select"
                                                                    // isClearable={false}
                                                                    isSearchable={true}
                                                                    options={listProvinces}
                                                                    // styles={colourStyles}
                                                                    theme={selectThemeColors}
                                                                    value={province}
                                                                    onChange={(data) => setProvince(data)}
                                                                    components={{ Option: DropdownComponent }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full px-3 sm:w-1/2">
                                                            <div className="mb-5">
                                                                <label
                                                                    htmlFor="dapil"
                                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                                >
                                                                    Kota / Kabupaten
                                                                </label>
                                                                <Select
                                                                    id="district-select"
                                                                    // className={"react-select"}
                                                                    isMulti={lembaga === "DPRD Kota / Kabupaten" ? false : true}
                                                                    className="basic-multi-select"
                                                                    classNamePrefix="select"
                                                                    // isClearable={false}
                                                                    isSearchable={true}
                                                                    options={listDistricts}
                                                                    theme={selectThemeColors}
                                                                    value={district}
                                                                    onChange={(data) => setdistrict(data)}
                                                                    components={{ Option: DropdownComponent }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`-mx-3 flex flex-wrap ${lembaga === "DPRD Kota / Kabupaten" ? "" : "hidden"}`}>
                                                        <div className="w-full px-3 sm:w-1/2">
                                                            <div className="mb-5">
                                                                <label
                                                                    htmlFor="dapil"
                                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                                >
                                                                    Kecamatan
                                                                </label>
                                                                <Select
                                                                    id="province-select"
                                                                    isMulti
                                                                    className={"basic-multi-select"}
                                                                    classNamePrefix="select"
                                                                    // isClearable={false}
                                                                    isSearchable={true}
                                                                    options={listSubDistricts}
                                                                    theme={selectThemeColors}
                                                                    value={subDistrict}
                                                                    onChange={(data) => setSubDistrict(data)}
                                                                    components={{ Option: DropdownComponent }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row-reverse my-5">
                                                        {!isLoading ? (
                                                            <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                                                Buat Dapil
                                                            </ButtonPrimary>
                                                        ) : (
                                                            <Loader
                                                                isbutton={true}
                                                                className="flex items-center py-3 lg:py-4 px-5 lg:px-7"
                                                                buttontext="Sending In..."
                                                            />
                                                        )}
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black-600"></div>
                </>
            ) : null}
        </>
    );
}

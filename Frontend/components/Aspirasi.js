import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { isObjEmpty, selectThemeColors } from "../utils";
import Select, { components, StylesConfig } from "react-select";
import PrismaOne from "../public/assets/prisma-1.svg"
import PrismaTwo from "../public/assets/prisma-2.svg"
import CardDevelopment from "./Cards/CardDevelopment";
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

const Aspirasi = () => {
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
        fbq.event('AddToCart', {
            content_name: `Aspirasi Rakyat`,
            content_category: 'Aspirasi > Aspirasi Rakyat',
            content_type: 'dapil',
            value: 1,
        })
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
                id="aspirasi-rakyat"
            >
                <div className="flex pt-8">
                    <div className="w-1/3 hidden sm:grid sm:min-h-[90vh] bg-primary-500">
                        <div className="px-4">
                            <Image
                                src="/assets/photo-1-full.png"
                                alt="Form Aspirasi"
                                className="py-14"
                                quality={100}
                                width={571}
                                height={114}
                                layout="responsive"
                            />
                            <div className="text-w-50 font-bold text-3xl">
                                Ungkapkan apa yang anda inginkan
                            </div>
                            <div className="pt-5 text-w-50 font-bold leading-relaxed">
                                Masyarakat dapat menyampaikan aspirasi secara langsung kepada kader partai yang dipilihnya
                            </div>
                        </div>
                        <div className="pt-40">
                            <PrismaOne />
                        </div>
                        <div className="pt-4 pb-8 flex flex-row-reverse">
                            <PrismaTwo />
                        </div>
                    </div>
                    <div className="w-full sm:w-2/3 px-0 sm:px-16">
                        <div className="flex justify-center pt-5 sm:pt-10">
                            <Image
                                src="/assets/form-header.svg"
                                alt="Form Aspirasi Header"
                                quality={100}
                                width={571}
                                height={114}
                                layout="responsive"
                            />
                        </div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                name: "",
                                nomor_hp: "",
                                email: "",
                                nik: "",
                            }}
                            validationSchema={AspirasiSchema}
                            onSubmit={onSubmit}
                        >
                            {({ isSubmitting, values }) => (
                                <Form className="w-full pt-5 sm:pt-11">
                                    <div className="-mx-3 flex flex-wrap">
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <Input
                                                    label={"Nama"}
                                                    name="name"
                                                    type="text"
                                                    placeholder="Masukkan Nama "
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <Input
                                                    label={"Nomor Handphone"}
                                                    name="nomor_hp"
                                                    type="text"
                                                    placeholder="Masukkan Nomor Handphone "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="-mx-3 flex flex-wrap">
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <Input
                                                    label={"NIK"}
                                                    name="nik"
                                                    type="text"
                                                    placeholder="Masukkan NIK (Optional) "
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <Input
                                                    label={"Email"}
                                                    name="email"
                                                    type="email"
                                                    placeholder="Masukkan Email (Optional)"
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="-mx-3 flex flex-wrap">
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <label
                                                    htmlFor="dapil"
                                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                                >
                                                    Dapil
                                                </label>
                                                {/* <DapilDropdown/> */}
                                                <Select
                                                    id="dapil-select"
                                                    className={"react-select"}
                                                    classNamePrefix="select"
                                                    // isClearable={false}
                                                    isSearchable={true}
                                                    options={listDapil}
                                                    // styles={colourStyles}
                                                    theme={selectThemeColors}
                                                    value={dapil}
                                                    onChange={(data) => setDapil(data)}
                                                    components={{ Option: DropdownComponent }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <textarea
                                            id="expectation"
                                            rows="4"
                                            value={expectation}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            onChange={(e) => setExpectation(e.target.value)}
                                            placeholder="Apa yang kamu harapkan dari calon pemimpin berikutnya">
                                        </textarea>
                                    </div>
                                    <div className="mb-5">
                                        <CardDevelopment />
                                    </div>
                                    <div className="flex flex-row-reverse mb-5">
                                        {!isLoading ? (
                                            <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                                Submit Aspirasi
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
        </>
    );
};

export default Aspirasi;

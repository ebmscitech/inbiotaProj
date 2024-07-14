import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../misc/ButtonPrimary";
// import Image from "next/image";
import { redirect, useRouter } from 'next/navigation'
import { setIsAspirasiModal } from "@/redux/aspirasi";
import { postByPath } from "@/api/index";
import { AspirasiSchema } from "@/validation/index";
import toastAlert from "@/utils/alert";
import Loader from "@/components/Loader/index.js";
import { setDataDevelopment } from "@/redux/aspirasi";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import CardDevelopment from "@/components/Cards/CardDevelopment.js";
import * as fbq from '@/lib/fpixel'
import MetaPixel from "../MetaPixel";
import { isObjEmpty } from "@/utils/index";
import { Modal, ModalBody, ModalHeader } from ".";

export default function AspirasiModal() {
    const dispatch = useDispatch();
    const router = useRouter()
    const store = useSelector((state) => state.aspirasi);
    const dataDevelopment = useSelector((state) => state.aspirasi.dataDevelopment);
    const [pixelData, setPixelData] = useState({})

    const [expectation, setExpectation] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        dispatch(setIsAspirasiModal(false))
        setExpectation("")
        dispatch(setDataDevelopment([]));
        // router.push('/')
    }

    const handlePixel = () => {
        // console.log("ini click pixel add to cart", pixelData)
        // fbq.event('AddToCart', {
        //     content_name: `Send Aspirasi to Caleg ${store?.selectedCaleg.name}`,
        //     content_category: 'Aspirasi > Detail Caleg > Modal Aspirasi',
        //     content_type: 'caleg',
        //     value: 1,
        // })
    }

    const onSubmit = async (values, actions) => {
        let data = {
            expectation: expectation,
            type: "caleg", //dapil atau caleg
            type_id: store?.selectedCaleg.id, //dapil id atau caleg id
            pembangunan: dataDevelopment,
            // etc:{
            //     partai:"Partai Golkar",
            // }
        }
        let validatedData = {
            ...data,
            ...values,
        };
        // console.log("udah di validasi", validatedData)
        if (
            expectation !== ""
        ) {
            // console.log("udah di validasi", validatedData)
            setIsLoading(true);

            postByPath(validatedData, '/aspiration').then((res) => {
                setIsLoading(false)
                // console.log("ini post aspirasi", res)
                toastAlert("success", "Berhasil mengirim aspirasi !")
                handleClose()
                handlePixel()
                actions.resetForm({
                    values: {
                        name: "",
                        nomor_hp: "",
                        email: "",
                        nik: "",
                    },
                });
                if (store?.selectedCaleg?.redirectLink !== "") {
                    window.location.href = store?.selectedCaleg?.redirectLink;
                }
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
    useEffect(() => {
        var tempPixelData = store?.selectedCaleg?.pixelData;

        if (tempPixelData?.length > 0) {
            const filteredPixelData = tempPixelData.filter((item) => item.action.value === 'Aspirasi');

            if (
                tempPixelData.some((item) => item.action.value === 'Detail') &&
                tempPixelData.some((item) => item.action.value === 'Aspirasi') &&
                tempPixelData[0].id !== tempPixelData[1].id
            ) {
                setPixelData(filteredPixelData[0]);
            } else {
                setPixelData([]);
            }
        }
    }, [store?.selectedCaleg?.pixelData]);

    const renderPixel = () => {
        if (!isObjEmpty(pixelData)) {
            return <MetaPixel pixelData={pixelData} dataCaleg={dataCaleg} />;
        }
        return null;
    };

    return (
        <>
            {renderPixel()}
            <Modal
                className="min-w-[400px]"
                open={store.isAspirasiModal}
                onClose={() => handleClose()}
            >
                <ModalHeader onClose={() => handleClose()}>
                    Sampaikan aspirasi
                </ModalHeader>
                <ModalBody>
                    <div className="relative p-6">
                        <div>
                            Kamu akan memberikan aspirasi untuk <span className="font-bold">{store?.selectedCaleg.name}</span>
                        </div>
                        <div className="grid place-items-center">
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
                                                                    placeholder="Masukkan Email (Optional) "
                                                                />
                                                            </div>
                                                        </div>
                                                    </div> */}
                                        <div className="mb-5">
                                            <textarea
                                                id="expectation"
                                                rows="4"
                                                value={expectation}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                onChange={(e) => setExpectation(e.target.value)}
                                                placeholder={`Sampaikan aspirasi, keluhan, harapan, dan masukkan untuk ${store?.selectedCaleg.name}`}>
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
                </ModalBody>
            </Modal>
        </>
    );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../misc/ButtonPrimary";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { postByPath } from "@/api/index";
import { PartaiSchema } from "@/validation/index";
import toastAlert from "@/utils/alert";
import Loader from "@/components/Loader/index.js";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import CardDevelopment from "@/components/Cards/CardDevelopment.js";
import { getDistricts, setIsDapilModal } from "@/redux/dapil";
import { isObjEmpty, selectThemeColors } from "@/utils/index";
import Select, { components, StylesConfig } from "react-select";
import { noValue } from "@/utils/validateInput";
import { setIsPartaiModal } from "@/redux/partai";


export default function PartaiModal() {
    const dispatch = useDispatch();
    const router = useRouter()
    const store = useSelector((state) => state.partai);
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        dispatch(setIsPartaiModal(false))
    }

    const onSubmit = async (values, actions) => {
        console.log("udah di validasi", values)
        setIsLoading(true);

        postByPath(values, '/partai').then((res) => {
            setIsLoading(false)
            console.log("ini post partai", res)
            toastAlert("success", "Berhasil membuat partai !")
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
    };

    return (
        <>
            {store.isPartaiModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-0 sm:my-6 mx-auto max-w-3xl min-w-full sm:min-w-[500px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-w-50 min-h-max outline-none focus:outline-none">
                                <div className="flex flex-row items-center text-w-50 bg-primary-500 justify-between p-5 border-b border-solid border-neutral-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Tambah Partai
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
                                            }}
                                            validationSchema={PartaiSchema}
                                            onSubmit={onSubmit}
                                        >
                                            {({ isSubmitting, values }) => (
                                                <Form className="w-full pt-5 sm:pt-5">
                                                    <div className="-mx-3 flex flex-wrap">
                                                        <div className="w-full px-3">
                                                            <div className="mb-5">
                                                                <Input
                                                                    label={"Nama"}
                                                                    name="name"
                                                                    type="text"
                                                                    placeholder="Masukkan Nama Partai"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row-reverse my-5">
                                                        {!isLoading ? (
                                                            <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                                                Buat Partai
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

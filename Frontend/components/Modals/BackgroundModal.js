import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from ".";
import { setIsBackgroundModal } from "@/redux/profile";
import { Form, Formik } from "formik";
import Input from "../Fields/Input";
import { BackgroundSchema } from "@/validation/index";
import { postByPath } from "@/api/index";
import ButtonPrimary from "../misc/ButtonPrimary";
import Loader from "../Loader";
import { getUsername } from "@/utils/storage";
import { getCaleg } from "@/redux/caleg";
import toastAlert from "@/utils/alert.js";

export default function BackgroundModal({ dataCaleg }) {
    const dispatch = useDispatch();
    const username = getUsername()
    const store = useSelector((state) => state.profile);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        dispatch(setIsBackgroundModal(false));
    }

    const onSubmit = async (values, actions) => {
        try {
            let data = {
                photos: [],
            }

            let validatedData = {
                ...data,
                ...values,
            };
            // console.log("udah di validasi", validatedData)
            setIsLoading(true);
            const res = await postByPath(validatedData, '/background'); // Assuming you have an API function for this
            if (res.status === 200) {
                let params = {
                    username: username
                }
                // dispatch(getCaleg(params))
                handleClose();
                setIsLoading(false);
                toastAlert("success", "Berhasil tambah latar belakang !")
            } else {
                setIsLoading(false);
                toastAlert("error", "Failed to create background");
            }
        } catch (error) {
            toastAlert("error", "Failed to create background");
            console.error(error);
        }
    };

    return (
        <>
            <Modal
                className="min-w-[550px]"
                open={store.isBackgroundModal}
                onClose={() => dispatch(setIsBackgroundModal(false))}
            >
                <ModalHeader onClose={() => dispatch(setIsBackgroundModal(false))}>
                    Tambah Data Latar Belakang
                </ModalHeader>
                <ModalBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: "",
                            account: dataCaleg?._id
                        }}
                        validationSchema={BackgroundSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, values }) => (
                            <Form className="w-full pt-5 sm:pt-6">
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3">
                                        <div className="mb-5">
                                            <Input
                                                label={"Prestasi"}
                                                name="name"
                                                type="text"
                                                placeholder="Masukkan Prestasi"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row-reverse">
                                    {!isLoading ? (
                                        <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                            Submit Prestasi
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
                </ModalBody>
            </Modal>
        </>
    );
}

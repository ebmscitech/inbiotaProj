import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from ".";
import { setIsOrganizationModal } from "@/redux/profile";
import { Form, Formik } from "formik";
import Input from "../Fields/Input";
import DatePicker from "../DatePicker";
import { OrganizationSchema } from "@/validation/index";
import { postByPath } from "@/api/index";
import moment from "moment";
import ButtonPrimary from "../misc/ButtonPrimary";
import Loader from "../Loader";
import { getUsername } from "@/utils/storage";
import { getCaleg } from "@/redux/caleg";
import toastAlert from "@/utils/alert.js";

export default function OrganizationModal({ dataCaleg }) {
    const dispatch = useDispatch();
    const username = getUsername()
    const store = useSelector((state) => state.profile);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        dispatch(setIsOrganizationModal(false));
    }

    const onSubmit = async (values, actions) => {
        try {
            let data = {
                account: dataCaleg?._id,
                start_date: moment(startDate).format('YYYY-MM-DD'),
                end_date: moment(endDate).format('YYYY-MM-DD')
            }

            let validatedData = {
                ...data,
                ...values,
            };
            // console.log("udah di validasi", validatedData)
            setIsLoading(true);
            const res = await postByPath(validatedData, '/organization-history'); // Assuming you have an API function for this
            if (res.status === 200) {
                let params = {
                    username: username
                }
                // dispatch(getCaleg(params))
                handleClose();
                setIsLoading(false);
                toastAlert("success", "Berhasil tambah organisasi !")
            } else {
                setIsLoading(false);
                toastAlert("error", "Failed to create organization");
            }
        } catch (error) {
            toastAlert("error", "Failed to create organization");
            console.error(error);
        }
    };

    return (
        <>
            <Modal
                className="min-w-[400px]"
                open={store.isOrganizationModal}
                onClose={() => dispatch(setIsOrganizationModal(false))}
            >
                <ModalHeader onClose={() => dispatch(setIsOrganizationModal(false))}>
                    Tambah Riwayat Organisasi
                </ModalHeader>
                <ModalBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: "",
                            position: "",
                            description: " ",
                        }}
                        validationSchema={OrganizationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, values }) => (
                            <Form className="w-full pt-5 sm:pt-6">
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <Input
                                                label={"Jabatan"}
                                                name="position"
                                                type="text"
                                                placeholder="Masukkan Jabatan"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <Input
                                                label={"Nama Organisasi"}
                                                name="name"
                                                type="text"
                                                placeholder="Masukkan Nama Organisasi"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="start_date"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Tanggal Mulai
                                            </label>
                                            <DatePicker
                                                selected={startDate}
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => setStartDate(date)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="end_date"
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Tanggal Akhir
                                            </label>
                                            <DatePicker
                                                selected={endDate}
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => setEndDate(date)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row-reverse">
                                    {!isLoading ? (
                                        <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                            Submit Organisasi
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from ".";
import { setIsEducationModal } from "@/redux/profile";
import { Form, Formik } from "formik";
import Input from "../Fields/Input";
import DatePicker from "../DatePicker";
import { EducationSchema, OrganizationSchema } from "@/validation/index";
import { postByPath } from "@/api/index";
import moment from "moment";
import ButtonPrimary from "../misc/ButtonPrimary";
import Loader from "../Loader";
import { getUsername } from "@/utils/storage";
import { getCaleg } from "@/redux/caleg";
import toastAlert from "@/utils/alert.js";

export default function EducationModal({ dataCaleg }) {
    const dispatch = useDispatch();
    const username = getUsername()
    const store = useSelector((state) => state.profile);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        dispatch(setIsEducationModal(false));
    }

    const onSubmit = async (values, actions) => {
        try {
            let data = {
                start_date: moment(startDate).format('YYYY-MM-DD'),
                graduation_date: moment(endDate).format('YYYY-MM-DD')
            }

            let validatedData = {
                ...data,
                ...values,
            };
            console.log("udah di validasi", validatedData)
            setIsLoading(true);
            const res = await postByPath(validatedData, '/education-history'); // Assuming you have an API function for this
            if (res.status === 200) {
                let params = {
                    username: username
                }
                // dispatch(getCaleg(params))
                handleClose();
                setIsLoading(false);
                toastAlert("success", "Berhasil tambah pendidikan !")
            } else {
                setIsLoading(false);
                toastAlert("error", "Failed to create education");
            }
        } catch (error) {
            toastAlert("error", "Failed to create education");
            console.error(error);
        }
    };

    return (
        <>
            <Modal
                className="min-w-[400px]"
                open={store.isEducationModal}
                onClose={() => dispatch(setIsEducationModal(false))}
            >
                <ModalHeader onClose={() => dispatch(setIsEducationModal(false))}>
                    Tambah Riwayat Pendidikan
                </ModalHeader>
                <ModalBody>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: "",
                            account: dataCaleg?._id
                        }}
                        validationSchema={EducationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, values }) => (
                            <Form className="w-full pt-5 sm:pt-6">
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3">
                                        <div className="mb-5">
                                            <Input
                                                label={"Pendidikan"}
                                                name="name"
                                                type="text"
                                                placeholder="Masukkan Pendidikan"
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
                                            Submit Pendidikan
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

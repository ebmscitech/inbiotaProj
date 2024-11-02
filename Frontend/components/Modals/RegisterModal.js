import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from ".";
import ButtonPrimary from "../misc/ButtonPrimary";
import { setIsRegisterModal } from "@/redux/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterModal({ dataCaleg }) {
    const dispatch = useDispatch();
    const router = useRouter()
    const store = useSelector((state) => state.auth);

    const handleClose = () => {
        dispatch(setIsRegisterModal(false))
        router.push('/')
    }

    return (
        <>
            <Modal
                className="min-w-[400px]"
                open={store.isRegisterModal}
                onClose={() => dispatch(setIsRegisterModal(false))}
            >
                <ModalHeader onClose={() => dispatch(setIsRegisterModal(false))}>
                </ModalHeader>
                <ModalBody>
                    <div className="relative p-6 grid place-items-center">
                        <div className="w-4/5">
                            <Image
                                src="/assets/welcome.svg"
                                alt="Aspirasi Illustrasi"
                                quality={100}
                                width={80}
                                height={300}
                                layout="responsive"
                            />
                        </div>
                        <div className="text-xl font-bold pt-8 text-center">
                            Terima kasih.
                        </div>
                        <div className="text-xl font-bold pb-8 text-center">
                            Admin akan segera menghubungi Anda
                        </div>
                        <div className="grid w-1/3 self-center">
                            <ButtonPrimary type="button" addClass={"py-3 lg:py-4 px-5 lg:px-7"} onClick={() => handleClose()}>
                                Oke
                            </ButtonPrimary>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

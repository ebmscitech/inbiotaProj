import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsConfirmationModal } from "@/redux/global";
import { Modal, ModalBody, ModalFooter, ModalHeader } from ".";

export default function ConfirmationModal({ callback, text }) {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.global);

    const handleClose = () => {
        dispatch(setIsConfirmationModal(false));
    }

    const handleConfirm = () => {
        if (callback && callback.onConfirm) {
            callback.onConfirm();
        }
        handleClose();
    }
    
    const handleCancel = () => {
        if (callback && callback.onClose) {
            callback.onClose();
        }
        handleClose();
    }

    return (
        <>
            <Modal
                className="min-w-[400px]"
                open={store.isConfirmationModal}
                onClose={() => dispatch(setIsConfirmationModal(false))}
            >
                <ModalHeader onClose={() => dispatch(setIsConfirmationModal(false))}>
                    Konfirmasi
                </ModalHeader>
                <ModalBody>
                    <div className="grid place-items-center">
                        <h4 className="text-xl font-semibold">
                            Apakah kamu yakin?
                        </h4>
                        <div className="text-center pt-10 pb-5">
                            <h4 className="text-lg font-medium">
                                {text}
                            </h4>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter onConfirm={() => handleConfirm()} onCancel={() => handleCancel()} />
            </Modal>
        </>
    );
}

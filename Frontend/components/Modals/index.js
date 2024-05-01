import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonPrimary from "../misc/ButtonPrimary";
import ButtonSecondary from "../misc/ButtonSecondary";
import { setIsConfirmationModal } from "@/redux/global";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Modal Header Component
const ModalHeader = ({ onClose, children }) => {
    return (
        <div className="flex flex-row items-center text-w-50 bg-primary-500 justify-between p-5 border-b border-solid border-neutral-200 rounded-t">
            <h3 className="text-xl font-semibold">
                {children}
                {/* Konfirmasi */}
            </h3>
            <button
                className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
            >
                <span className="flex items-center bg-transparent h-6 w-6 text-2xl outline-none focus:outline-none">
                    ×
                </span>
            </button>
        </div>
    );
};

// Modal Body Component
const ModalBody = ({ children }) => {
    return (
        <div className="relative p-6">
            {children}
            {/* <div className="grid place-items-center">
                <h4 className="text-xl font-semibold">Apakah kamu yakin?</h4>
                <div className="text-center py-10">
                    <h4 className="text-lg font-medium">{children}</h4>
                </div>
            </div> */}
        </div>
    );
};

// Modal Footer Component
const ModalFooter = ({ onConfirm, onCancel }) => {
    return (
        <div className="pb-6 grid w-1/2 self-center">
            <div className="pb-3 grid">
                <ButtonPrimary
                    type="button"
                    addClass={"py-3 lg:py-3 px-5 lg:px-7"}
                    onClick={onConfirm}
                >
                    Iya
                </ButtonPrimary>
            </div>
            <ButtonSecondary
                type="button"
                addClass={"py-3 lg:py-3 px-5 lg:px-7"}
                onClick={onCancel}
            >
                Batal
            </ButtonSecondary>
        </div>
    );
};

// Modal Component
const Modal = ({ open, onClose, children, className }) => {
    return (
        <>
            {open && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className={`fadeIn relative ${className}`}>
                            <div className="fadeIn border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-w-50 min-h-max outline-none focus:outline-none">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black-600" onClick={onClose}></div>
                </>
            )}
        </>
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

// Usage example:
// <Modal open={store.isOpen} onClose={() => dispatch(setIsConfirmationModal(false))} className="min-w-[400px]">
//   <ModalHeader onClose={() => dispatch(setIsConfirmationModal(false))} />
//   <ModalBody>Apakah kamu yakin?</ModalBody>
//   <ModalFooter onConfirm={() => console.log("Confirmed")} onCancel={() => dispatch(setIsConfirmationModal(false))} />
// </Modal>

export { Modal, ModalHeader, ModalBody, ModalFooter };

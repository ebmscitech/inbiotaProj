import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../misc/ButtonPrimary";
import Image from "next/image";
import { setIsRegisterModal } from "../../redux/auth";

export default function RegisterModal() {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.auth);

    return (
        <>
            {store.isRegisterModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-w-50 outline-none focus:outline-none">

                                {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black-600 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => dispatch(setIsRegisterModal(false))}
                                    >
                                        <span className="bg-transparent text-black-600 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div> */}

                                <div className="relative p-6 grid place-content-center">
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
                                    <div>
                                        Terima kasih.
                                    </div>
                                    <div>
                                        Admin akan segera menghubungi Anda
                                    </div>
                                    <div className="grid w-1/3 self-center">
                                        <ButtonPrimary addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                            Oke
                                        </ButtonPrimary>
                                    </div>
                                    {/* <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        I always felt like I could do anything. That’s the main
                                        thing people are controlled by! Thoughts- their perception
                                        of themselves! They're slowed down by their perception of
                                        themselves. If you're taught you can’t do anything, you
                                        won’t do anything. I was taught I could do everything.
                                    </p> */}
                                </div>

                                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(setIsRegisterModal(false))}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => dispatch(setIsRegisterModal(false))}
                                    >
                                        Save Changes
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black-600"></div>
                </>
            ) : null}
        </>
    );
}

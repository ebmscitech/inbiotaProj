import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// components
import ButtonPrimary from "../misc/ButtonPrimary.js";
import { useDispatch, useSelector } from "react-redux";
import { getListDapil, getListPartai } from "@/redux/global.js";
import toastAlert from "@/utils/alert.js";
import { isObjEmpty, selectThemeColors } from "@/utils/index.js";
import Loader from "../Loader/index.js";
import Input from "../Fields/Input.js";
import { ProfileSchema } from "@/validation/index.js";
import { Form, Formik } from "formik";
import Select, { components, StylesConfig } from "react-select";
import DatePicker from "../DatePicker/index.js";
import { postByPath, updateData, uploadPhoto } from "@/api/index.js";
import { getCaleg } from "@/redux/caleg.js";
import { getUsername } from "@/utils/storage.js";
import UploadPhotoProfile from "../Profile/UploadPhotoProfile.js";
import UploadProfileCover from "../Profile/UploadProfileCover.js";
import Visi from "../Profile/Visi.js";
import Misi from "../Profile/Misi.js";
import Pixel from "../Profile/Pixel.js";
import Lembaga from "../Profile/Lembaga.js";
import moment from "moment";

function DataCaleg({ color, isLoading }) {
    const username = getUsername()
    const dispatch = useDispatch()
    const store = useSelector((state) => state.global);
    // const active = useSelector((state) => state.profile.activeTab);
    const profile = useSelector((state) => state.profile);
    const dataAccount = useSelector((state) => state.caleg);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const [gagasan, setGagasan] = useState("");
    const [dataCaleg, setDataCaleg] = useState("");
    const [isStickyButton, setIsStickyButton] = useState(false);

    const [listDapil, setListDapil] = useState([]);
    const [dapil, setDapil] = useState({
        value: "",
        label: "Pilih Dapil"
    });
    const [listPartai, setListPartai] = useState([]);
    const [partai, setPartai] = useState({
        value: "",
        label: "Pilih Partai"
    });

    const DropdownComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center cursor-pointer">
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };

    useEffect(() => {
        if (!isObjEmpty(store?.listPartai)) {
            // console.log("ini list Partai register", store?.listPartai)
            var tempList = store?.listPartai
            const temp = tempList.map((v, index) => {
                return {
                    label: v.name,
                    value: v._id
                }
            });
            setListPartai(temp)
        } else {
            dispatch(getListPartai())
        }
    }, [store?.listPartai])

    useEffect(() => {
        if (!isObjEmpty(store?.listDapil)) {
            // console.log("ini list Dapil register", store?.listDapil)
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
        try {
            let data = {
                visi: profile?.dataVisi,
                misi: profile?.dataMisi,
                gagasan: gagasan,
                birth_date: moment(birthDate).format('YYYY-MM-DD'),
                partai: partai.value,
                dapil: dapil.value,
                lembaga: profile?.dataLembaga,
                pixel_id: profile?.dataPixel,
                sticky_button: isStickyButton,
            }

            if (profile?.dataCoverProfile && typeof profile?.dataCoverProfile === 'object') {
                data.cover = [await uploadDataPhoto(profile?.dataCoverProfile)];
            }

            if (profile?.dataPhotoProfile && typeof profile?.dataPhotoProfile === 'object') {
                data.profile_picture = await uploadDataPhoto(profile?.dataPhotoProfile);
            }

            let validatedData = {
                ...data,
                ...values,
            };
            // console.log("udah di validasi", data)
            setIsLoadingButton(true);
            const res = await updateData(validatedData, `/auth/update/${dataCaleg._id}`); // Assuming you have an API function for this
            // console.log("ini post update data caleg", res)
            if (res.status === 200) {
                let params = {
                    username: username
                }
                dispatch(getCaleg(params))
                setIsLoadingButton(false);
                toastAlert("success", "Berhasil update data caleg !")
            } else {
                setIsLoadingButton(false);
                toastAlert("error", "Failed to update user data caleg");
            }
        } catch (error) {
            console.error(error);
        }
    };

    function uploadDataPhoto(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("data", file);
            formData.append("type", "image");

            uploadPhoto(formData)
                .then((res) => {
                    const path = res.data.data;
                    console.log("Uploaded path:", path);
                    resolve(path); // Resolve the promise with the path
                })
                .catch((err) => {
                    console.error(err);
                    // Reject the promise with the error
                    reject(err);
                });
        });
    }

    useEffect(() => {
        if (!isObjEmpty(dataAccount?.dataCaleg)) {
            var tempAccount = dataAccount?.dataCaleg?.account
            setDataCaleg(tempAccount)
            const tempPartai = tempAccount.partai
            const tempDapil = tempAccount.dapil
            setPartai({
                label: tempPartai.name,
                value: tempPartai._id
            })
            setDapil({
                label: tempDapil.name,
                value: tempDapil._id
            })
            setBirthDate(new Date(tempAccount.birth_date))
            setGagasan(tempAccount.gagasan)
            setIsStickyButton(tempAccount.sticky_button)
        }
    }, [dataAccount?.dataCaleg])

    return (
        <>
            {!isLoading ?
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        full_name: dataCaleg?.full_name,
                        birth_place: dataCaleg?.birth_place,
                        mobile_phone: dataCaleg?.mobile_phone,
                        email: dataCaleg?.email,
                        redirect_link: dataCaleg?.redirect_link,
                        no_urut: dataCaleg?.no_urut,
                    }}
                    validationSchema={ProfileSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, values }) => (
                        <Form className="w-full pt-5 sm:pt-5">
                            <UploadPhotoProfile dataCaleg={dataCaleg} />
                            <UploadProfileCover dataCaleg={dataCaleg} />
                            <div className="-mx-3 flex flex-wrap">
                                <Lembaga data={dataCaleg} />
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="dapil"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Partai
                                        </label>
                                        <Select
                                            id="partai-select"
                                            className={"react-select"}
                                            classNamePrefix="select"
                                            // isClearable={false}
                                            isSearchable={true}
                                            options={listPartai}
                                            // styles={colourStyles}
                                            theme={selectThemeColors}
                                            value={partai}
                                            onChange={(data) => setPartai(data)}
                                            components={{ Option: DropdownComponent }}
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="dapil"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Dapil
                                        </label>
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
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <Input
                                            label={"Nama Lengkap"}
                                            name="full_name"
                                            type="text"
                                            placeholder="Masukkan Nama Lengkap"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <Input
                                            label={"Tempat Lahir"}
                                            name="birth_place"
                                            type="text"
                                            placeholder="Masukkan Tempat Lahir"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="birth_date"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Tanggal Lahir
                                        </label>
                                        <DatePicker
                                            selected={birthDate}
                                            dateFormat="dd/MM/yyyy"
                                            onChange={(date) => setBirthDate(date)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <Input
                                            label={"No Handphone"}
                                            name="mobile_phone"
                                            type="text"
                                            placeholder="Masukkan No Handphone"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <Input
                                            label={"Email"}
                                            name="email"
                                            type="text"
                                            placeholder="Masukkan Email"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <Input
                                            label={"Nomor Urut"}
                                            name="no_urut"
                                            type="number"
                                            placeholder="Masukkan Nomor Urut"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <Input
                                            label={"Redirect Link"}
                                            name="redirect_link"
                                            type="text"
                                            placeholder="Masukkan Redirect Link"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="dapil"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Sticky Button Aspirasi
                                        </label>
                                        <div className="py-3">
                                            <label className="relative inline-flex items-center me-5 cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer"
                                                    checked={isStickyButton}
                                                    onChange={() => setIsStickyButton(!isStickyButton)}
                                                />
                                                <div className="w-11 h-6 bg-gray-100 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-w-50 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-400 after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-primary-500"></div>
                                                <span className="ms-3 text-sm font-medium text-gray-500 dark:text-gray-400">{isStickyButton ? "Aktif" : "Tidak Aktif"}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="dapil"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Gagasan
                                </label>
                                <textarea
                                    id="expectation"
                                    rows="4"
                                    value={gagasan}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={(e) => setGagasan(e.target.value)}
                                    placeholder={`Masukkan Gagasan`}>
                                </textarea>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <Visi dataCaleg={dataCaleg} />
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <Misi dataCaleg={dataCaleg} />
                            </div>
                            <div className="mb-5 font-semibold">
                                Tracking
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <Pixel dataCaleg={dataCaleg} />
                            </div>
                            <div className="flex flex-row-reverse my-5">
                                {!isLoadingButton ? (
                                    <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                                        Simpan Perubahan
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
                : <div className="grid h-[364px]">
                    <Loader isloading={isLoading} />
                </div>}
        </>
    );
}

DataCaleg.defaultProps = {
    color: "light",
};

DataCaleg.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default DataCaleg;

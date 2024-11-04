import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// components
import ButtonPrimary from "../misc/ButtonPrimary.js";
import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@/utils/alert.js";
import { isObjEmpty } from "@/utils/index.js";
import moment from "moment";
import { setIsBackgroundModal } from "@/redux/profile.js";
import { Delete20Filled } from "@fluentui/react-icons";
import { setIsConfirmationModal } from "@/redux/global.js";
import ConfirmationModal from "../Modals/ConfirmationModal.js";
import { deleteByAuth } from "@/api/index.js";
import { getCaleg } from "@/redux/caleg.js";
import { getUsername } from "@/utils/storage.js";
import BackgroundModal from "../Modals/BackgroundModal.js";

function Background({ color }) {
    const dispatch = useDispatch()
    const username = getUsername()
    const dataBackground = useSelector((state) => state.caleg);
    const [dataCaleg, setDataCaleg] = useState({});
    const [selectedData, setSelectedData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [listBackgrounds, setListBackgrounds] = useState([])

    const handleConfirm = () => {
        // Define your logic when confirmation is confirmed
        if (!isObjEmpty(selectedData)) {
            // console.log("ini confirm", selectedData)
            deleteByAuth(`/background/${selectedData.id}`)
                .then((res) => {
                    setIsLoading(false);
                    // console.log("ini delete background", res);
                    toastAlert("success", "Berhasil hapus background !");
                    let params = {
                        username: username
                    }
                    // dispatch(getCaleg(params))
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                    if (err.code === "ERR_BAD_REQUEST") {
                        toastAlert("error", err.response.data.message);
                    }
                    console.error(err);
                });
        }
    };

    const handleCancel = () => {
        // console.log("ini cancel", selectedData)
    };

    const confirmationCallback = {
        onConfirm: handleConfirm,
        onClose: handleCancel,
    };

    const handleDelete = (item) => {
        // console.log("ini id delete", item._id)
        let data = {
            id: item._id,
            name: item.name
        }
        setSelectedData(data)
        dispatch(setIsConfirmationModal(true))
    };

    const renderTable = () => {
        if (listBackgrounds.length === 0) {
            return (
                <tr>
                    <td colSpan="5" className="text-center py-7">
                        No background data available.
                    </td>
                </tr>
            );
        }

        return listBackgrounds.map((item, index) => (
            <tr key={index}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {moment(item?.createdAt).format('DD MMMM YYYY')}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <span>
                        <Delete20Filled className="cursor-pointer" onClick={() => handleDelete(item)} />
                    </span>
                </td>
            </tr>
        ));
    };

    useEffect(() => {
        if (!isObjEmpty(dataBackground?.dataCaleg)) {
            // console.log("ini dataBackground", dataBackground?.dataCaleg)
            setDataCaleg(dataBackground?.dataCaleg?.account)
            var tempBackgrounds = dataBackground?.dataCaleg?.backgrounds
            setListBackgrounds(tempBackgrounds)
        }
    }, [dataBackground?.dataCaleg])

    return (
        <>
            <div className="flex flex-row-reverse">
                <ButtonPrimary onClick={() => dispatch(setIsBackgroundModal(true))} type="button" addClass={"py-3 lg:py-3 px-5 lg:px-5"}>
                    Tambah Data +
                </ButtonPrimary>
            </div>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded " +
                    (color === "light" ? "bg-w-50" : "bg-blueGray-700 text-white")
                }
            >
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Latar Belakang
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Tanggal Dibuat
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}
                        </tbody>
                    </table>
                </div>
            </div>
            <BackgroundModal dataCaleg={dataCaleg} />
            <ConfirmationModal callback={confirmationCallback} text={`Kamu akan mengapus data ${selectedData.name}`} />
        </>
    );
}

Background.defaultProps = {
    color: "light",
};

Background.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default Background;

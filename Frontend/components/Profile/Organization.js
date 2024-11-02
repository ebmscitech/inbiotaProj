import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// components
import ButtonPrimary from "../misc/ButtonPrimary.js";
import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@/utils/alert.js";
import { isObjEmpty } from "@/utils/index.js";
import moment from "moment";
import { setIsOrganizationModal } from "@/redux/profile.js";
import OrganizationModal from "../Modals/OrganizationModal.js";
import { Delete20Filled } from "@fluentui/react-icons";
import { setIsConfirmationModal } from "@/redux/global.js";
import ConfirmationModal from "../Modals/ConfirmationModal.js";
import { deleteByAuth } from "@/api/index.js";
import { getCaleg } from "@/redux/caleg.js";
import { getUsername } from "@/utils/storage.js";

function Organization({ color }) {
    const dispatch = useDispatch()
    const username = getUsername()
    const dataOrganization = useSelector((state) => state.caleg);
    const [dataCaleg, setDataCaleg] = useState({});
    const [selectedData, setSelectedData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [listOrganizations, setListOrganizations] = useState([])

    const handleConfirm = () => {
        // Define your logic when confirmation is confirmed
        if (!isObjEmpty(selectedData)) {
            // console.log("ini confirm", selectedData)
            deleteByAuth(`/organization-history/${selectedData.id}`)
                .then((res) => {
                    setIsLoading(false);
                    // console.log("ini delete organisasi", res);
                    toastAlert("success", "Berhasil hapus organisasi !");
                    let params = {
                        username: username
                    }
                    dispatch(getCaleg(params))
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
        if (listOrganizations.length === 0) {
            return (
                <tr>
                    <td colSpan="5" className="text-center py-7">
                        No organization data available.
                    </td>
                </tr>
            );
        }

        return listOrganizations.map((item, index) => (
            <tr key={index}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.position}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {moment(item?.start_date).format('YYYY')}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {moment(item?.end_date).format('YYYY')}
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
        if (!isObjEmpty(dataOrganization?.dataCaleg)) {
            // console.log("ini dataOrganization", dataOrganization?.dataCaleg)
            setDataCaleg(dataOrganization?.dataCaleg?.account)
            var tempOrganizations = dataOrganization?.dataCaleg?.organizationHistories
            setListOrganizations(tempOrganizations)
        }
    }, [dataOrganization?.dataCaleg])

    return (
        <>
            <div className="flex flex-row-reverse">
                <ButtonPrimary onClick={() => dispatch(setIsOrganizationModal(true))} type="button" addClass={"py-3 lg:py-3 px-5 lg:px-5"}>
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
                                    Jabatan
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Organisasi
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Tahun Mulai
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Tahun Berakhir
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
            <OrganizationModal dataCaleg={dataCaleg} />
            <ConfirmationModal callback={confirmationCallback} text={`Kamu akan mengapus data ${selectedData.name}`} />
        </>
    );
}

Organization.defaultProps = {
    color: "light",
};

Organization.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default Organization;

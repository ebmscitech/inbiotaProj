import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ButtonPrimary from "../misc/ButtonPrimary.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsConfirmationModal } from "@/redux/global.js";
import toastAlert from "@/utils/alert.js";
import { isObjEmpty } from "@/utils/index.js";
import { Delete20Filled, Edit20Filled, Save20Filled } from "@fluentui/react-icons";
import { getDataPartai, setIsPartaiModal } from "@/redux/partai.js";
import moment from "moment";
import { deleteByAuth, updateData } from "@/api/index.js";
import Pagination from "../Pagination/Pagination.js";
import ConfirmationModal from "../Modals/ConfirmationModal.js";

function CardPartai({ color }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.partai);
  const [listPartai, setListPartai] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totals, setTotals] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [partaiName, setPartaiName] = useState("");
  const [editedItemId, setEditedItemId] = useState(null);
  const [selectedPartai, setSelectedPartai] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPartai = listPartai.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleConfirm = () => {
    if (!isObjEmpty(selectedPartai)) {
      // console.log("ini confirm", selectedPartai)
      deleteByAuth(`/partai/${selectedPartai.id}`)
        .then((res) => {
          setIsLoading(false);
          // console.log("ini delete partai", res);
          toastAlert("success", "Berhasil hapus partai !");
          getListDataPartai();
          setSelectedPartai({})
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
    // console.log("ini cancel", selectedPartai)
    setSelectedPartai({})
    setIsEdit(false)
  };

  const confirmationCallback = {
    onConfirm: handleConfirm,
    onClose: handleCancel,
  };

  const handleDelete = (item) => {
    // console.log("ini id delete", item._id)
    let partai = {
      id: item._id,
      name: item.name
    }
    setSelectedPartai(partai)
    dispatch(setIsConfirmationModal(true))
  };

  const handleEdit = (item) => {
    // console.log("ini id edit", item);
    setIsEdit(!isEdit);
    setEditedItemId(item._id);
    setPartaiName(item.name)
  };

  const handleUpdate = async () => {
    try {
      let data = {
        name: partaiName
      }
      setIsLoading(true);
      const res = await updateData(data, `/partai/${editedItemId}`); // Assuming you have an API function for this
      // console.log("ini post update data partai", res)
      if (res.status === 200) {
        setIsLoading(false);
        // console.log("ini post update data partai", res)
        getListDataPartai();
        toastAlert("success", "Berhasil update !")
        // After updating, reset the state
        setIsEdit(false);
        setEditedItemId(null);
        setPartaiName("")
      } else {
        toastAlert("error", "Failed to update partai");
      }
    } catch (error) {
      toastAlert("error", "An error occurred while updating partai");
    }
  };

  const handleChange = (value) => {
    setPartaiName(value)
  };

  async function getListDataPartai() {
    let data = {
      page: currentPage,
      limit: rowsPerPage,
    };
    setIsLoading(true);
    await dispatch(getDataPartai(data))
      .then((res) => {
        setIsLoading(false);
        var temp = res.payload.data || null;
        setListPartai(temp.docs);
        setTotals(temp.total);
      })
      .catch((err) => {
        setIsLoading(false);
        toastAlert("error", "Proses mendapatkan data user sedang gangguan");
        console.error(err);
      });
  }

  useEffect(() => {
    if (currentPage > 0) {
      getListDataPartai();
    }
  }, [currentPage]);

  useEffect(() => {
    getListDataPartai();
  }, [store?.isPartaiModal === false]);

  return (
    <>
      <div className="flex flex-row-reverse mb-5 lg:pt-0 pt-14">
        <ButtonPrimary
          onClick={() => dispatch(setIsPartaiModal(true))}
          type="button"
          addClass={"py-3 lg:py-3 px-5 lg:px-5"}
        >
          Tambah Partai +
        </ButtonPrimary>
      </div>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded " +
          (color === "light" ? "bg-w-50" : "bg-blueGray-700 text-white")
        }
      >
        <div className="mb-5 md:flex px-4 py-3 md:items-center md:justify-between">
          <div className="inline-flex overflow-hidden bg-white divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-neutral-700" : "text-white")
              }
            >
              List Partai
            </h3>
          </div>
          {/* <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input type="text" placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div> */}
        </div>
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
                  Nama Partai
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Tanggal Buat
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
              {listPartai.map((item, index) => {
                return (
                  <tr key={index} className="text-[#6B7280] text-sm">
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                      <div className="w-full">
                        <input
                          id="partai-name"
                          className={`rounded-md w-full min-w-max bg-white py-2 font-normal outline-none ${isEdit && editedItemId === item._id ? "border border-[#6A64F1] px-2" : ""} focus:px-2 focus:border focus:border-[#6A64F1] focus:shadow-md disabled:bg-transparent`}
                          name="partai-name"
                          value={editedItemId === item._id ? partaiName : item.name}
                          onChange={(e) => handleChange(e.target.value)}
                          disabled={!isEdit || editedItemId !== item._id}
                        />
                      </div>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                      {moment(item.createdAt).format("Do MMMM YYYY, h:mm:ss")}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-right">
                      {isEdit && editedItemId === item._id ? (
                        <div className="flex justify-center">
                          <button type="button" className="cursor-pointer flex pr-3 items-center" onClick={handleUpdate}>
                            <Save20Filled className="text-green-500" />
                            <span className="pl-1">
                              Save
                            </span>
                          </button>
                          <button type="button" className="cursor-pointer flex items-center" onClick={handleCancel}>
                            <span className="text-base text-primary-400 font-bold pr-1">
                              X
                            </span>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <span className="pr-3">
                            <Edit20Filled
                              className="cursor-pointer"
                              onClick={() => handleEdit(item)}
                            />
                          </span>
                          <span>
                            <Delete20Filled
                              className="cursor-pointer text-primary-400"
                              onClick={() => handleDelete(item)}
                            />
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex place-content-center py-5">
            <Pagination
              totalPages={Math.ceil(totals / rowsPerPage)}
              page={currentPage}
              onNumberClick={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal callback={confirmationCallback} text={`Kamu akan mengapus ${selectedPartai.name}`} />
    </>
  );
}

CardPartai.defaultProps = {
  color: "light",
};

CardPartai.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardPartai;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "../../components/Dropdowns/TableDropdown.js";
import ButtonPrimary from "../misc/ButtonPrimary.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsConfirmationModal } from "@/redux/global.js";
import toastAlert from "@/utils/alert.js";
import { getDataDapil, getProvinces, setIsDapilModal } from "@/redux/dapil.js";
import { isObjEmpty } from "@/utils/index.js";
import ReactPaginate from "react-paginate";
import { getDataUsers } from "@/redux/user.js";
import { Delete20Filled, Edit20Filled } from "@fluentui/react-icons";
import { deleteByAuth, updateData } from "@/api/index.js";
import Pagination from "../Pagination/Pagination.js";
import Badge from "../Badge/index.js";
import ConfirmationModal from "../Modals/ConfirmationModal.js";

function CardUsers({ color }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.global);
  const [listUsers, setListUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totals, setTotals] = useState(0);
  const [callback, setCallback] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});

  const handleConfirm = () => {
    // Define your logic when confirmation is confirmed
    if (!isObjEmpty(selectedUser)) {
      console.log("ini confirm", selectedUser)
      deleteByAuth(`/auth/users/${selectedUser.id}`)
        .then((res) => {
          setIsLoading(false);
          console.log("ini delete user", res);
          toastAlert("success", "Berhasil hapus user !");
          getListDataUsers();
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
    console.log("ini cancel", selectedUser)
  };

  const confirmationCallback = {
    onConfirm: handleConfirm,
    onClose: handleCancel,
  };

  const handleDelete = (item) => {
    console.log("ini id delete", item._id)
    let user = {
      id: item._id,
      name: item.full_name
    }
    setSelectedUser(user)
    dispatch(setIsConfirmationModal(true))
  };

  async function getListDataUsers() {
    let data = {
      page: currentPage,
      limit: rowsPerPage
    }
    setIsLoading(true);
    await dispatch(getDataUsers(data)).then((res) => {
      setIsLoading(false);
      var temp = res.payload.data || null
      setListUsers(temp.docs)
      setTotals(temp.total)
      console.log("ini get list users", temp)
    })
      .catch((err) => {
        setIsLoading(false);
        toastAlert("error", "Proses mendapatkan data user sedang gangguan");
        console.error(err);
      });
  }

  const handleCheckboxChange = async (id, isActive) => {
    try {
      let data = {
        active: !isActive
      }
      setIsLoading(true);
      const res = await updateData(data, `/auth/update/${id}`); // Assuming you have an API function for this
      console.log("ini post update data status user", res)
      if (res.status === 200) {
        setIsLoading(false);
        console.log("ini post update data status user", res)
        getListDataUsers();
        toastAlert("success", "Berhasil update status !")
      } else {
        toastAlert("error", "Failed to update user status");
      }
    } catch (error) {
      toastAlert("error", "An error occurred while updating user status");
    }
  };

  useEffect(() => {
    if (currentPage > 0) {
      getListDataUsers()
    }
  }, [currentPage]);

  // useEffect(() => {
  //   getListDataUsers()
  // }, [store?.isConfirmationModal === false])

  useEffect(() => {
    dispatch(getProvinces())
  }, [1])

  return (
    <>
      {/* <div className="flex flex-row-reverse mb-5">
        <ButtonPrimary onClick={() => dispatch(setIsDapilModal(true))} type="button" addClass={"py-3 lg:py-3 px-5 lg:px-5"}>
          Tambah Dapil +
        </ButtonPrimary>
      </div> */}
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded " +
          (color === "light" ? "bg-w-50" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-neutral-700" : "text-white")
                }
              >
                List Users
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
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
                  Nama Lengkap
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  No HP
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Username
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status
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
              {listUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {item.full_name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.mobile_phone}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.role}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {/* {item.active ? <Badge color={"green"}>
                        Aktif
                      </Badge> : <Badge color={"primary"}>
                        Tidak Aktif
                      </Badge>} */}
                      {/* {item.active ? "Aktif" : "Tidak Aktif"} */}
                      <span>
                        <label class="relative inline-flex items-center me-5 cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer"
                            checked={item.active}
                            onChange={() => handleCheckboxChange(item._id, item.active)}
                          />
                          <div class="w-11 h-6 bg-gray-100 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-w-50 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-400 after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-primary-500"></div>
                          <span class="ms-3 text-sm font-medium text-gray-500 dark:text-gray-400">{item.active ? "Aktif" : "Tidak Aktif"}</span>
                        </label>
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      {/* <span className="pr-3">
                        <Edit20Filled className="cursor-pointer" />
                      </span> */}
                      <span>
                        <Delete20Filled className="cursor-pointer" onClick={() => handleDelete(item)} />
                      </span>
                    </td>
                  </tr>
                )
              })}
              {/* {listUsers.length > 0 ?
                <>
                </> :
                "no data"} */}
            </tbody>
          </table>
          <div className="flex place-content-center py-5">
            <Pagination
              totalPages={Math.ceil(totals / rowsPerPage)}
              page={currentPage}
              onNumberClick={setCurrentPage}
            />
            {/* {UsersPagination()} */}
          </div>
        </div>
      </div>
      <ConfirmationModal callback={confirmationCallback} text={`Kamu akan mengapus user ${selectedUser.name}`} />
    </>
  );
}

CardUsers.defaultProps = {
  color: "light",
};

CardUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardUsers;

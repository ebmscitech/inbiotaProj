import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@/utils/alert.js";
import { Delete20Filled, Edit20Filled } from "@fluentui/react-icons";
import { getDataAspirasi } from "@/redux/aspirasi.js";
import { deleteByAuth } from "@/api/index.js";
import Pagination from "../Pagination/Pagination.js";
import moment from "moment";
import { getUserData } from "@/utils/storage.js";
import Loader from "../Loader/index.js";

function CardAspirations({ color }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.aspirasi);
  const [listAspirasi, setListAspirasi] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totals, setTotals] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleDelete = (id) => {
    console.log("ini id delete", id)
    deleteByAuth(`/aspiration/${id}`).then((res) => {
      setIsLoading(false)
      // console.log("ini delete aspiration", res)
      toastAlert("success", "Berhasil hapus aspirasi !")
      let apiParams = `?page=${currentPage}&limit=${rowsPerPage}`;

      // Check if the role is "caleg"
      if (userRole === "caleg") {
        if (userId !== null) {
          apiParams += `&type=caleg&type_id=${userId}`;
        }
      }
      getListDataAspirasi(apiParams)
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
        if (err.code === "ERR_BAD_REQUEST") {
          toastAlert("error", err.response.data.message)
        }
        console.error(err)
      })
  };

  async function getListDataAspirasi(apiParams) {
    setIsLoading(true);
    await dispatch(getDataAspirasi(apiParams)).then((res) => {
      setIsLoading(false);
      var temp = res.payload.data || null
      setListAspirasi(temp.docs)
      setTotals(temp.total)
      // console.log("ini get list aspirasi", temp)
    })
      .catch((err) => {
        setIsLoading(false);
        toastAlert("error", "Proses mendapatkan data user sedang gangguan");
        console.error(err);
      });
  }

  useEffect(() => {
    if (currentPage > 0) {
      let apiParams = `?page=${currentPage}&limit=${rowsPerPage}`;

      // Check if the role is "caleg"
      if (userRole !== null && userId !== null) {
        if (userRole === "caleg") {
          apiParams += `&type=caleg&type_id=${userId}`;
          // console.log("ini caleg", userRole)
          getListDataAspirasi(apiParams)
        } else {
          // console.log("ini superadmin", userRole)
          getListDataAspirasi(apiParams)
        }
      }
    }
  }, [currentPage, userRole, userId])

  useEffect(() => {
    const fetchedUserData = getUserData();
    // console.log("ini user data", fetchedUserData)
    setUserRole(fetchedUserData.role);
    setUserId(fetchedUserData.id_user)
    // dispatch(getProvinces())
  }, []); // Run only once on mount

  if (userRole === null && userId === null) {
    // If userRole is still null, you can show a loading state or return null
    return <div className="grid h-[364px]">
      <Loader isloading={isLoading} />
    </div>;
  }

  return (
    <>
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
                List Aspirations
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto ">
          <table className="items-center w-full max-w-max bg-transparent border-collapse">
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
                  No
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Tanggal
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Nama Pengirim
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  No Handphone
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
                  Pembangunan
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Tujuan
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Harapan
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
            <tbody className="self-center">
              {listAspirasi.length === 0 ?
                <tr>
                  <td colSpan="7" className="w-full text-center py-7">
                    No aspiration data available.
                  </td>
                </tr> :
                <>
                  {listAspirasi.map((item, index) => {
                    const number = (currentPage - 1) * rowsPerPage + index + 1;
                    var pembangunan = item?.pembangunan || null
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {number}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {moment(item.createdAt).format('LLLL')}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.nomor_hp}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <ul className="text-black-600 self-start list-inside">
                            {pembangunan?.map((item, index) => {
                              return (
                                <li key={index} className="list-disc ml-1 mb-2">
                                  {item}
                                </li>
                              )
                            })}
                          </ul>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.typeName}
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="w-[500px] text-gray-900 whitespace-no-wrap">{item.expectation}</p>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                          {/* <span className="pr-3">
                        <Edit20Filled className="cursor-pointer" />
                      </span> */}
                          {userRole !== "caleg" &&
                            <span>
                              <Delete20Filled className="cursor-pointer" onClick={() => handleDelete(item._id)} />
                            </span>
                          }
                        </td>
                      </tr>
                    )
                  })}
                </>}
            </tbody>
          </table>
        </div>
        <div className={`flex place-content-center py-5 ${totals > 0 ? "" : "hidden"}`}>
          <Pagination
            totalPages={Math.ceil(totals / rowsPerPage)}
            page={currentPage}
            onNumberClick={setCurrentPage}
          />
        </div>
      </div >
    </>
  );
}

CardAspirations.defaultProps = {
  color: "light",
};

CardAspirations.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardAspirations;

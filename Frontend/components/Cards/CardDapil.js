import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// components
import TableDropdown from "../../components/Dropdowns/TableDropdown.js";
import ButtonPrimary from "../misc/ButtonPrimary.js";
import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@/utils/alert.js";
import { getDataDapil, getProvinces, setIsDapilModal } from "@/redux/dapil.js";
import Pagination from "../Pagination/Pagination.js";

function CardDapil({ color }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.dapil);
  const [listDapil, setListDapil] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totals, setTotals] = useState(0);

  async function getListDataDapil() {
    let data = {
      page: currentPage,
      limit: rowsPerPage
    }
    setIsLoading(true);
    await dispatch(getDataDapil(data)).then((res) => {
      setIsLoading(false);
      var temp = res.payload.data || null
      setListDapil(temp.docs)
      setTotals(temp.total)
      console.log("ini get list dapil", temp.docs)
    })
      .catch((err) => {
        setIsLoading(false);
        toastAlert("error", "Proses mendapatkan data dapil sedang gangguan");
        console.error(err);
      });
  }

  useEffect(() => {
    if (currentPage > 0) {
      getListDataDapil()
    }
  }, [currentPage]);

  useEffect(() => {
    getListDataDapil()
  }, [store?.isDapilModal === false])

  useEffect(() => {
    dispatch(getProvinces())
  }, [1])

  return (
    <>
      <div className="flex flex-row-reverse">
        <ButtonPrimary onClick={() => dispatch(setIsDapilModal(true))} type="button" addClass={"py-3 lg:py-3 px-5 lg:px-5"}>
          Tambah Dapil +
        </ButtonPrimary>
      </div>
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
                List Dapil
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
                  Nama Dapil
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Provinsi
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Area
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Lembaga
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
              {listDapil.map((item, index) => {
                var areaCode = item?.area_code || null
                return (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {item.name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.province_code.label}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <ul className="text-black-600 self-start list-inside">
                        {areaCode?.map((item, index) => {
                          return (
                            <li key={index} className="list-disc ml-1 mb-2">
                              {item?.label}
                            </li>
                          )
                        })}
                      </ul>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.type}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown />
                    </td>
                  </tr>
                )
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
    </>
  );
}

CardDapil.defaultProps = {
  color: "light",
};

CardDapil.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardDapil;

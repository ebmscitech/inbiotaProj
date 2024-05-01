import { isObjEmpty } from "@/utils/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components

export default function CardPageVisits() {
  const store = useSelector((state) => state.dashboard);
  const [pageVisit, setPageVisit] = useState([])

  useEffect(() => {
    if (!isObjEmpty(store.dataPageVisit)) {
      console.log("ini page visit", store.dataPageVisit)
      var tempPageVisit = store.dataPageVisit
      setPageVisit(tempPageVisit.docs)
    }
  }, [store.dataPageVisit])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-w-50 w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Page visits
              </h3>
            </div>
            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-primary-500 text-w-50 active:bg-primary-600 text-xs font-medium uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Page name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Visitors
                </th>
              </tr>
            </thead>
            <tbody>
              {pageVisit.length === 0 ?
                <tr>
                  <td colSpan="7" className="w-full text-center py-7">
                    No visit data available.
                  </td>
                </tr> :
                <>
                  {pageVisit.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {item.pageName}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.visitors}
                        </td>
                        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          340
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                          46,53%
                        </td> */}
                      </tr>
                    )
                  })}
                </>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

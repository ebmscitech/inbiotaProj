import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components

// import CardLineChart from "../../components/Cards/CardLineChart.js";
// import CardBarChart from "../../components/Cards/CardBarChart.js";
// import CardPageVisits from "../../components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "../../components/Layout/Admin.js";
import { getDashboard } from "@/redux/dashboard.js";
import toastAlert from "@/utils/alert.js";
import moment from "moment";
import { getUsername } from "@/utils/storage.js";
import { noValue } from "@/utils/validateInput.js";

export default function Dashboard() {
  const dispatch = useDispatch()
  const username = getUsername()
  const [isLoading, setIsLoading] = useState(false)

  async function getDashboardData(apiParams) {
    setIsLoading(true);
    await dispatch(getDashboard(apiParams)).then((res) => {
      setIsLoading(false);
      var temp = res.payload.data || null
    })
      .catch((err) => {
        setIsLoading(false);
        toastAlert("error", "Proses mendapatkan data user sedang gangguan");
        console.error(err);
      });
  }

  useEffect(() => {
    if (!noValue(username)) {
      let apiParams = `?page=1&limit=999999&toDate=${moment(new Date()).format('YYYY-MM-DD')}&fromDate=2023-01-01&username=${username}`;
      getDashboardData(apiParams)
    }
  }, [username]);

  return (
    <Admin>
      <div className="flex flex-wrap md:pt-32 pt-12">
        <div className="w-full mb-12 xl:mb-0 px-4">
          {/* <CardBarChart /> */}
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardLineChart />
        </div> */}
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
      </div>
    </Admin>
  );
}


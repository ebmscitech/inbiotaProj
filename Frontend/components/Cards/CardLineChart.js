import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { isObjEmpty } from "@/utils/index";
import { useDispatch, useSelector } from "react-redux";

export default function CardLineChart() {
  const store = useSelector((state) => state.dashboard);
  // const [aspirasiCount, setAspirasiCount] = useState([])

  // useEffect(() => {
  //   console.log("ini aspirasi count", store.dataAspirasi)
  //   if (store.dataAspirasi) {
  //     console.log("ini aspirasi count", store.dataAspirasi)
  //     // var tempAspirasi = store.dataAspirasi
  //     setAspirasiCount(store.dataAspirasi)
  //   }
  // }, [store.dataAspirasi])

  // ** Chart Options
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   backgroundColor: false,
  //   plugins: {
  //     legend: {
  //       align: 'middle',
  //       position: 'top',
  //       labels: {
  //         boxWidth: 10,
  //         marginBottom: 25,
  //         color: "#4c51bf",
  //         usePointStyle: true
  //       }
  //     },
  //     beforeInit(chart) {
  //       chart.legend.afterFit = function () {
  //         this.height += 20;
  //       };
  //     }
  //   },
  // };

  useEffect(() => {
    // console.log("ini aspirasi count", store.dataAspirasi)
    if (store.dataAspirasi) {
      // console.log("ini aspirasi count", store.dataAspirasi)
      var tempAspirasi = store.dataAspirasi
      // setAspirasiCount(store.dataAspirasi)
      const aspirasiLabel = tempAspirasi.map((item) => item.date);
      const aspirasiData = tempAspirasi.map((item) => item.count);

      var config = {
        type: "bar",
        data: {
          labels: aspirasiLabel,
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: aspirasiData,
              fill: false,
            },
            // {
            //   label: new Date().getFullYear() - 1,
            //   fill: false,
            //   backgroundColor: "#d5d5d5",
            //   borderColor: "#d5d5d5",
            //   data: [40, 68, 86, 74, 56, 60, 87],
            // },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Aspirasi Charts",
            fontColor: "black",
          },
          legend: {
            labels: {
              fontColor: "black",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };

      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
  }, [store.dataAspirasi]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-w-50">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Aspirasi</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

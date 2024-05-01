import { setDataDevelopment, setDataDevelopmentLainnya } from "@/redux/aspirasi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isObjEmpty } from "@/utils/index";
import Input from "../Fields/Input";

const CardDevelopment = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.aspirasi);
  const [development, setDevelopment] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const handleCheckboxChange = (option) => {
    if (option === "Lainnya") {
      setShowOtherInput(!showOtherInput);
    }
    setDevelopment((prevState) => {
      const index = prevState.indexOf(option);
      if (index === -1) {
        return [...prevState, option];
      } else {
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
      }
    });
  };

  const handleOtherInputChange = (e) => {
    setOtherValue(e.target.value);
    dispatch(setDataDevelopmentLainnya(e.target.value));
  };

  const renderDevelopmentOptions = () => {
    const options = [
      { label: "Infrastruktur", value: "Infrastruktur" },
      { label: "Akses Informasi", value: "Akses Informasi" },
      { label: "Pendidikan", value: "Pendidikan" },
      { label: "Kesehatan", value: "Kesehatan" },
      { label: "Ekonomi / Kesejahteraan", value: "Ekonomi / Kesejahteraan" },
      { label: "Hukum / Keadilan", value: "Hukum / Keadilan" },
      { label: "Lainnya", value: "Lainnya" },
    ];

    return options.map((option, index) => (
      <div key={index} className="grid justify-items-center">
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="development"
              type="checkbox"
              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 min-w-[1.25rem] w-5 h-5 ease-linear transition-all duration-150"
              onChange={() => handleCheckboxChange(option.value)}
              checked={development.includes(option.value)}
            />
            <span className="ml-2 text-sm font-semibold text-blueGray-600">
              {option.label}
            </span>
          </label>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    dispatch(setDataDevelopment(development));
  }, [development]);

  useEffect(() => {
    if (isObjEmpty(store?.dataDevelopment)) {
      setDevelopment([]);
      setDevelopment(store?.dataDevelopment);
    }
  }, [store?.dataDevelopment]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-5 border-0 bg-secondary-300">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Pilih pembangunan yang kamu harapkan!
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto py-4 px-4">
        <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-4 justify-items-start items-center">
          {renderDevelopmentOptions()}
          {showOtherInput && (
            // <input
            //   type="text"
            //   />
            <Input
              style={{ width: "-webkit-fill-available" }}
              placeholder="Lainnya"
              value={otherValue}
              onChange={handleOtherInputChange}
              // label={"Username"}
              name="username"
              type="text"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDevelopment;

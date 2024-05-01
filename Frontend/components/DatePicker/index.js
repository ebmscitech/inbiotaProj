import React from "react";
import ReactDatePicker from "react-datepicker";
import { IosArrowLtr24Filled, IosArrowRtl24Filled } from "@fluentui/react-icons";

const DatePicker = ({ ...props }) => {
    function range(start, end, step) {
        const len = Math.floor((end - start) / step) + 1;
        return Array(len).fill().map((_, idx) => start + idx * step);
    }
    const currentYear = new Date().getUTCFullYear();
    const years = range(1945, currentYear + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <ReactDatePicker
            {...props}
            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button type="button" className="pr-5" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        <IosArrowLtr24Filled className="w-5" />
                    </button>
                    <select
                        value={date.getFullYear()} // Use getFullYear() to get the year
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={months[date.getMonth()]} // Use getMonth() to get the month index
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button type="button" className="pl-5" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        <IosArrowRtl24Filled className="w-5" />
                    </button>
                </div>
            )}
            className="w-full rounded-md border bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md border-[#e0e0e0]"
        />
    );
};

export default DatePicker;

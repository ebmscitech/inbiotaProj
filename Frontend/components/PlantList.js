import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import PlantTable from "./Table/PlantTable";
import { truncate } from "@/redux/global";
import BioactivityTable from "./Table/BioactivityTable";
import SubstanceTable from "./Table/SubstanceTable";

function PlantList({ color, searchResults, type, attribute, keyword, setIsDetail }) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);

    useEffect(() => {
        // console.log('ini attribute', attribute)
        if (searchResults) {
            setPlants(searchResults.data);
        }
    }, [searchResults]);

    const handleSeeDetails = (plant) => {
        setSelectedPlant(plant);
    };

    const handleBack = () => {
        setIsDetail(false)
        setSelectedPlant(null);
    };

    const indexOfLastPlant = currentPage * rowsPerPage;
    const indexOfFirstPlant = indexOfLastPlant - rowsPerPage;
    const currentPlants = plants?.slice(indexOfFirstPlant, indexOfLastPlant);

    if (selectedPlant) {
        setIsDetail(true)
        return (
            <div className="mx-auto">
                <button onClick={handleBack} className="mb-4 text-blue-500 hover:underline font-bold">
                    {"<"} Back to Plant List
                </button>
                {type?.value === 1 && <PlantTable plant={selectedPlant} />}
                {type?.value === 2 && <BioactivityTable bioactivity={selectedPlant} />}
                {type?.value === 3 && <SubstanceTable phytochemical={selectedPlant} />}
            </div>
        );
    }

    return (
        <div className="mx-auto">
            <div className="w-full flex justify-between items-center mb-3 mt-12 pl-3">
                <div>
                    <p className="text-lg sm:text-xl text-black-600 dark:text-black-400">
                        Result for <strong>{keyword}: {type?.label} {">"} {attribute?.label}</strong>
                    </p>
                </div>
            </div>

            <div className="relative flex flex-col w-full h-full overflow-x-auto overflow-y-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr className="border-b border-warning-300 bg-slate-50">
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Name</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Details</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPlants?.map((plant) => (
                            <tr className="hover:bg-slate-50" key={plant.id}>
                                <td className="p-4 border-b border-warning-200 py-5">
                                    <p className="block font-semibold text-sm text-slate-800">
                                        {type?.value === 1 ? plant.Plant_Name : type?.value === 2 ? plant.BA_Name : type?.value === 3 ? plant.Chemical_Formula : plant.Chemical_Formula}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-warning-200 py-5 align-top">
                                    <p className="text-sm text-slate-500 break-words whitespace-pre-wrap max-w-md text-justify">
                                        {
                                            (attribute?.column_name !== 'All Attributes'
                                                ? plant[attribute?.column_name]
                                                : '-') ?? '-'
                                        }
                                        {/* {type?.value === 1
                                            ? plant[attribute?.column_name]
                                            : type?.value === 2
                                                ? truncate(plant.BA_Details, 30)
                                                : type?.value === 3
                                                    ? truncate(plant.IUPAC_Name, 30)
                                                    : ""} */}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-warning-200 py-5">
                                    <button onClick={() => handleSeeDetails(plant)} className="text-slate-500 hover:text-slate-700">
                                        See Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

PlantList.defaultProps = {
    color: "light",
};

PlantList.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
    searchResults: PropTypes.object,
    type: PropTypes.object,
    attribute: PropTypes.object,
    keyword: PropTypes.string,
};

export default PlantList;
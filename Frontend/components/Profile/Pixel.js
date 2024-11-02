import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Add20Filled, Delete20Filled } from "@fluentui/react-icons";
import { useDispatch } from "react-redux";
import { setDataPixel } from "@/redux/profile";
import { isObjEmpty, selectThemeColors } from "@/utils/index.js";
import Select, { components } from "react-select";
import Input from "../Fields/Input";

const initialPixel = {
    id: "",
    // name: "",
    action: "",
    event: "",
};

function Pixel({ dataCaleg }) {
    const dispatch = useDispatch();
    const [pixelList, setPixelList] = useState([initialPixel]);
    const [listPixelEvent] = useState(
        [
            { value: "AddPaymentInfo", label: "AddPaymentInfo" },
            { value: "AddToCart", label: "AddToCart" },
            { value: "AddToWishlist", label: "AddToWishlist" },
            { value: "CompleteRegistration", label: "CompleteRegistration" },
            { value: "Contact", label: "Contact" },
            { value: "CustomizeProduct", label: "CustomizeProduct" },
            { value: "Donate", label: "Donate" },
            { value: "FindLocation", label: "FindLocation" },
            { value: "InitiateCheckout", label: "InitiateCheckout" },
            { value: "Lead", label: "Lead" },
            { value: "Purchase", label: "Purchase" },
            { value: "Schedule", label: "Schedule" },
            { value: "Search", label: "Search" },
            { value: "StartTrial", label: "StartTrial" },
            { value: "SubmitApplication", label: "SubmitApplication" },
            { value: "Subscribe", label: "Subscribe" },
            { value: "ViewContent", label: "ViewContent" }
        ]
    );
    const [listPixelAction] = useState(
        [
            { value: "Detail", label: "Detail" },
            { value: "Aspirasi", label: "Aspirasi" },
        ]
    );

    const DropdownComponent = ({ data, ...props }) => (
        <components.Option {...props}>
            <div className="d-flex align-items-center cursor-pointer">
                <p className="mb-0">{data.label}</p>
            </div>
        </components.Option>
    );

    const handleAddPixel = () => {
        setPixelList([...pixelList, initialPixel]);
    };

    const handleDeletePixel = (index) => {
        const updatedList = pixelList.filter((_, i) => i !== index);
        setPixelList(updatedList);
    };

    const handlePixelFieldChange = (index, field, value) => {
        setPixelList((prevPixelList) => {
            const newList = [...prevPixelList];
            newList[index] = {
                ...newList[index],
                [field]: value,
            };
            return newList;
        });
    };

    useEffect(() => {
        if (dataCaleg) {
            const tempPixelIds = dataCaleg?.pixel_id;
            if (!isObjEmpty(tempPixelIds)) {
                setPixelList(tempPixelIds);
                dispatch(setDataPixel(tempPixelIds));
            } else {
                setPixelList([initialPixel]);
            }
        }
    }, [dataCaleg]);

    useEffect(() => {
        const nonEmptyPixelList = pixelList.filter((pixel) => pixel.id !== "");
        // console.log("ini pixel list", nonEmptyPixelList)
        dispatch(setDataPixel(nonEmptyPixelList));
    }, [pixelList]);

    return (
        <>
            {pixelList.map((pixel, index) => (
                <div key={index} className="w-full px-3 flex">
                    <div className="w-11/12">
                        <div className="mb-5">
                            <Input
                                label={`Pixel ID#${index + 1}`}
                                name={`pixel-${index}`}
                                type="text"
                                value={pixel.id}
                                placeholder="Masukkan Pixel Id"
                                onChange={(e) => handlePixelFieldChange(index, "id", e.target.value)}
                            />
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor={`pixel-action-${index}`} className="mb-3 block text-base font-medium text-[#07074D]">
                                        Pixel Action
                                    </label>
                                    <Select
                                        id={`pixel-action-${index}`}
                                        className={"react-select"}
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        options={listPixelAction}
                                        theme={selectThemeColors}
                                        value={pixel.action}
                                        onChange={(data) => handlePixelFieldChange(index, "action", data)}
                                        components={{ Option: DropdownComponent }}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor={`pixel-event-${index}`} className="mb-3 block text-base font-medium text-[#07074D]">
                                        Pixel Event
                                    </label>
                                    <Select
                                        id={`pixel-event-${index}`}
                                        className={"react-select"}
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        options={listPixelEvent}
                                        theme={selectThemeColors}
                                        value={pixel.event}
                                        onChange={(data) => handlePixelFieldChange(index, "event", data)}
                                        components={{ Option: DropdownComponent }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/12 flex place-items-center place-content-center">
                        {index === pixelList.length - 1 && (
                            <div className="flex mt-2 mr-2 cursor-pointer" onClick={handleAddPixel}>
                                <Add20Filled />
                            </div>
                        )}
                        {pixelList.length > 1 && (
                            <div className="flex mt-2 ml-2 cursor-pointer" onClick={() => handleDeletePixel(index)}>
                                <Delete20Filled />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

Pixel.propTypes = {
    dataCaleg: PropTypes.object,
};

export default Pixel;

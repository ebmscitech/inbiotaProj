import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPhoto } from "@/api/index.js";
import { useDropzone } from 'react-dropzone';
import Input from "../Fields/Input";
import { Add20Filled, Delete20Filled } from "@fluentui/react-icons";
import { useDispatch } from "react-redux";
import { setDataVisi } from "@/redux/profile";
import { isObjEmpty } from "@/utils/index";

function Visi({ dataCaleg }) {
    const dispatch = useDispatch()

    const [visiList, setVisiList] = useState([
        {
            description: ""
        }
    ]);

    const handleAddVisi = () => {
        setVisiList([
            ...visiList,
            {
                description: ""
            }
        ]);
    };

    const handleDeleteVisi = (index) => {
        const list = [...visiList];
        list.splice(index, 1);
        setVisiList(list);
    };

    const handleVisiChange = (index, value) => {
        setVisiList((prevVisiList) => {
            const newList = [...prevVisiList];
            newList[index] = {
                ...newList[index],
                description: value,
            };
            return newList;
        });
    };

    useEffect(() => {
        if (dataCaleg) {
            var tempVisi = dataCaleg?.visi;
            if (!isObjEmpty(tempVisi)) {
                // console.log("ini visi caleg", tempVisi)
                setVisiList(tempVisi)
                dispatch(setDataVisi(tempVisi))
            } else {
                // console.log("ini gada visi")
                setVisiList([
                    {
                        description: ""
                    }
                ])
            }
        }
    }, [dataCaleg]);

    useEffect(() => {
        const nonEmptyVisiList = visiList.filter(item => item.description !== "");
        dispatch(setDataVisi(nonEmptyVisiList));
    }, [visiList]);

    return (
        <>
            {visiList.map((visi, index) => (
                <>
                    <div key={index} className="w-4/5 px-3">
                        <div className="mb-5">
                            <Input
                                label={`Visi #${index + 1}`}
                                name={`visi-${index}`}
                                type="text"
                                value={visi.description}
                                placeholder="Masukkan Visi"
                                onChange={(e) => handleVisiChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-1/5 px-3 self-center flex">
                        {index === visiList.length - 1 ? (
                            <>
                                <div className="mt-2 mr-4 cursor-pointer" onClick={handleAddVisi}>
                                    <Add20Filled />
                                </div>
                            </>
                        ) : null}
                        {visiList.length > 1 && (
                            <div className="mt-2 cursor-pointer" onClick={() => handleDeleteVisi(index)}>
                                <Delete20Filled />
                            </div>
                        )}
                    </div>
                </>
            ))}
        </>
    );
}

Visi.propTypes = {
    dataCaleg: PropTypes.object,
};

export default Visi;

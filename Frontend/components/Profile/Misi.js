import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPhoto } from "@/api/index.js";
import { useDropzone } from 'react-dropzone';
import Input from "../Fields/Input";
import { Add20Filled, Delete20Filled } from "@fluentui/react-icons";
import { useDispatch } from "react-redux";
import { setDataMisi } from "@/redux/profile";
import { isObjEmpty } from "@/utils/index";

function Misi({ dataCaleg }) {
    const dispatch = useDispatch()

    const [misiList, setMisiList] = useState([
        {
            description: ""
        }
    ]);

    const handleAddMisi = () => {
        setMisiList([
            ...misiList,
            {
                description: ""
            }
        ]);
    };

    const handleDeleteMisi = (index) => {
        const list = [...misiList];
        list.splice(index, 1);
        setMisiList(list);
    };

    const handleMisiChange = (index, value) => {
        setMisiList((prevMisiList) => {
            const newList = [...prevMisiList];
            newList[index] = {
                ...newList[index],
                description: value,
            };
            return newList;
        });
    };

    useEffect(() => {
        if (dataCaleg) {
            var tempMisi = dataCaleg?.misi;
            if (!isObjEmpty(tempMisi)) {
                // console.log("ini misi caleg", tempMisi)
                setMisiList(tempMisi)
                dispatch(setDataMisi(tempMisi))
            } else {
                // console.log("ini gada misi")
                setMisiList([
                    {
                        description: ""
                    }
                ])
            }
        }
    }, [dataCaleg]);

    useEffect(() => {
        const nonEmptyMisiList = misiList.filter(item => item.description !== "");
        dispatch(setDataMisi(nonEmptyMisiList));
    }, [misiList]);

    return (
        <>
            {misiList.map((misi, index) => (
                <div key={index} className="w-full px-3 flex">
                    <div className="w-4/5">
                        <div className="mb-5">
                            <Input
                                label={`Misi #${index + 1}`}
                                name={`misi-${index}`}
                                type="text"
                                value={misi.description}
                                placeholder="Masukkan Misi"
                                onChange={(e) => handleMisiChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-1/5 self-center px-6 flex">
                        {index === misiList.length - 1 ? (
                            <>
                                <div className="mt-2 mr-4 cursor-pointer" onClick={handleAddMisi}>
                                    <Add20Filled />
                                </div>
                            </>
                        ) : null}
                        {misiList.length > 1 && (
                            <div className="mt-2 cursor-pointer" onClick={() => handleDeleteMisi(index)}>
                                <Delete20Filled />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

Misi.propTypes = {
    dataCaleg: PropTypes.object,
};

export default Misi;

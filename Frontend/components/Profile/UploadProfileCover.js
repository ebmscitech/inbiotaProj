import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPhoto } from "@/api/index.js";
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setDataCoverProfile } from "@/redux/profile";
import { isObjEmpty } from "@/utils/index";

function UploadProfileCover({ dataCaleg }) {
    const dispatch = useDispatch()

    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [listCover, setListCover] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            setFile(acceptedFiles[0]);
            dispatch(setDataCoverProfile(acceptedFiles[0]))
            setUploaded(false);
        }
    });

    // const handleUploadFile = () => {
    //     if (file) {
    //         uploadDataPhoto(file);
    //     }
    // };

    const handleRemoveFile = () => {
        setFile(null);
        setUploaded(false);
        dispatch(setDataCoverProfile(null))
    };

    // function uploadDataPhoto(file) {
    //     const formData = new FormData();
    //     formData.append("data", file);

    //     uploadPhoto(formData)
    //         .then((res) => {
    //             const path = res.data.data;
    //             console.log("Uploaded path:", path);
    //             setUploaded(true);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             // Handle upload error
    //         });
    // }

    useEffect(() => {
        setUploaded(false);
        console.log("ini file", file)
        // setListCover(tempCover[0])
    }, [file]);

    useEffect(() => {
        if (dataCaleg) {
            var tempCover = dataCaleg?.cover;
            // console.log("ini temp cover", tempCover)
            if (tempCover && tempCover.length > 0) {
                // console.log("ini temp cover", tempCover[0])
                setListCover(tempCover[0]);
                dispatch(setDataCoverProfile(tempCover[0]))
            } else {
                dispatch(setDataCoverProfile(null))
                setListCover([])
            }
        }
    }, [dataCaleg]);

    return (
        <div className='mb-4'>
            <label htmlFor='cityMulti' className='block text-gray-700 mb-5'>
                Profile Cover
            </label>
            <div className="grid sm:flex mb-5 justify-center">
                <div className="w-1/2 grid items-center">
                    <div {...getRootProps({ className: 'border rounded-md dropzone upload-drop-field py-4' })}>
                        <input {...getInputProps()} />
                        <div className='flex items-center justify-center flex-col' onClick={(e) => e.preventDefault()}>
                            <h6>Drop photo here or click to upload</h6>
                            <p className='text-tertiary text-center text-xs'>
                                Drop files here or click
                                <a href='#' onClick={(e) => e.preventDefault()}>
                                    browse
                                </a>
                                through your machine
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mb-5 flex justify-center ${!isObjEmpty(listCover) || file ? "" : "hidden"}`}>
                <img
                    className={`w-full max-w-4xl mx-auto overflow-hidden object-contain ${file ? "max-h-96" : "h-auto"}`}
                    src={file ? URL.createObjectURL(file) : (listCover ? listCover : "/assets/profile-cover.svg")}
                    alt="Profile Cover"
                />
            </div>
            <div className="mb-5 flex justify-center">
                {file && (
                    <button onClick={handleRemoveFile} className='text-primary-500 border border-primary-500 px-2 py-1 rounded '>
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}

UploadProfileCover.propTypes = {
    dataCaleg: PropTypes.object,
};

export default UploadProfileCover;

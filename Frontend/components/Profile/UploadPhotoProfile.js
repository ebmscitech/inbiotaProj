import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPhoto } from "@/api/index.js";
import { useDropzone } from 'react-dropzone';
import { useDispatch } from "react-redux";
import { setDataPhotoProfile } from "@/redux/profile";
import { noValue } from "@/utils/validateInput";

function UploadPhotoProfile({ dataCaleg }) {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);
    // const [uploaded, setUploaded] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            setFile(acceptedFiles[0]);
            dispatch(setDataPhotoProfile(acceptedFiles[0]))
            // setUploaded(false);
        }
    });

    // const handleUploadFile = () => {
    //     if (file) {
    //         uploadDataPhoto(file);
    //     }
    // };

    const handleRemoveFile = () => {
        setFile(null);
        // setUploaded(false);
        dispatch(setDataPhotoProfile(null))
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

    // useEffect(() => {
    //     setUploaded(false);
    // }, [file]);

    useEffect(() => {
        if (dataCaleg) {
            var tempPhoto = dataCaleg?.profile_picture;
            if (!noValue(tempPhoto)) {
                dispatch(setDataPhotoProfile(tempPhoto))
            }
        }
    }, [dataCaleg]);

    return (
        <div className='mb-4'>
            <label htmlFor='cityMulti' className='block text-gray-700'>
                Profile Picture
            </label>
            <div className="grid sm:flex">
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
                <div className="w-1/2 grid justify-center">
                    <img
                        className="w-48 h-48 rounded-full mx-auto object-cover object-center"
                        src={file ? URL.createObjectURL(file) : (dataCaleg?.profile_picture ? dataCaleg?.profile_picture : "/assets/avatar-no-image.png")}
                        alt="Profile picture"
                    />
                    <div className="flex mt-5 justify-center">
                        {file && (
                            <button onClick={handleRemoveFile} className='text-primary-500 border border-primary-500 px-2 py-1 rounded '>
                                Remove
                            </button>
                        )}
                        {/* {file && (
                            <button onClick={handleUploadFile} disabled={!file || uploaded} className='text-primary-500 border border-primary-500 px-2 py-1 rounded'>
                                {!file || uploaded ? "Uploaded" : "Upload"}
                            </button>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

UploadPhotoProfile.propTypes = {
    dataCaleg: PropTypes.object,
};

export default UploadPhotoProfile;

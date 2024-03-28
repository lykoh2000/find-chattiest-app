'use client';
import { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["TXT"];

const FileUpload = ({ onResultReceived }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = file => {
        setFile(file);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                if (data.status == 200) {
                    onResultReceived(data.data);
                } else {
                    onResultReceived(null);
                    alert(data.message);
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <FileUploader
                handleChange={handleFileChange}
                name="file"
                label="Drop file here or click to upload"
                types={fileTypes}
            />
            <button style={{ marginTop: '10px' }} onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;

import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React from "react";
import { uploadImageBatch } from "../service/batch";

const props = {
  name: "file",
  multiple: true,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const { Dragger } = Upload;

const UploadImage = (files, imageList, setImageList) => {
  const uploadImage = (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("files", file);

    uploadImageBatch(formData, (res) => {
      if (res.data !== null) {
        files.push(res[0]?.id);
        console.log(res[0].id);
        setExampleImage(res[0]?.url);
        setImageList([...imageList, ...files]);
      }
    });
  };

  console.log(imageList);
  return (
    <Dragger
      {...props}
      customRequest={uploadImage}
      showUploadList={false}
      multiple={true}
      style={{
        marginBottom: "20px",
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};
export default UploadImage;

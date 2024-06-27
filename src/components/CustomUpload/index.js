import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./style.scss";
import { patchUser } from "../../services/user";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { loginAction } from "../../redux/actions";
function CustomUpload({ user }) {
  const [url, setUrl] = useState(user.avatar || defaultAvatar);
  const [load, setLoad] = useState(false);
  return (
    <>
      <ImgCrop
        rotationSlider
        showReset
        modalOk="Tải lên"
        modalCancel="Hủy"
        resetText="Làm mới"
        modalTitle="Chỉnh sửa ảnh đại diện"
      >
        <Upload
          disabled={load}
          showUploadList={false}
          className="Upload"
          action={async (file) => {
            const fetchApi = async () => {
              setLoad(true);
              const response = await patchUser({ avatar: file });
              setUrl(response.data.avatar);
              setLoad(false);
            };
            fetchApi();
          }}
        >
          <div className="Image">
            <img src={url} />
            <div className={load ? "before load" : "before"}>
              {load ? <LoadingOutlined /> : "Tải ảnh lên"}
            </div>
          </div>
        </Upload>
      </ImgCrop>
    </>
  );
}

export default CustomUpload;

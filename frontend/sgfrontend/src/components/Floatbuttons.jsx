import React from "react";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { QuestionCircleOutlined, FileTextOutlined, EllipsisOutlined, ReloadOutlined} from "@ant-design/icons";

function Floatbuttons() {
    const navigate = useNavigate();

    const handleHelpClick = () => {
      navigate('/questions');
    };
  
    return (
      <div>
        <FloatButton.Group type="primary" trigger="hover" shape="circle" icon={<EllipsisOutlined />}>
          <FloatButton icon={<QuestionCircleOutlined />} tooltip="Help" onClick={handleHelpClick} />
          <FloatButton icon={<FileTextOutlined />} tooltip="Docs" />
          <FloatButton icon={<ReloadOutlined />} tooltip="Reload page" onClick={() => {window.location.reload()}}/>
        </FloatButton.Group>
      </div>
    );
}

export default Floatbuttons;
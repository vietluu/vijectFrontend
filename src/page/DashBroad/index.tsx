import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { Form, Input, Modal, message } from "antd";
import { Project } from "../../types/project";
import {
  createProjectRequest,
  getProjectRequest,
} from "../../redux/project/thunk";
import { projectSelector } from "../../redux/project/selector";
import { NavLink } from "react-router-dom";
import ButtonCustom from "../../component/ButtonCustom";

function Dashbroad() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const { loading, project } = useAppSelector(projectSelector);
  const handleCreateProject = (values: Partial<Project>) => {
    dispatch(createProjectRequest(values)).then((res) => {
      if (res.type === "project/thunk/createProject/fulfilled") {
        setOpenModal(false);
        message.success("Tạo dự án thành công");
        dispatch(getProjectRequest());
      } else message.error("Tạo dự án thất bại");
    });
  };
  return (
    <>
      <Modal
        title="Tạo dự án"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => {
          form.submit();
        }}
        okButtonProps={{ className: "bg-sky-500 text-white" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(e: Partial<Project>) => handleCreateProject(e)}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dự án",
              },
            ]}
            name="projectName"
            label="Tên dự án"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả",
              },
            ]}
            name="description"
            label="Mô tả"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <div className="border-b border-gray-400 py-6 flex flex-row items-center justify-between px-10">
        <h2 className="text-3xl">Công việc của bạn</h2>
        <ButtonCustom
          type="primary"
          loading={loading[createProjectRequest.typePrefix]}
          onClick={() => setOpenModal(true)}>
          Tạo dự án
        </ButtonCustom>
      </div>
      <div>
        {project?.map((item, index) => {
          return (
            <NavLink
      
              to={`/${item._id}`}
              key={index}
              className="border-b border-gray-400 py-6 px-10"
            >
              <h3 className="text-xl">{item.projectName}</h3>
              <p>{item.description}</p>
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default Dashbroad;

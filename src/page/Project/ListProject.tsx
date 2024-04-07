import  { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { Form, Input, Modal, message, Tabs } from 'antd'
import { Project } from '../../types/project'
import {
    createProjectRequest,
    getProjectRequest,
} from '../../redux/project/thunk'
import { projectSelector } from '../../redux/project/selector'
import { NavLink } from 'react-router-dom'
import ButtonCustom from '../../component/ButtonCustom'
import type { TabsProps } from 'antd/lib'

const item: TabsProps['items'] = [
    {
        key: '1',
        label: 'Công việc đã tạo',
    },
    {
        key: '2',
        label: 'Công việc được giao',
    },
    {
        key: '3',
        label: 'Đang thực hiện',
    },
    {
        key: '4',
        label: 'Hoàn thành',
    },
]
function ListProject() {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const [openModal, setOpenModal] = useState(false)
    const { loading, project } = useAppSelector(projectSelector)
    const handleCreateProject = (values: Partial<Project>) => {
        dispatch(createProjectRequest(values)).then((res) => {
            if (res.type === 'project/thunk/createProject/fulfilled') {
                setOpenModal(false)
                message.success('Tạo dự án thành công')
                dispatch(getProjectRequest())
            } else message.error('Tạo dự án thất bại')
        })
    }
    return (
        <>
            <Modal
                title="Tạo dự án"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={() => {
                    form.submit()
                }}
                okButtonProps={{ className: 'bg-sky-500 text-white' }}
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
                                message: 'Vui lòng nhập tên dự án',
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
                                message: 'Vui lòng nhập mô tả',
                            },
                        ]}
                        name="description"
                        label="Mô tả"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
            <div className="border-b border-gray-400 py-6 flex flex-row items-center justify-between px-3 md:px-7">
                <h2 className="text-3xl">Công việc của bạn</h2>
                <ButtonCustom
                    type="primary"
                    loading={loading[createProjectRequest.typePrefix]}
                    onClick={() => setOpenModal(true)}
                >
                    Tạo dự án
                </ButtonCustom>
            </div>
            <div className="px-4">
                <div className="flex flex-row items-center px-3 pt-4 pb-2 justify-between">
                    <h3 className="font-bold text-xl">Dự án gần đây</h3>
                </div>
                <div className="flex flex-wrap flex-row gap-2">
                    {project?.map((item, index) => {
                        return (
                            <NavLink
                                to={`/${item._id}`}
                                key={index}
                                className="before:content-normal overflow-hidden before:absolute before:top-0 before:z-[-1] before:left-0 before:w-3 before:bg-red-400 before:h-full relative text-black py-2 pl-5 pr-2 border m-2 rounded-md border-gray-300  shadow-sm inline-block  max-w-[230px] w-full"
                            >
                                <h3 className="text-xl text-blue-500">
                                    {item.projectName}
                                </h3>
                                <p className="text-[12px] text-gray-700">
                                    Team manager software
                                </p>
                                <p className="text-gray-500 py-1 ">
                                    Thông tin nhanh
                                </p>
                                <p className="text-sm py-1 flex flex-row justify-between text-gray-700">
                                    Công việc:{' '}
                                    <span className="text-gray-600 text-[10px] px-1 rounded-full bg-slate-200">
                                        10
                                    </span>
                                </p>
                                <p className="text-sm flex flex-row justify-between text-gray-700">
                                    Thành viên:{' '}
                                    <span className="text-gray-600 text-[10px] px-1 rounded-full bg-slate-200">
                                        {item.members.length}
                                    </span>
                                </p>
                            </NavLink>
                        )
                    })}
                </div>
                <Tabs items={item} className="mt-4 px-3" />
            </div>
        </>
    )
}

export default ListProject

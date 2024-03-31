import { Button, Form, Input, Select, message } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { projectSelector } from '../../redux/project/selector'
import {
    deleteProjectRequest,
    getProjectByIdRequest,
    getProjectRequest,
    updateProjectRequest,
    changeOwner as updateOwner,
} from '../../redux/project/thunk'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../navigation/routers'
import ConfirmModal from '../../component/ConfirmModal'

const Setting = () => {
    const [form] = Form.useForm()
    const [changeProject, setChangeProject] = useState(false)
    const [changeDescription, setChangeDescription] = useState(false)
    const [changeOwner, setChangeOwner] = useState(false)
    const { projectSelected, loading } = useAppSelector(projectSelector)
    const dispatch = useAppDispatch()
    const { projectId } = useParams<{ projectId: string }>()
    const navigate = useNavigate()

    const handleUpdate = (data: {
        projectName: string
        description: string
    }) => {
        const req = {
            id: projectId,
            data: {
                projectName: data.projectName,
                description: data.description,
            },
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(updateProjectRequest(req)).then((res) => {
            if (res.type === 'project/thunk/updateProject/fulfilled') {
                message.success('Cập nhật thành công')
                setChangeProject(false)
                setChangeDescription(false)
                dispatch(getProjectRequest())
                dispatch(getProjectByIdRequest(projectId ?? ''))
            }
        })
    }

    const handleDeleteProject = () => {
        if (projectId) {
            dispatch(deleteProjectRequest(projectId)).then((res) => {
                if (res.type === 'project/thunk/deleteProject/fulfilled') {
                    message.success('Xóa dự án thành công')
                    navigate(routes.Home.path)
                }
            })
        }
    }
    const handleChagneOwner = (data: { creatorId: string }) => {
        dispatch(
            updateOwner({ projectId: projectId ?? '', email: data.creatorId })
        ).then((res) => {
            if (res.type === 'project/thunk/changeOwner/fulfilled') {
                message.success('Thay đổi trưởng nhóm thành công')
                setChangeOwner(false)
                dispatch(getProjectRequest())
                dispatch(getProjectByIdRequest(projectId ?? ''))
                window.location.pathname = `/project/${projectId}`
            }
        })
    }
    
    return (
        <div className="p-3">
            <h1 className="border-b border-gray-400 pb-4">Cài đặt dự án</h1>
            <div className="py-3">
                <div className="flex gap-2 items-center">
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={(e) => handleUpdate(e)}
                        initialValues={{
                            projectName: projectSelected?.projectName,
                        }}
                    >
                        <div className="flex gap-3 items-center">
                            <Form.Item
                                label={<span className='text-xl'>Tên dự án</span>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên dự án',
                                    },
                                ]}
                                name="projectName"
                            >
                                <Input
                                    disabled={!changeProject}
                                    className="disabled:text-black rounded-md text-black"
                                />
                            </Form.Item>
                            {!changeProject && (
                                <Button
                                    type="text"
                                    onClick={() => setChangeProject(true)}
                                    className="mt-2 bg-transparent text-blue-600"
                                >
                                    Thay đổi
                                </Button>
                            )}
                        </div>
                        {changeProject && (
                            <div className="text-right">
                                <Button
                                    type="default"
                                    loading={
                                        loading[updateProjectRequest.typePrefix]
                                    }
                                    danger
                                    onClick={() => ConfirmModal({
                                        title: 'Lưu thay đổi?',
                                        content: 'Bạn có chắc chắn muốn lưu thay đổi?',
                                        onOk: () => form.submit()
                                    })}
                                    className="mt-2"
                                >
                                    Lưu
                                </Button>
                                <Button
                                    type="default"
                                    onClick={() => setChangeProject(false)}
                                    className="mt-2 bg-transparent text-blue-600"
                                >
                                    Hủy
                                </Button>
                            </div>
                        )}
                    </Form>
                </div>
                <div className="flex gap-2 items-center">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={(e) => handleUpdate(e)}
                        initialValues={{
                            description: projectSelected?.description,
                        }}
                    >
                        <div className="flex gap-3 items-center">
                            <Form.Item
                                label={<span className='text-xl'>Thông tin dự án</span>}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập thông tin dự án',
                                    },
                                ]}
                                name="description"
                            >
                                <Input.TextArea
                                    rows={3}
                                    cols={50}
                                    disabled={!changeDescription}
                                    className="!resize-none disabled:text-black rounded-md text-black"
                                />
                            </Form.Item>
                            {!changeDescription && (
                                <Button
                                    type="text"
                                    onClick={() => setChangeDescription(true)}
                                    className="mt-2 bg-transparent text-blue-600"
                                >
                                    Thay đổi
                                </Button>
                            )}
                        </div>
                        {changeDescription && (
                            <div className="text-right">
                                <Button
                                    type="default"
                                    loading={
                                        loading[updateProjectRequest.typePrefix]
                                    }
                                    danger
                                    onClick={() => ConfirmModal({
                                        title: 'Lưu thay đổi?',
                                        content: 'Bạn có chắc chắn muốn lưu thay đổi?',
                                        onOk: () => form.submit()
                                    })}
                                    className="mt-2"
                                >
                                    Lưu
                                </Button>
                                <Button
                                    type="default"
                                    onClick={() => setChangeDescription(false)}
                                    className="mt-2 bg-transparent text-blue-600"
                                >
                                    Hủy
                                </Button>
                            </div>
                        )}
                    </Form>
                </div>
                <p className="py-3">
                    <Button danger onClick={() => setChangeOwner(true)}>
                        Thay đổi trưởng nhóm dự án{' '}
                    </Button>
                </p>
                {changeOwner ? (
                    <Form
                        layout="vertical"
                        form={form}
                        className="max-w-[200px]"
                        onFinish={(e) => handleChagneOwner(e)}
                        initialValues={{}}
                    >
                        <Form.Item name="creatorId">
                            <Select optionLabelProp="label">
                                {projectSelected?.members.map(
                                    (member, index) => (
                                        <Select.Option
                                            label={member.email}
                                            key={index}
                                            value={member.email}
                                        >
                                            {
                                                <div className="flex gap-2 items-center">
                                                    <img
                                                        src={
                                                            member.image ??
                                                            '/img/anonymous.webp'
                                                        }
                                                        alt={member.fullName}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <span className="ml-2">
                                                        {member.fullName}
                                                    </span>
                                                </div>
                                            }
                                        </Select.Option>
                                    )
                                )}
                            </Select>
                        </Form.Item>
                        <div className="text-righ pb-3">
                            <Button
                                type="default"
                                loading={loading[updateOwner.typePrefix]}
                                danger
                                onClick={() => ConfirmModal({
                                    title: 'Thay đổi trưởng nhóm',
                                    content: 'Bạn có chắc chắn muốn thay đổi trưởng nhóm?',
                                    onOk: () => form.submit()
                                
                                })}
                            >
                                Lưu
                            </Button>
                            <Button
                                type="default"
                                onClick={() => setChangeOwner(false)}
                                className="bg-transparent text-blue-600"
                            >
                                Hủy
                            </Button>
                        </div>
                    </Form>
                ) : null}
                <p>
                    <Button
                        loading={loading[deleteProjectRequest.typePrefix]}
                        onClick={() => ConfirmModal({
                            title: 'Xóa dự án',
                            content: 'Bạn có chắc chắn muốn xóa dự án?',
                            onOk: () => handleDeleteProject()
                        })}
                        danger
                    >
                        Xóa dự án
                    </Button>
                </p>
            </div>
        </div>
    )
}

export default Setting

/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { projectSelector } from '../../redux/project/selector'
import { Avatar, Empty, Form, Modal, Select, Spin, message } from 'antd'
import { userSelector } from '../../redux/user/selector'
import { user } from '../../types/user'
import { getUserByEmail } from '../../services/user.service'
import _ from 'lodash'
import {
    addProjectMember,
    getProjectByIdRequest,
    getProjectRequest,
    removeProjectMember,
} from '../../redux/project/thunk'
import { useParams } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import ConfirmModal from '../../component/ConfirmModal'
import { getTasks } from '../../redux/task/thunk'

type Res = {
    status: number
    data: user[]
}



const Member = () => {
    const { projectSelected, loading } = useAppSelector(projectSelector)
    const { userInfo } = useAppSelector(userSelector)
    const [openModal, setOpenModal] = React.useState(false)
    const [userlist, setUserList] = React.useState([] as user[])
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const { projectId } = useParams<{ projectId: string }>()

    const handleSearchMember = async (email: string) => {
        const res: Res = await getUserByEmail({ email: email })
        if (res?.status === 200) {
            setUserList(res.data)
        }
    }

    const handleAddMember = (value: { email: string }) => {
        if (value.email && projectId) {
            dispatch(
                addProjectMember({
                    projectId: projectSelected?._id ?? '',
                    email: value.email,
                })
            ).then((res) => {
                if (res.type === 'project/thunk/addMember/fulfilled') {
                    message.success('Thêm thành viên thành công')
                    dispatch(getProjectRequest())
                    dispatch(getProjectByIdRequest(projectId))
                    setOpenModal(false)
                } else {
                    if (res.type === 'project/thunk/addMember/rejected')
                        message.error('Thêm thành viên thất bại')
                }
            })
        }
    }
    const handleRemoveMember = (email: string) => {
        if (projectId) {
            dispatch(
                removeProjectMember({
                    projectId: projectSelected?._id ?? '',
                    email: email,
                })
            ).then((res) => {
                console.log(res)
                if (res.type === 'project/thunk/removeMember/fulfilled') {
                    message.success('Xóa thành viên thành công')
                    dispatch(getProjectByIdRequest(projectId))
                    dispatch(getTasks({ projectId, params: {} }))
                }
            })
        }
    }
    return (
        <div className="p-3">
            <h1 className="border-b border-gray-400 pb-4">
                Thành viên trong dự án
            </h1>
            <Modal
                okButtonProps={{
                    className: 'bg-sky-500',
                    loading: loading[addProjectMember.typePrefix],
                }}
                title="Thêm thành viên vào dự án"
                centered
                onOk={form.submit}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                destroyOnClose
            >
                <Form
                    id="form"
                    onFinish={(e) => handleAddMember(e)}
                    form={form}
                >
                    <Form.Item name="email">
                        <Select
                            showSearch
                            placeholder={'Nhập email'}
                            defaultActiveFirstOption={false}
                            suffixIcon={null}
                            className="w-full mt-4"
                            filterOption={false}
                            onSearch={_.debounce(
                                (e) => handleSearchMember(e),
                                500
                            )}
                            onChange={_.debounce(
                                (e) => handleSearchMember(e),
                                500
                            )}
                            notFoundContent={
                                <Empty description="Không có dữ liệu" />
                            }
                            optionLabelProp="label"
                        >
                            {userlist.length > 0 &&
                                userlist?.map((option, index) => (
                                    <Select.Option
                                        key={index}
                                        value={option.email}
                                        label={option.email}
                                    >
                                        <div className="flex gap-2">
                                            <Avatar
                                                src={
                                                    option.image ??
                                                    '/img/anonymous.webp'
                                                }
                                                size={'large'}
                                                alt="avatar"
                                            />
                                            <div>
                                                <p className="text-md">
                                                    {option.email}
                                                </p>
                                                <p className="text-[12px]">
                                                    {option.fullName}
                                                </p>
                                            </div>
                                        </div>
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="flex flex-row gap-2  py-3 h-full">
                <div className="flex-auto">
                    <p className="text-lg py-1 flex flex-row items-center justify-between">
                        Thành viên trong dự án (
                        {projectSelected?.members.length})
                        <span
                            onClick={() => setOpenModal(true)}
                            className="text-white inline-block rounded-md cursor-pointer p-2 bg-blue-500"
                        >
                            Thêm thành viên
                        </span>
                    </p>
                    {projectSelected && projectSelected?.members?.length > 0 ? (
                        projectSelected?.members?.map((member) => {
                            return (
                                <div
                                    key={member._id}
                                    className="flex gap-2 items-center py-2"
                                >
                                    <Avatar
                                        src={member.image}
                                        size={'large'}
                                        alt="avatar"
                                    />
                                    <div>
                                        <p className="text-lg">
                                            {member.email}
                                        </p>
                                        <p className="text-sm">
                                            {member.fullName}
                                        </p>
                                    </div>
                                    <span className="inline-block p-1  rounded-md bg-slate-300">
                                        {member?._id ===
                                        projectSelected.creator_id
                                            ? 'owner'
                                            : 'member'}
                                    </span>
                                    {member?._id !== userInfo?._id ? (
                                        <span
                                            onClick={() =>  ConfirmModal({
                                                    title: 'Xóa thành viên',
                                                    content: `Bạn có chắc chắn muốn xóa ${member.email} khỏi dự án?`,
                                                    onOk: () => handleRemoveMember(member.email)
                                                
                                               })
                                                 
                                            }
                                            className="text-red-500"
                                        >
                                            <DeleteOutlined />
                                        </span>
                                    ) : null}
                                </div>
                            )
                        })
                    ) : (
                        <Spin spinning fullscreen />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Member

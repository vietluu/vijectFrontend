import { Avatar, Button, Form, Input, Modal, Select, Tag, message } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { TaskReducer } from '../../../redux/task/selector'
import { projectSelector } from '../../../redux/project/selector'
import { userSelector } from '../../../redux/user/selector'
import { CreateTask } from '../../../types/task'
import { createTask, getTasks } from '../../../redux/task/thunk'
import { labelReducer } from '../../../redux/label/selector'

const CreateTask = ({ projectId }: { projectId: string }) => {
    const [openModal, setOpenModal] = React.useState(false)
    const { priorities, statuses, loading } = useAppSelector(TaskReducer)
    const { projectSelected } = useAppSelector(projectSelector)
    const { userInfo } = useAppSelector(userSelector)
    const {label} = useAppSelector(labelReducer)
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const handleCreateTask = (data: CreateTask) => { 

        const req:CreateTask = {
            ...data,
            projectId: projectId,
            creatorId: userInfo?._id ?? '',
        }

        dispatch(createTask({ projectId, data: req })).then((res) => {
            if (res.type === 'task/createTask/fulfilled') {
                message.success('Tạo công việc thành công')
                setOpenModal(false)
                dispatch(getTasks({ projectId, params: { page: 1 } }))
            }
            else {
                if (res.type === 'task/createTask/rejected')
                    message.error('Tạo công việc thất bại')
            }
        
        })
    }
    return (
        <div>
            <Modal title="Tạo công việc" centered open={openModal} onCancel={() => setOpenModal(false)}
                okButtonProps={{className:'bg-sky-500 text-white'}}
            onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={(e:CreateTask) => handleCreateTask(e)}
                >
                    <Form.Item
                        name="taskName"
                        label="Tên công việc"
                        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                    >
                        <Input placeholder='Công việc' />

                    </Form.Item>
                   {label?.length && userInfo?._id === projectSelected?.creator_id &&  <Form.Item
                        name="labelId"
                        label="Nhãn"
                    >
                        <Select
                            className='!w-max'
                            placeholder='Nhãn'
                            optionLabelProp="label"
                        >
                            {label?.map((item, index) => (
                                <Select.Option key={index} value={item._id} label={
                                    <Tag color={item.color}>
                                        {item.labelName}
                                    </Tag>
                                }>
                                    <Tag color={item.color}>
                                        {item.labelName}
                                    </Tag>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>}
                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <Input placeholder='Mô tả' />
                    </Form.Item>
                    <Form.Item
                        name="priorityId"
                        label="Độ ưu tiên"
                    >
                        <Select
                            className='!w-max'
                            placeholder='Độ ưu tiên'
                            optionLabelProp="label"

                        >
                            {priorities?.map((item, index) => (
                                <Select.Option key={index} value={item._id} label={
                                    <Tag color={item.color}>
                                        {item.priorityName}
                                    </Tag>
                                }>
                                    <Tag color={item.color}>
                                        {item.priorityName}
                                    </Tag>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="statusId"
                        label="Trạng thái"
                    >
                        <Select placeholder='Trạng thái'
                            optionLabelProp="label"
                            className='!w-max'
                        >
                            {statuses?.map((item, index) => (
                                <Select.Option key={index} value={item._id} label={
                                    <Tag color={item.color}>
                                        {item.statusName}
                                    </Tag>
                                }>
                                    <Tag color={item.color}>
                                        {item.statusName}
                                    </Tag>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="assignedTo"
                        label="Người thực hiện">
                        <Select placeholder='Người thực hiện'
                            className='!h-auto'
                            optionLabelProp="label"

                        >
                            {projectSelected?.members.map((member, index) => (
                                <Select.Option key={index} value={member._id}
                                    label={
                                        <div
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
                                        </div>
                                    }
                                >
                                    <div
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
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <div>
                        <h4>Người tạo</h4>
                        <div
                            className="flex gap-2 items-center py-2"
                        >
                            <Avatar
                                src={userInfo?.image}
                                size={'large'}
                                alt="avatar"
                            />
                            <div>
                                <p className="text-lg">
                                    {userInfo?.email}
                                </p>
                                <p className="text-sm">
                                    {userInfo?.fullName}
                                </p>
                            </div>
                        </div>
                    </div>

                </Form>
            </Modal>
            <div className='flex justify-end p-2'>
                <Button loading={loading[createTask.typePrefix]} className='text-white bg-sky-500' onClick={() => setOpenModal(true)}>Tạo công việc</Button>
            </div>
        </div>
    )
}

export default CreateTask
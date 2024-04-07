import { Avatar, Button, DatePicker, Drawer, Form, Input, Popconfirm, Select, Space, Spin, Tag, message } from 'antd'
import  { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { TaskReducer } from '../../../redux/task/selector';
import { resetTaskSelected } from '../../../redux/task/slice';
import { CreateTask, Subtask } from '../../../types/task';
import { projectSelector } from '../../../redux/project/selector';
import { userSelector } from '../../../redux/user/selector';
import { labelReducer } from '../../../redux/label/selector';
import { createSubTask, deleteTask, getTaskById, updateTask, updateSubTask, deleteSubTask } from '../../../redux/task/thunk';


const TaskPopup = () => {
    const { taskSelected } = useAppSelector(TaskReducer);
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const { priorities, statuses, loading } = useAppSelector(TaskReducer)
    const { projectSelected } = useAppSelector(projectSelector)
    const { userInfo } = useAppSelector(userSelector)
    const { label } = useAppSelector(labelReducer)
    const [form] = Form.useForm()

    useEffect(() => {
        if (taskSelected?.taskName) {
            form.setFieldsValue({
                taskName: taskSelected?.taskName,
                labelId: taskSelected?.labelId?._id,
                description: taskSelected?.description,
                priorityId: taskSelected?.priorityId?._id,
                statusId: taskSelected?.statusId?._id,
                assignedTo: taskSelected?.assignedTo?._id,
            })
        }
    }, [form, taskSelected?.assignedTo?._id, taskSelected?.description, taskSelected?.labelId?._id, taskSelected?.priorityId?._id, taskSelected?.statusId?._id, taskSelected?.taskName])
    const handleUpdateTask = (data: CreateTask) => {

        const req: CreateTask = {
            ...data,
            projectId: projectSelected?._id ?? '',
            creatorId: userInfo?._id ?? '',
        }

        dispatch(updateTask({ taskId: taskSelected?._id ?? '', projectId: projectSelected?._id ?? '', data: req })).then((res) => {
            if (res.type === 'task/updateTask/fulfilled') {
                message.success('Tạo công việc thành công')
                dispatch(getTaskById({ taskId: taskSelected?._id ?? '', projectId: projectSelected?._id ?? '' }))
                setOpen(false)
            }
            else {
                if (res.type === 'task/updateTask/rejected')
                    message.error('Tạo công việc thất bại')
            }

        })
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask({ taskId: taskSelected?._id ?? '', projectId: projectSelected?._id ?? '' })).then((res) => {
            if (res.type === 'task/deleteTask/fulfilled') {
                message.success('Xóa công việc thành công')
                dispatch(resetTaskSelected())
            }
            else {
                if (res.type === 'task/deleteTask/rejected')
                    message.error('Xóa công việc thất bại')
            }
        })
    }
    const handleCreateSubTask = (name: string) => { 
        const data = {
            name,
            status: false,
            taskId: taskSelected?._id ?? ''
        }
        dispatch(createSubTask({ projectId: projectSelected?._id ?? '', data })).then((res) => {
            if (res.type === 'task/createSubTask/fulfilled') {
                message.success('Tạo công việc thành công')
                setOpen(false)
            }
            else {
                if (res.type === 'task/createSubTask/rejected')
                    message.error('Tạo công việc thất bại')
            }
        })
    }
    const handleUpdateSubTask = (name: string, status: boolean, subTaskId: string) => {
        const data = {
            name,
            status,
        }
        dispatch(updateSubTask({ subTaskId: subTaskId, projectId: projectSelected?._id ?? '', data })).then((res) => {
            if (res.type === 'task/updateSubTask/fulfilled') {
                message.success('Cập nhật công việc thành công')
            }
            else {
                message.error('Cập nhật công việc thất bại')
            }
        })
    }
        return (
        <Drawer open={Boolean(taskSelected?._id)}
            onClose={() => dispatch(resetTaskSelected())}
            width={800}
            title='Chi tiết công việc'
            destroyOnClose={true}
            extra={
                <Space>
                    <Popconfirm
                        okButtonProps={{ className: 'bg-sky-500' }}
                        title="Có chắc xóa?"
                        onConfirm={() => handleDeleteTask()}>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                    <Button loading={loading[updateTask.typePrefix]} onClick={() => form.submit()} type="primary" className='bg-sky-500 text-white'>
                        Lưu
                    </Button>
                </Space>
            }

        >
            {taskSelected?._id ?
                
                <div>
                      <Form
                form={form}
                layout='vertical'
                onFinish={(e: CreateTask) => handleUpdateTask(e)}
            >
                <Form.Item
                    name="taskName"
                    label="Tên công việc"
                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                >
                    <Input placeholder='Công việc' />

                </Form.Item>
                {label?.length && userInfo?._id === projectSelected?.creator_id && <Form.Item
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
                <div className='flex gap-5 items-center'>
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
                        label="Ngày hoàn thành"
                        name={'date_end'}
                    >
                        <DatePicker format={"DD/MM/YYYY"} placeholder='Ngày hoàn thành' />
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
                </div>
             
                <Form.Item
                    name="assignedTo"

                    label="Người thực hiện">
                    <Select placeholder='Người thực hiện'
                        optionLabelProp="label"
                        className='!h-auto'
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
               

                    </Form>
                    <Form
                        onFinish={({ name }) => handleCreateSubTask(name)}
                    >
                    <div className='flex items-center justify-between'>
                      <h3 className='text-xl font-bold py-3'>Công việc </h3>
                      <Button danger onClick = {() => setOpen(true)}> Thêm</Button>
                      
                        </div>    
                        {
                            open && 
                            <>
                            <Form.Item
                                name='name'
                                rules={[{
                                    required: true, message: 'Vui lòng nhập thông tin!',
                                    validator: (_, value) => {
                                        if (value?.length > 0) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Vui lòng nhập thông tin!')
                                    }
                                }]}

                            >
                                <Input placeholder='công việc'/>
                            </Form.Item>
                            <div className='flex justify-end gap-4'>
                                    <Button onClick={() => setOpen(false)} htmlType='reset' danger> Hủy</Button>
                                    <Button type='primary' htmlType='submit' danger> Thêm</Button>
                            </div>
                            </>
                        }   
                        <div className='p-1 my-2'>
                            {taskSelected?.subTasks?.map((item: Subtask, index) => (
                                <div key={index} className='flex items-center gap-3 border rounded-lg border-gray-300 shadow-sm p-2 my-1'>
                                    <input type='checkbox' checked={item.status} onChange={() => handleUpdateSubTask(
                                        item.name,
                                        !item.status,
                                        item._id
                                    )} />
                                    <p className='flex-auto'>{item.name}</p>
                                    <Popconfirm className='cursor-pointer px-2 py-1 rounded-lg bg-red-500 border border-red-400 text-white'  title="Bạn có chắc muốn xóa?" onConfirm={() => dispatch(deleteSubTask({
                                        projectId: projectSelected?._id ?? '',
                                        subTaskId: item._id
                                    
                                    }))} >
                                        <Space>
                                            Xóa
                                        </Space>

                                    </Popconfirm>
                                </div>
                            ))}
                        </div>
                    </Form>
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
              </div>  
                    : <Spin spinning />
              
            }
        </Drawer>
    )
}

export default TaskPopup
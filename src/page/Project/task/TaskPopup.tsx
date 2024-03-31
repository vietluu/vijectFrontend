import { Avatar, Button, Drawer, Form, Input, Popconfirm, Select, Space, Spin, Tag, message } from 'antd'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { TaskReducer } from '../../../redux/task/selector';
import { resetTaskSelected } from '../../../redux/task/slice';
import { CreateTask } from '../../../types/task';
import { projectSelector } from '../../../redux/project/selector';
import { userSelector } from '../../../redux/user/selector';
import { labelReducer } from '../../../redux/label/selector';
import {deleteTask, updateTask } from '../../../redux/task/thunk';


const TaskPopup = () => {
    const { taskSelected } = useAppSelector(TaskReducer);
  const dispatch = useAppDispatch()
  const { priorities, statuses, loading } = useAppSelector(TaskReducer)
  const { projectSelected } = useAppSelector(projectSelector)
  const { userInfo } = useAppSelector(userSelector)
  const {label} = useAppSelector(labelReducer)
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
    },[form, taskSelected?.assignedTo?._id, taskSelected?.description, taskSelected?.labelId?._id, taskSelected?.priorityId?._id, taskSelected?.statusId?._id, taskSelected?.taskName])
  const handleUpdateTask = (data: CreateTask) => { 
    
      const req:CreateTask = {
          ...data,
          projectId: projectSelected?._id ?? '',
          creatorId: userInfo?._id ?? '',
      }

      dispatch(updateTask({taskId:taskSelected?._id ?? '', projectId: projectSelected?._id ?? '', data:req })).then((res) => {
          if (res.type === 'task/updateTask/fulfilled') {
              message.success('Tạo công việc thành công')
          }
          else {
              if (res.type === 'task/updateTask/rejected')
                  message.error('Tạo công việc thất bại')
          }
      
      })
    }
    
    const handleDeleteTask = () => { 
        dispatch(deleteTask({taskId:taskSelected?._id ?? '', projectId: projectSelected?._id ?? ''})).then((res) => {
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
  console.log('render')
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
             {taskSelected?._id ? <Form
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

                </Form> : <Spin spinning />}
    </Drawer>
  )
}

export default TaskPopup 
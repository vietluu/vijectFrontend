import { CreateTask, SingleTask } from '../../../types/task'
import { Avatar, Select, Tag, message } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { TaskReducer } from '../../../redux/task/selector'
import { projectSelector } from '../../../redux/project/selector'
import { labelReducer } from '../../../redux/label/selector'
import { userSelector } from '../../../redux/user/selector'
import { getTaskById, updateTask } from '../../../redux/task/thunk'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

const SingleTask = ({ data }: { data: SingleTask }) => {
    const { priorities, statuses } = useAppSelector(TaskReducer)
    const { projectSelected } = useAppSelector(projectSelector)
    const { label } = useAppSelector(labelReducer);
    const { userInfo } = useAppSelector(userSelector)
    const dispatch = useAppDispatch()

    const handleUpdateTask = (e: Partial<CreateTask>) => {
        dispatch(updateTask({ taskId: data?._id ?? '', projectId: projectSelected?._id ?? '', data: e })).then(res => {
            if (res.type === 'task/updateTask/fulfilled') {
                message.success('Cập nhật công việc thành công')
            }
            else {
                message.error('Cập nhật công việc thất bại')
            }
        }
        )
    }
    return (
        <div className='flex flex-row justify-between items-center p-3 bg-white shadow-md cursor-pointer m-1'
        onClick={()=> dispatch(getTaskById({taskId: data._id, projectId: projectSelected?._id ?? ''}))}
        >
            <NavLink to={data._id} onClick={(e) => e.stopPropagation()} className='max-w-[50%] w-full'> {data.taskName}</NavLink>
            <Select
                className='max-w-[190px] w-full px-1 text-center'
                size='large' disabled={userInfo?._id !== projectSelected?.creator_id}
                onChange={(e) => handleUpdateTask({ labelId: e })}
                onClick={(e) => e.stopPropagation()}
                value={
                    data?.labelId?._id
                } placeholder="Nhãn" >
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
            <Select
                className='max-w-[190px] w-full px-1 text-center'
                onChange={(e) => handleUpdateTask({ priorityId: e })}
                size='large'
                onClick={(e) => e.stopPropagation()}

                value={
                    data?.priorityId?._id
                } placeholder="Độ ưu tiên">
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
            <Select className='max-w-[190px] w-full px-1 text-center'
                onChange={(e) => handleUpdateTask({ statusId: e })}
                size='large'
                onClick={(e) => e.stopPropagation()}

                value={
                    data?.statusId?._id
                }
                placeholder="Trạng thái">
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
            <Select dropdownStyle={{ width: 'auto' }}
                        onClick={(e) => e.stopPropagation()}

                className='w-fit px-1 text-center'
                placeholder={
                    <div
                        className="flex items-center"
                    >
                        <Avatar
                            src={'/img/anonymous.webp'}
                            size={'default'}
                            alt="avatar"
                        />
                    </div>
                } size='large' value={
                    data?.assignedTo?._id
                }
                onChange={(e) => handleUpdateTask({ assignedTo: e })}
                optionLabelProp='label'
            >
                {projectSelected?.members.map((member, index) => (
                    <Select.Option key={index} value={member._id}
                        label={
                            <div
                                className="flex items-center"
                            >
                                <Avatar
                                    src={member.image}
                                    size={'default'}
                                    alt="avatar"
                                />
                            </div>
                        }
                    >
                        <div
                            className="flex gap-2 items-center"
                        >
                            <Avatar
                                src={member.image}
                                size={'default'}
                                alt="avatar"
                            />
                            <div>
                                <p className="text-md">
                                    {member.fullName}
                                </p>
                            </div>

                        </div>
                    </Select.Option>
                ))}
            </Select>

        </div>
    )
}
const SingleTasks =  memo(SingleTask)
// eslint-disable-next-line react-refresh/only-export-components
export default SingleTasks
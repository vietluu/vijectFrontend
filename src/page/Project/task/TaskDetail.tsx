import { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TaskReducer } from '../../../redux/task/selector'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { Button, Empty, Form, Input, Tag, message } from 'antd'
import { createComment, deleteComment, getComments, updateComment } from '../../../redux/comment/thunk'
import commentSelector from '../../../redux/comment/reducer'
import { Comment } from '../../../types/comment'
import { userSelector } from '../../../redux/user/selector'
import { EllipsisOutlined, SendOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd/lib/menu';
import {Dropdown } from 'antd'
import ConfirmModal from '../../../component/ConfirmModal'
import { getTaskById } from '../../../redux/task/thunk'
import { resetTaskSelected } from '../../../redux/task/slice'


const TaskDetail = () => {
  const { taskId, projectId } = useParams<{ taskId: string, projectId: string }>()
  const {taskSelected} = useAppSelector(TaskReducer)
  const [form] = Form.useForm();
  const [selectComment, setSelectComment] = useState<string | null>(null)
  const {userInfo} = useAppSelector(userSelector)
  
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(commentSelector);
  useLayoutEffect(() => { 
    Promise.all([  dispatch(getTaskById({taskId: taskId ?? '', projectId: projectId ?? ''})),
      dispatch(getComments({ taskId: taskId ?? '', projectId: projectId ?? '' }))])
    return () => { 
      dispatch(resetTaskSelected())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, projectId])

  const handleUpdateComment = (content: string) => {
    dispatch(updateComment({ commentId: selectComment ?? '', data: { comment: content } })).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        // dispatch(getComments({ taskId: taskId ?? '', projectId: projectId ?? '' }))
        setSelectComment(null)
      }
    })
  }

  const renderItem = (id: string): MenuProps['items'] => { 
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: 'Edit',
        onClick: () => {
          setSelectComment(id)
        }
      },
      {
        key: '2',
        label: 'Delete',
        onClick: () => {
          console.log('delete',id)
          ConfirmModal({
            title: 'Delete Comment',
            content: 'Are you sure you want to delete this comment?',
            onOk: () => {
              dispatch(deleteComment(id)).then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                  // dispatch(getComments({ taskId: taskId ?? '', projectId: projectId ?? '' }))
                  message.success('Delete comment successfully')

                  }
              })
            }
          })
        }
      }
    ]
    return items
  }
  return taskSelected ? (
    <div className=' bg-white shadow-sm size-full overflow-hidden'>
      <div className=' p-3 my-3'>
      <p className='text-4xl pb-5 font-bold '>{
        taskSelected.taskName
        }</p>
        <p><span className='font-medium mr-5'>Độ ưu tiên:</span> <span>{ taskSelected.priorityId ? <Tag color={taskSelected.priorityId?.color}>{ taskSelected.priorityId?.priorityName}</Tag> : 'Không'}</span></p>
      
        <h3 className='font-medium py-3'>Mô tả:</h3>
      <p className='text-xl'>{ taskSelected.description}</p>
      </div>
      <h2 className='font-bold p-3'>Trao đổi:</h2>
      <div className='flex gap-2 flex-row p-3'>
        <img src={userInfo?.image} alt={userInfo?.fullName} className='w-10 h-10 rounded-full'/>
        <Form form={form}
          className='flex-auto !m-0'
          onFinish={({ comment }: { comment: string }) => {
          dispatch(createComment({ taskId: taskId ?? '', projectId: projectId ?? '', data: { comment } })).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
              dispatch(getComments({ taskId: taskId ?? '', projectId: projectId ?? '' }))
              form.resetFields()
            }
          }
          )
         }}
      >
        <Form.Item
          name='comment'
            required
            className='!m-0'
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
        <Input 
         className='!m-0'
          placeholder='Task name' />
        </Form.Item>
      </Form>
      <Button type='primary' className='bg-sky-500 w-fit h-fit pb-2' onClick={() => form.submit()}><SendOutlined  className='text-lg'/></Button>
      </div>
      <div className='max-h-[48vh] overflow-y-scroll px-3'>
        {comments.length > 0 ? comments?.map((item: Comment) => {
          return (
            <div key={item._id} className='flex items-center gap-3 shadow-sm p-2 my-3 relative'>
              {selectComment !== item._id && userInfo?._id === item.creator._id ? (
                <Dropdown className='absolute right-4 -top-1 text-3xl' menu={{ items: renderItem(item._id) }}>
                  <EllipsisOutlined />
                </Dropdown>
              ) : null}
              {selectComment !== item._id ? <>
                <img src={item.creator.image ?? ''} alt={item.creator.fullName} className='w-10 h-10 rounded-full'/>
              <div>
                <p>{item.creator.fullName}</p>
                <p>{item.content}</p>
              </div>
              </> : <div className='flex gap-2 flex-row p-3 w-full'>
                <img src={userInfo?.image} alt={userInfo?.fullName} className='w-10 h-10 rounded-full'/>

                  <Form
                    onFinish={({ content }: { content: string }) => {
                      handleUpdateComment(content)
                    }}
                    className='flex-auto'
                    initialValues={{ content: item.content }}
                  >
                    <Form.Item
                      name={'content'}
                      required
                      rules={[{ required: true, message: 'Please input your comment!' }]}
                    >
                      <Input
                      />
                    </Form.Item>
                    <div className='flex justify-end gap-3'>
                    <Button type='primary' className='bg-sky-500' htmlType='submit'>Sửa</Button>
                    <Button danger htmlType='reset' onClick={()=> setSelectComment(null)}>Hủy</Button>
                 </div>
                </Form>
              </div>}
            </div>
          )
        }) : <Empty/>
      }
      </div>
    </div>
  ) : null
}

export default TaskDetail
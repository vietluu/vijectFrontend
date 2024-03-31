import { useLayoutEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TaskReducer } from '../../../redux/task/selector'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { Button, Empty, Form, Input, Tag, message } from 'antd'
import { createComment, deleteComment, getComments, updateComment } from '../../../redux/comment/thunk'
import commentSelector from '../../../redux/comment/reducer'
import { Comment } from '../../../types/comment'
import { userSelector } from '../../../redux/user/selector'
import { EllipsisOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd/lib/menu';
import {Dropdown } from 'antd'
import ConfirmModal from '../../../component/ConfirmModal'


const TaskDetail = () => {
  const { taskId, projectId } = useParams<{ taskId: string, projectId: string }>()
  const {Task} = useAppSelector(TaskReducer)
  const [form] = Form.useForm();
  const [selectComment, setSelectComment] = useState<string | null>(null)
  const {userInfo} = useAppSelector(userSelector)
  const task = useMemo(() => {
    if (taskId) {
      return Task?.tasks?.find((task) => task._id === taskId)
    }
  
  }, [taskId, Task]) 
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(commentSelector);
  useLayoutEffect(() => { 
    dispatch(getComments({ taskId: taskId ?? '', projectId: projectId ?? '' }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, projectId])

  const handleUpdateComment = (content: string) => {
    dispatch(updateComment({ commentId: selectComment, data: { comment: content } })).then(res => {
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
  return task ? (
    <div className=' bg-white shadow-sm size-full'>
      <div className=' p-3 my-3'>
      <p className='text-4xl pb-5 font-bold '>{
        task.taskName
        }</p>
        <p><span className='font-medium mr-5'>Độ ưu tiên:</span> <span>{ task.priorityId ? <Tag color={task.priorityId?.color}>{ task.priorityId?.priorityName}</Tag> : 'Không'}</span></p>
      
        <h3 className='font-medium py-3'>Mô tả:</h3>
      <p className='text-xl'>{ task.description}</p>
      </div>
      <h2 className='font-bold p-3'>Trao đổi:</h2>
      <div className='flex gap-2 flex-row p-3'>
        <img src={userInfo?.image} alt={userInfo?.fullName} className='w-10 h-10 rounded-full'/>
        <Form form={form}
          className='flex-auto'
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
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
        <Input 
         
          placeholder='Task name'/>
        </Form.Item>
          <Button type='primary' className='bg-sky-500' htmlType='submit'>Submit</Button>
      </Form>
      </div>
      <div className='h-[60vh] overflow-y-scroll p-3'>
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
              </> : <>
                  <Form
                    onFinish={({ content }: { content: string }) => {
                      handleUpdateComment(content)
                    }}
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
                    <Button type='primary' className='bg-sky-500' htmlType='submit'>Edit</Button>
                    <Button danger htmlType='reset' onClick={()=> setSelectComment(null)}>Huy</Button>
                </Form>
              </>}
            </div>
          )
        }) : <Empty/>
      }
      </div>
    </div>
  ) : null
}

export default TaskDetail
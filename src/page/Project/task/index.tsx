import { Empty, Pagination, Spin } from 'antd'
import { lazy, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hook/hook'
import { getTasks } from '../../../redux/task/thunk'
import { TaskReducer } from '../../../redux/task/selector'
import SingleTask from './SingleTask'
import TaskPopup from './TaskPopup'
import Search from 'antd/lib/input/Search'
const CreateTask = lazy(() => import('./CreateTask'))


const Task = () => {
    const { projectId } = useParams<{ projectId: string }>()
    const dispatch = useAppDispatch();
    const { Task } = useAppSelector(TaskReducer)
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (projectId) {
            dispatch(getTasks({ projectId, params: { page: searchParams.get('page') ?? 1, keyword: searchParams.get('keyword') ?? undefined} }))
        }
    }, [dispatch, projectId, searchParams])

    const handleSearch = (value: string) => {
        setSearchParams({ keyword: value })
     }
    return projectId ? (
        <div>
            <TaskPopup/>
            <h1 className='text-3xl font-bold pb-4 border-b border-gray-400'>Công việc trong dự án</h1>
            <div className='flex  px-4 items-center justify-between'>
            <Search placeholder="input search text" className='max-h-14 max-w-60' onSearch={handleSearch} enterButton />
            <CreateTask projectId={projectId} />
           </div>
            <ul className='h-[69vh] mx-3 border bg-white border-gray-300'>
            {
                Task?.tasks?.length ? Task.tasks.map((item) => {
                    return <SingleTask key={item._id} data={item} />
                   
                }) : <Empty description='Chưa có công việc nào' />
                }
            
            </ul>
            <Pagination
                className='flex justify-center p-3'
                defaultCurrent={Task?.currentPage}
                total={Task?.totalTasks}
                onChange={(page) => {
                    setSearchParams({ page: page.toString() })
                    }}
                />
        </div>
    ) : <Spin spinning fullscreen />
}

export default Task
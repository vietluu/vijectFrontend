import React from 'react'
import { SingleTask } from '../../types/task'
import { NavLink } from 'react-router-dom'

const ItemTab = ({ data }: { data: SingleTask[] | undefined }) => {
  const percentTask = (item: SingleTask) => {
    console.log(item)
    const totalTask = item.subTasks?.length
    const totalDone = item?.subTasks?.filter((item) => item.status === true).length
    if (!totalTask || !totalDone) return 0
    return Math.floor((totalDone / totalTask) * 100)
  }
  return (
      <div className='overflow-y-auto overflow-x-hidden'>
          {data ? data.map((item:SingleTask) => (
              <NavLink className='flex justify-between items-center w-full bg-white  p-3 shadow-md cursor-pointer m-1' to={item.projectId._id ?? ''} key={item._id}>
                    <div className=''>
                        <p className='w-full text-black text-md'> {item.taskName}</p>
                        <p className='w-full  text-sm text-gray-400'> {item?.projectId.projectName}</p>
              </div>
              <span>{ percentTask(item) + ' %'}</span>
             </NavLink>
          )) : null}
    </div>
  )
}

export default ItemTab
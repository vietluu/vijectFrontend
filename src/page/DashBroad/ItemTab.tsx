import React from 'react'
import { SingleTask } from '../../types/task'
import { NavLink } from 'react-router-dom'

const ItemTab = ({data}:{data:SingleTask[] | undefined}) => {
  return (
      <div className='overflow-y-auto'>
          {data ? data.map((item:SingleTask) => (
              <NavLink to={item.projectId._id ?? ''} key={item._id}>
                    <div className='p-3 bg-white shadow-md cursor-pointer m-1'>
                        <p className='w-full text-black text-md'> {item.taskName}</p>
                        <p className='w-full  text-sm text-gray-400'> {item?.projectId.projectName}</p>
                    </div>
             </NavLink>
          )) : null}
    </div>
  )
}

export default ItemTab
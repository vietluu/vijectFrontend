import React, { useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hook/hook';
import { getProjectByIdRequest } from '../../redux/project/thunk';

function ProjectDetail() {
    const { projectId } = useParams<{projectId: string}>();
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        console.log(projectId);
        if(projectId) dispatch(getProjectByIdRequest(projectId));
    }, [projectId])
  return (
    <div>ProjectDetail</div>
  )
}

export default ProjectDetail
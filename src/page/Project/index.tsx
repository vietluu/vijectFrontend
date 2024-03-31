import { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, Spin, message } from 'antd'
import { getProjectByIdRequest } from '../../redux/project/thunk'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { projectSelector } from '../../redux/project/selector'
import ProjectSidebar from './ProjectSidebar'
import { resetProject } from '../../redux/project/slice'
import { getLabelRequest } from '../../redux/label/thunk'
import { getTasks } from '../../redux/task/thunk'
import { routes } from '../../navigation/routers'

const { Sider, Content } = Layout

const ProjectDetail = () => {
    const [collapsed, setCollapsed] = useState(false)

    const { projectId } = useParams<{ projectId: string }>()
    const { projectSelected } = useAppSelector(projectSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    useEffect(() => {
        if (projectId)
            try {
                Promise.all([
                    dispatch(getProjectByIdRequest(projectId)).then(res => {
                        if (res.type === 'project/thunk/getProjectById/rejected') {
                            message.error('Dự án không tồn tại!')
                            navigate(routes.Home.path);
                        }
                    }),
                    Promise.all([
                        dispatch(getLabelRequest(projectId)),
                        dispatch(getTasks({ projectId, params: { } }))
                    ])

                ])

            } catch (error) {
                console.log(error)
            }

        return () => {
            dispatch(resetProject())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId])
    return (
        <>
            {projectSelected ? (
                <Layout className="h-full">
                    <Sider
                        className="relative"
                        theme="light"
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                    >
                        <ProjectSidebar />

                        <Button
                            className="absolute top-2 right-[-15px] outline-none"
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 32,
                                height: 32,
                            }}
                        />
                    </Sider>
                    <Layout>
                        <Content className="p-1 m-3 bg-gray-100 overflow-x-hidden overflow-y-auto">
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            ) : (
                <div className="flex justify-center items-center h-[calc(100vh-67px)]">
                    <Spin size="large" spinning />
                </div>
            )}
        </>
    )
}

export default ProjectDetail

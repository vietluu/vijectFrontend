import React, { useMemo } from 'react'
import { projectSelector } from '../../redux/project/selector'
import { useAppSelector } from '../../hook/hook'
import { Menu } from 'antd'
import {
    DashboardOutlined,
    FileAddOutlined,
    SettingOutlined,
    TagsOutlined,
    UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd/lib/menu'
import { userSelector } from '../../redux/user/selector'
import { NavLink } from 'react-router-dom'

function ProjectSidebar() {
    const { projectSelected } = useAppSelector(projectSelector)
    const { userInfo } = useAppSelector(userSelector)

    const item: MenuProps['items'] = useMemo(() => {
        return userInfo?._id === projectSelected?.creator_id
            ? [
                {
                    key: 'overview',
                    icon: <img src="/img/logo.svg" width={20} height={20} />,
                    label: (
                        <NavLink to="/" className='text'>
                            <h3 className="text-xl text-blue-500 text-center" style={{lineHeight:'24px'}}>
                                {projectSelected?.projectName}
                            </h3>
                            <p className='text-[11px] text-center' style={{lineHeight:'12px'}}>Project team software</p>
                        </NavLink>
                    ),
                },
                {
                    key: 'member',
                    icon: <UserOutlined />,
                    label: <NavLink to="member">Thành viên</NavLink>,
                },
                {
                    key: '',
                    icon: <FileAddOutlined />,
                    label: <NavLink to="">Công việc</NavLink>,
                },
                {
                    key: 'label',
                    icon: <TagsOutlined />,
                    label: <NavLink to="label">Nhãn</NavLink>,
                },
                {
                    key: "sumary",
                    icon: <DashboardOutlined />,
                    label: <NavLink to="sumary">Báo cáo & thống kê</NavLink>,
                },
                {
                    key: 'setting',
                    icon: <SettingOutlined />,
                    label: <NavLink to="setting">Cài đặt</NavLink>,
                },
            ]
            : [
                {
                    key: 'overview',
                    icon: <img src="/img/logo.svg" width={20} height={20} />,
                    label: (
                        <NavLink to="/" className='text'>
                            <h3 className="text-xl text-blue-500 text-center" style={{lineHeight:'24px'}}>
                                {projectSelected?.projectName}
                            </h3>
                            <p className='text-[11px] text-center' style={{lineHeight:'12px'}}>Project team software</p>
                        </NavLink>
                    ),
                },
                
                {
                    key: '',
                    icon: <FileAddOutlined />,
                    label: <NavLink to="" >Công việc</NavLink>,
                },
            ]
    }, [projectSelected, userInfo])
    return (
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[
                window.location.pathname.split('/').at(-1) || '',
            ]}
            items={item}
        />
    )
}

export default ProjectSidebar

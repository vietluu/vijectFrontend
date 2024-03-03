import React from 'react'
import { projectSelector } from '../../redux/project/selector'
import { useAppSelector } from '../../hook/hook'
import { Menu } from 'antd'
import {
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
    const item: MenuProps['items'] =
        userInfo?._id === projectSelected?.creator_id
            ? [
                  {
                      key: 'overview',
                      icon: <img src="/img/logo.svg" width={20} height={20} />,
                      label: (
                          <NavLink to="/">
                              <h3 className="text-xl text-blue-500">
                                  {projectSelected?.projectName}
                              </h3>
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
                      key: 'setting',
                      icon: <SettingOutlined />,
                      label: <NavLink to="setting">Cài đặt</NavLink>,
                  },
              ]
            : [
                  {
                      key: '2',
                      icon: <FileAddOutlined />,
                      label: <NavLink to="">Công việc</NavLink>,
                  },
              ]
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

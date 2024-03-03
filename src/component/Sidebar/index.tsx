import { Avatar, Dropdown, Space } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import type { MenuProps } from 'antd/lib/menu'
import { DownOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { signOut } from '../../redux/user/slice'

function Sidebar({ children }: { children: React.ReactNode }) {
    const { userInfo } = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <NavLink to="/profile">Cập nhật thông tin</NavLink>,
        },
        {
            key: '3',
            label: <NavLink to="/updatePsw">Đổi mật khẩu</NavLink>,
        },
        {
            key: '2',
            label: (
                <NavLink to="" onClick={() => dispatch(signOut())}>
                    Đăng xuất
                </NavLink>
            ),
        },
    ]
    return (
        <>
            <header className="sticky top-0 z-50">
                <nav className="flex px-4 bg-white shadow-md items-center flex-nowrap justify-between">
                    <span>
                        <NavLink to="/">
                            <img src="/img/viject.svg" className="h-16" />
                        </NavLink>
                    </span>

                    <Dropdown menu={{ items }}>
                        <Space>
                            <Avatar
                                src={
                                    userInfo?.image
                                        ? userInfo.image
                                        : '/img/anonymous.webp'
                                }
                                size={'large'}
                            />
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </nav>
            </header>
            <main className="h-[calc(100dvh_-_67px)]">{children}</main>
        </>
    )
}

export default Sidebar

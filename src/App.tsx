// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './hook/hook'
import Navigations from './navigation'
import { getUserInfo } from './redux/user/thunk'
import Loading, { loadingRef } from './component/Loading'
import { ConfigProvider } from 'antd'
import { userSelector } from './redux/user/selector'
import { getProjectRequest } from './redux/project/thunk'
function App() {
    const dispatch = useAppDispatch()
    const { isLogin } = useAppSelector(userSelector)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(getUserInfo())
            dispatch(getProjectRequest())

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [dispatch, isLogin])

    return (
        <ConfigProvider>
            <Navigations />
            <Loading ref={loadingRef} />
        </ConfigProvider>
    )
}

export default App

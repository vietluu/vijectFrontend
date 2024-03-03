import React, { Suspense, memo, useCallback, useEffect } from 'react'
import { values } from 'lodash'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
    matchRoutes,
} from 'react-router-dom'
import { useAppSelector } from '../hook/hook'
import { userSelector } from '../redux/user/selector'
import { privateRoutes, publicRoutes, routes } from './routers'
import { user } from '../types/user'
import { getUserInfo } from '../redux/user/thunk'
import { loadingRef } from '../component/Loading'
import Layout from '../component/Layout'
import AuthLayout from '../component/AuthLayout'
import { Spin } from 'antd'
import { projectSelector } from '../redux/project/selector'

export const Navigations = () => {
    const { isLogin, userInfo, loading } = useAppSelector(userSelector)
    const renderRoute = useCallback(
        (
            route: typeof publicRoutes | typeof privateRoutes,
            isPrivate?: boolean
        ) => {
            if (!route || !values(route)) {
                return undefined
            }
            return values(route)?.map(({ element, children, ...props }) => {
                return (
                    <Route
                        key={props.id}
                        {...props}
                        element={
                            <GuardRoute
                                isLogin={isLogin}
                                userInfo={userInfo}
                                isPrivate={!!isPrivate}
                                redirectPath={
                                    isPrivate ? routes.Login.path : '/'
                                }
                            >
                                {element}
                            </GuardRoute>
                        }
                        index={false}
                    >
                        {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            children &&
                                children.length > 0 &&
                                children?.map(
                                    ({ element, children, ...props }) => (
                                        <Route
                                            key={props.id}
                                            {...props}
                                            element={
                                                <GuardRouteChildren
                                                    isLogin={isLogin}
                                                    userInfo={userInfo}
                                                    isPrivate={!!isPrivate}
                                                    redirectPath={
                                                        isPrivate
                                                            ? routes.Login.path
                                                            : '/'
                                                    }
                                                >
                                                    {element}
                                                </GuardRouteChildren>
                                            }
                                        />
                                    )
                                )
                        }
                    </Route>
                )
            })
        },
        [isLogin, userInfo]
    )

    useEffect(() => {
        loadingRef.current?.isLoading(loading[getUserInfo.typePrefix])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading[getUserInfo.typePrefix]])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    {renderRoute(publicRoutes)}
                    {renderRoute(privateRoutes, true)}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

interface GuardRouteProps {
    isLogin: boolean
    userInfo: user | undefined
    isPrivate: boolean
    redirectPath: string
    children: React.ReactElement
}

const GuardRoute = memo(
    ({
        children,
        isLogin,
        userInfo,
        isPrivate,
        redirectPath,
    }: GuardRouteProps) => {
        const location = useLocation()
        if (isPrivate && isLogin) {
            if (!userInfo) return null
            return (
                <Layout>
                    {
                        <Suspense fallback={<Spin spinning fullscreen />}>
                            {children}
                        </Suspense>
                    }
                </Layout>
            )
        } else if (!isPrivate && !isLogin) {
            return <AuthLayout>{children}</AuthLayout>
        } else {
            return (
                <Navigate
                    to={redirectPath}
                    state={{
                        from: location.pathname,
                        search: location.search,
                    }}
                    replace
                />
            )
        }
    }
)

const GuardRouteChildren = memo(
    ({
        children,
        isLogin,
        userInfo,
        isPrivate,
        redirectPath,
    }: GuardRouteProps) => {
        const { projectSelected } = useAppSelector(projectSelector)
        const location = useLocation()
        if (isPrivate && isLogin) {
            if (!userInfo) return null
            if (projectSelected) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                if (matchRoutes([routes.ProjectDetail], location)) {
                    if (projectSelected?.creator_id !== userInfo._id) {
                        return (
                            <Navigate
                                to={`/${projectSelected?._id}`}
                                state={{
                                    from: location.pathname,
                                    search: location.search,
                                }}
                                replace
                            />
                        )
                    }
                }
            }
            return (
                <>
                    {
                        <Suspense fallback={<Spin spinning fullscreen />}>
                            {children}
                        </Suspense>
                    }
                </>
            )
        } else if (!isPrivate && !isLogin) {
            return <AuthLayout>{children}</AuthLayout>
        } else {
            return (
                <Navigate
                    to={redirectPath}
                    state={{
                        from: location.pathname,
                        search: location.search,
                    }}
                    replace
                />
            )
        }
    }
)
export default Navigations

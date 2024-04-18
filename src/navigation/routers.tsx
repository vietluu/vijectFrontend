import React from 'react'
import { omit, pick } from 'lodash'
import DashBroad from '../page/DashBroad'
import SignIn from '../page/Auth/SignIn'
import SignUp from '../page/Auth/SignUp'
import Profile from '../page/Profile'
import ProjectDetail from '../page/Project'
import UpdatePsw from '../page/Profile/UpdatePsw'
import Member from '../page/Project/Member'
import Task from '../page/Project/task/index'
import Label from '../page/Project/label/Label'
import Setting from '../page/Project/Setting'
import ListProject from '../page/Project/ListProject'
import Sumary from '../page/Project/Sumary'
import TaskDetail from '../page/Project/task/TaskDetail'
import UserPolicy from '../page/UserPolicy'
import PrivacyPolicy from '../page/PrivacyPolicy'

type routeItem = {
    path: string
    id: string
    index?: boolean
    element: React.ReactElement
    children?: routeItem[]
}
type Route = {
    [key: string]: routeItem
}
export const routes: Route = {
    Login: {
        path: '/signIn',
        id: 'signIn',
        element: <SignIn />,
    },
    Logup: {
        path: '/signUp',
        id: 'signUp',
        element: <SignUp />,
    },
    Home: {
        path: '/',
        id: 'home',
        index: true,
        element: <DashBroad />,
    },
    Profile: {
        path: '/profile',
        id: 'profile',
        element: <Profile />,
    },
    ProjectList: {
        id: 'projectList',
        path: '/projectList',
        element: <ListProject />,
    },
    ProjectDetail: {
        path: ':projectId',
        id: 'projectDetail',
        element: <ProjectDetail />,
        children: [
            {
                path: 'member',
                id: 'project-member',
                element: <Member />,
            },
            {
                path: '',
                id: 'project-task',
                element: <Task />,
            },
            {
                path: 'label',
                id: 'project-label',
                element: <Label />,
            },
            {
                path: 'sumary',
                id: 'project-sumary',
                element: <Sumary />,
            },
            {
                path: 'setting',
                id: 'project-setting',
                element: <Setting />,
            },
            {
                path: ':taskId',
                id: 'project-task-create',
                element: <TaskDetail/>,
            },
        ],
    },
    UpdatePsw: {
        path: '/updatePsw',
        id: 'updatePsw',
        element: <UpdatePsw />,
    },
    UserPolicy: {
        path: '/user-policy',
        id: 'user-policy',
        element: <UserPolicy/>,
    },
    PrivacyPolicy: {
        path: '/privacy-policy',
        id: 'Privacy-policy',
        element: <PrivacyPolicy/>,
    },
    
    
}

export type Routes = typeof routes

export type RouteKeys = keyof Routes

const publicKeys: RouteKeys[] = ['Login', 'Logup', 'UserPolicy', 'PrivacyPolicy']

export const publicRoutes = pick<Routes, RouteKeys>(routes, publicKeys)

export const privateRoutes = omit<Routes, RouteKeys>(routes, publicKeys)

import React from "react";
import { omit, pick } from "lodash";
import DashBroad from "../page/DashBroad";
import SignIn from "../page/Auth/SignIn";
import SignUp from "../page/Auth/SignUp";
import Profile from "../page/Profile";
import ProjectDetail from "../page/Project";

export const routes = {
  Login: {
    path: "/signIn",
    id: "signIn",
    element: <SignIn />,
  },
  Logup: {
    path: "/signUp",
    id: "signUp",
    element: <SignUp />,
  },
  Home: {
    path: "/",
    id: "home",
    index: true,
    element: <DashBroad />,
  },
  Profile: {
    path: "/profile",
    id: "profile",
    element: <Profile />,
  },
  ProjectDetail: {
    path: "/:projectId",
    id: "projectDetail",
    element: <ProjectDetail />,
  },
};

export type Routes = typeof routes;

export type RouteKeys = keyof Routes;

const publicKeys: RouteKeys[] = ["Login", "Logup"];

export const publicRoutes = pick<Routes, RouteKeys>(routes, publicKeys);

export const privateRoutes = omit<Routes, RouteKeys>(routes, publicKeys);

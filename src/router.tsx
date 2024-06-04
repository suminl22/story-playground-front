import React from "react";
import {createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject [] = [
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signUp",
        element: <SignUpPage />,
    },

];

const router = createBrowserRouter(routes);

export default router;

import React from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

const routes: RouteObject[] = [
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
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/chat",
        element: <ChatPage />
    }
];

const router = createBrowserRouter(routes);

export default router;

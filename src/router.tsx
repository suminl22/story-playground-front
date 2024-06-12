import React from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import BooksPage from './pages/BooksPage';
import EditPage from './pages/EditPage';
import ReadPage from './pages/ReadPage';

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
    },
    {
        path: "/books",
        element: <BooksPage />
    },
    {
        path: "/edit/:storyId",
        element: <EditPage />
    },
    {
        path: "/read/:storyId",
        element: <ReadPage />
    },
];

const router = createBrowserRouter(routes);

export default router;

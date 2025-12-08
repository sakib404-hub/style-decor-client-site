import { createBrowserRouter } from "react-router";
import MainLayout from "../../Layout/MainLayout/MainLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout
    }
])
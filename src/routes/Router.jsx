import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Coverage from "../pages/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Rider from "../pages/Rider";
import PrivetRoute from "./PrivetRoute";
import SendParcel from "../pages/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import DashboardHome from "../pages/Dashboard/DashboardHome";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch("/serviceCenter.json").then(res => res.json())
            },
            {
                path: "beArider",
                element: <PrivetRoute><Rider></Rider></PrivetRoute>
            },
            {
                path: "send-parcel",
                element: <PrivetRoute><SendParcel></SendParcel></PrivetRoute>,
                loader: () => fetch("/serviceCenter.json").then(res => res.json())
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "myParcels",
                Component: MyParcels
            }
        ]
    }
]);
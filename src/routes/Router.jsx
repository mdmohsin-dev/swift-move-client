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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import AllRiders from "../pages/Dashboard/Rider/AllRiders";
import AllUsers from "../pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/Dashboard/Rider/AssignRider";

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
                element: <PrivetRoute><Rider></Rider></PrivetRoute>,
                loader: () => fetch("/serviceCenter.json").then(res => res.json())
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
            },
            {
                path: "payment/:parcelId",
                Component: Payment
            },
            {
                path: "payment-success",
                Component: PaymentSuccess
            },
            {
                path: "payment-cancelled",
                Component: PaymentCancel
            },
            {
                path: "payment-history",
                Component: PaymentHistory
            },
            {
                path: "allRiders",
                Component: AllRiders
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:"assignRider",
                element:<AdminRoute><AssignRider></AssignRider></AdminRoute>
            }
        ]
    }
]);
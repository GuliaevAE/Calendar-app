import { LOGIN_ROUTE, CALENDAR_ROUTE } from "../utils/consts";
import Login from "./Login";
import Calendar from "./calendar";

export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component:<Login/>
    }
]


export const privateRoutes = [
    {
        path:CALENDAR_ROUTE,
        Component:<Calendar/>
    }
]
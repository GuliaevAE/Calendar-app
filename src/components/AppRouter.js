import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router'
import { CALENDAR_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes } from './routes';
import Calendar from '../components/calendar.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';

const AppRouter = () => {
    const {auth} = useContext(Context)
    const user = useAuthState(auth)
    console.log(user)
    return user[0]!==null ?
        (
            <Routes>
                {privateRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={Component} exact={true} />
                )} 
                 <Route path={LOGIN_ROUTE} element={<Navigate replace to ={CALENDAR_ROUTE}/>} exact={true} />
                {/* {user&& <Navigate replace to ={CALENDAR_ROUTE}/>} */}
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={Component} exact={true} />
                )} 
                <Route path={CALENDAR_ROUTE} element={<Navigate replace to ={LOGIN_ROUTE}/>} exact={true} />
                {/* {user&& <Navigate replace to ={CALENDAR_ROUTE}/>} */}
            </Routes>
        )
};

export default AppRouter;
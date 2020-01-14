import React from 'react';
import {Route, Switch} from 'react-router-dom';
import TasksContainer from "./Tasks";
import TaskContainer from "./Task";
import CalendarContainer from "./Calendar";
import AuthContainer from "./Auth";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={TasksContainer}/>
        <Route path={"/task/:taskId"} component={TaskContainer}/>
        <Route path={"/calendar"} component={CalendarContainer}/>
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path={"/"} component={AuthContainer}/>
    </Switch>
);

const AppRouter = ({isLoggedIn}) =>
    isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>;

export default AppRouter;

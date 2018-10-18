import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import { isAuthenticated } from '../../utility/auth';

const BaseLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() === true
            ?
            <div>
                <NavigationBar />
                <Component {...props} />
            </div>
            :
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )} />
    )
};

export default BaseLayout;



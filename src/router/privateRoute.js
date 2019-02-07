import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { renderMergedProps } from './renderMergedProps';

export const PrivateRoute = ({ component, redirectTo, ...rest }) => {
    return (
        <Route { ...rest } render={ routeProps => {
            return !!rest.token ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: routeProps.location }
                }}/>
            );
        } }/>
    );
};
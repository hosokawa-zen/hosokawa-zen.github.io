import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../layout/Layout'

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Layout nav={rest.restricted} user={user} >
            <Route {...rest} component={(props) => (
                user ?
                    <Comp {...props} user={user} />
                    :
                    <Redirect to="/login" />
            )} />
        </Layout>
    );
};

export default PrivateRoutes;

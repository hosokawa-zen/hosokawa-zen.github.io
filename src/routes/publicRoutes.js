import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../layout/Layout'

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Layout nav={rest.restricted} user={user} >
            <Route {...rest} component={(props) => (
                rest.restricted ?
                    (user?
                        <Redirect to="/admin/dashboard" />
                        :
                        <Comp {...props} user={user} />
                    )
                    :
                    <Comp {...props} user={user} />
            )} />
        </Layout>
    );
};

export default PublicRoutes;

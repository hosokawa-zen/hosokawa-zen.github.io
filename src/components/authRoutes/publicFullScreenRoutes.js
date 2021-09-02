import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import FullScreenLayout from "../../layout/FullScreenLayout";

const PublicFullScreenRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <FullScreenLayout nav={rest.restricted} user={user} >
            <Route {...rest} component={(props) => (
                rest.restricted ?
                    (user ?
                        <Redirect to="/admin/dashboard" />
                        :
                        <Comp {...props} user={user} />
                    )
                    :
                    <Comp {...props} user={user} />
            )} />
        </FullScreenLayout>
    );
};

export default PublicFullScreenRoutes;

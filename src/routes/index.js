import React from 'react';
import {Switch, Route} from 'react-router-dom'

import PublicRoutes from './publicRoutes';
import PrivateRoutes from './privateRoutes';
import FullScreenRoutes from './publicFullScreenRoutes';

import Home from '../pages/home';
import SignInOrSignup from '../pages/auth/signInAndSignup';
import Dashboard from '../pages/admin';
import NotFound from '../pages/404/NotFound';
import Personality from '../pages/admin/personality';
import Services from '../pages/admin/services';
import Facts from '../pages/admin/facts';
import Testimonials from '../pages/admin/testimonials';
import Profile from '../pages/admin/profile';
import Logout from '../pages/auth/logout';

import EducationEdit from '../pages/admin/personality/educations/Edit';
import EditTraining from '../pages/admin/personality/trining/Edit';
import AddEditExperience from '../pages/admin/personality/experiences/addEditExperience';
import AddEditSkill from '../pages/admin/personality/skills/addEditSkill';
import AddEditService from '../pages/admin/services/addEditService';
import AddEditFact from '../pages/admin/facts/addEditFacts';
import AddEditTestimonial from '../pages/admin/testimonials/addEditTestimonial';
import Portfolio from '../pages/admin/portfolio';
import AddEditPortfolio from '../pages/admin/portfolio/addEditPortfolio';
import ProjectDetails from '../pages/home/portfolio/details';
import AddEditPortfolioCategory from "../pages/admin/portfolio/addEditPortfolioCategory";

const Index = (props) => {

    return (
        <Switch>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditPortfolio} path="/admin/portfolio/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditPortfolio} path="/admin/portfolio/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditPortfolioCategory} path="/admin/portfolio/category/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditPortfolioCategory} path="/admin/portfolio/category/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditTestimonial} path="/admin/testimonial/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditTestimonial} path="/admin/testimonial/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditFact} path="/admin/fact/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditFact} path="/admin/fact/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditService} path="/admin/service/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditService} path="/admin/service/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditSkill} path="/admin/skill/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditSkill} path="/admin/skill/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditExperience} path="/admin/experience/save"/>
            <PrivateRoutes {...props} restricted={true} exact component={AddEditExperience} path="/admin/experience/save/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={EditTraining} path="/admin/training/edit/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={EducationEdit} path="/admin/education/edit/:id"/>
            <PrivateRoutes {...props} restricted={true} exact component={Portfolio} path="/admin/portfolios"/>
            <PrivateRoutes {...props} restricted={true} exact component={Profile} path="/admin/profile"/>
            <PrivateRoutes {...props} restricted={true} exact component={Testimonials} path="/admin/testimonials"/>
            <PrivateRoutes {...props} restricted={true} exact component={Facts} path="/admin/facts"/>
            <PrivateRoutes {...props} restricted={true} exact component={Services} path="/admin/services"/>
            <PrivateRoutes {...props} restricted={true} exact component={Personality} path="/admin/personality"/>
            <PrivateRoutes {...props} restricted={true} exact component={Dashboard} path="/admin/dashboard"/>
            <PrivateRoutes {...props} restricted={true} exact component={Dashboard} path="/admin"/>
            <PrivateRoutes {...props} restricted={true} exact component={Logout} path="/admin/logout"/>

            <FullScreenRoutes {...props} restricted={true} exact component={SignInOrSignup} path="/login"/>

            <PublicRoutes {...props} restricted={false} exact component={ProjectDetails} path="/project/:id"/>
            <PublicRoutes {...props} restricted={false} exact component={Home} path="/"/>

            <Route exact component={NotFound} path=""/>
        </Switch>

    );
};

export default Index;

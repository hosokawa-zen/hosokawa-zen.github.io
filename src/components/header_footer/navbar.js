import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { Link } from "react-scroll";
import * as LinkClickable from 'react-router-dom';

const Navbar = (props) => {

    const naveItems = [
        {
            title: 'Home',
            url: 'hero',
            icon: 'HouseDoor',
            auth: false
        },
        {
            title: 'About',
            url: 'about',
            icon: 'PersonBoundingBox',
            auth: false
        },
        {
            title: 'Portfolio',
            url: 'portfolio',
            icon: 'Book',
            auth: false
        },
        {
            title: 'Resume',
            url: 'resume',
            icon: 'FileTextFill',
            auth: false
        },
        {
            title: 'Services',
            url: 'services',
            icon: 'HddStack',
            auth: false
        },
        {
            title: 'Contact',
            url: 'contact',
            icon: 'Envelope',
            auth: false
        },
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: 'Speedometer2',
            auth: true
        },
        {
            title: 'Logout',
            url: '/admin/logout',
            icon: 'BoxArrowLeft',
            auth: true
        },
    ]

    const adminNaveItems = [
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: 'Speedometer2'
        },
        {
            title: 'Profile',
            url: '/admin/profile',
            icon: 'PersonBoundingBox'
        },
        {
            title: 'Portfolio',
            url: '/admin/portfolios',
            icon: 'Book'
        },
        {
            title: 'Personality',
            url: '/admin/personality',
            icon: 'CodeSlash'
        },
        {
            title: 'Services',
            url: '/admin/services',
            icon: 'HddStack'
        },
        {
            title: 'Client Facts',
            url: '/admin/facts',
            icon: 'EmojiLaughing'
        },
        {
            title: 'Testimonials',
            url: '/admin/testimonials',
            icon: 'BarChart'
        },
        {
            title: 'Logout',
            url: '/admin/logout',
            icon: 'BoxArrowLeft'
        },
    ]

    const showNav = () => (
        naveItems.map(({ title, url, icon, auth, login }, i) => {
            const { [icon]: Icon } = Icons
            return <li key={i}>
                {auth && props.user?
                    !login ?
                    <LinkClickable.Link
                        className="nav-link"
                        to={url}
                    >
                        <Icon/>
                        <span>{title}</span>
                    </LinkClickable.Link>
                    : null
                   : !props.user && login ?
                    <LinkClickable.Link
                        className="nav-link"
                        to={url}
                    >
                        <Icon/>
                        <span>{title}</span>
                    </LinkClickable.Link>
                    : auth === false ?
                        <Link
                            className="nav-link"
                            activeClass="active"
                            to={url}
                            spy={true}
                            smooth={true}
                            duration={500}
                        >
                            <Icon/>
                            <span>{title}</span>
                        </Link> : null}
            </li>
        })
    )

    const showAdminNav = () => (
        adminNaveItems.map(({ title, url, icon }, i) => {
            const { [icon]: Icon } = Icons
            return <li key={i}>
                <LinkClickable.Link
                    className="nav-link"
                    to={url}
                >
                    <Icon></Icon>
                    <span>{title}</span>
                </LinkClickable.Link>
            </li>
        })
    )

    return (
        <nav id="navbar" className="nav-menu navbar">
            <ul>
                {props.nav ?
                    (props.user && props.user.role === 'admin' ?
                        showAdminNav()
                        : showNav()
                    )
                    : showNav()
                }
            </ul>
        </nav>
    );
};

export default Navbar;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import SocialProfile from '../social_icon';
import Navbar from './navbar';

// import upworkIcon from '../../assets/icon/upwork-Icon.png'
// import fiverrIcon from '../../assets/icon/fiverr-icon.png'

class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="d-flex flex-column">
                    <div className="profile">
                        <img src="/assets/img/profile-thumb.png" alt="" className="img-fluid rounded-circle" />
                        <h1 className="text-light"><Link to="/">Hosokawa Zen</Link></h1>
                        <div className="social-links mt-3 text-center">
                            <SocialProfile
                                linkTo="https://github.com/hosokawa-zen"
                                icon="github"
                            />
                            <SocialProfile
                                linkTo="https://www.linkedin.com/in/zen-hosokawa-1a9193181"
                                icon="linkedin"
                            />
                            <SocialProfile
                                linkTo="https://join.skype.com/invite/jdRxtXdi10d9"
                                icon="skype"
                            />
                            {/*<a href="https://www.fiverr.com/themexcoder" target="_blank" rel="noreferrer">*/}
                            {/*    <img src={fiverrIcon} alt="Fiverr" />*/}
                            {/*</a>*/}
                        </div>
                    </div>
                    <Navbar {...this.props} />
                </div>
            </header>
        );
    }
}

export default Header;

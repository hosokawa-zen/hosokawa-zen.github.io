import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HeroSlider from './slider/HeroSlider';
import Facts from './facts';
import Skills from './skills';
import Resume from './resume';
import Services from './services';
// import Testimonial from './testimonal';
import Contact from './contact';
import Portfolio from './portfolio';

class Home extends Component {

    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <div>
                <HeroSlider/>
                <Portfolio {...this.props}/>
                <Skills {...this.props}/>
                <Facts {...this.props}/>
                <Services {...this.props}/>
                {/*<Resume {...this.props}/>*/}
                {/*<Testimonial {...this.props}/>*/}
                <Contact {...this.props}/>
            </div>
        );
    }

};

export default Home;

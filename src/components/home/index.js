import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import About from './about';
import HeroSlider from './slider/HeroSlider';
import Facts from './facts';
import Skills from './skills';
import Resume from './resume';
import Services from './services';
import Testimonial from './testimonal';
import Contact from './contact';
import Portfolio from './portfolio';

class Home extends Component {

    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <div>
                <HeroSlider
                    name="Hosokawa Zen"
                    typeItems={
                        [
                            'Full Stack Developer',
                            'Laravel/Vuejs Developer',
                            'Nodejs/React Developer',
                            'TypeScript Developer',
                            'Hybrid Mobile Developer',
                            'ReactNative Developer',
                            'Flutter Developer',
                        ]
                    }
                />

                <About
                    user={this.props.user} />
                <Facts />
                <Skills />
                <Resume />
                <Portfolio />
                <Services />
                <Testimonial />
                <Contact />
            </div>
        );
    }

};

export default Home;

import React, { Component } from 'react';
import { Tag } from '../../../components/misc';
import ServiceItems from './ServiceItems';

class Services extends Component {

    state = {
        tag: {
            title: 'Services'
        }
    }

    render() {
        return (
            <section id="services" className="services section-bg">
                <div className="container">
                    <Tag
                        title={this.state.tag.title}>
                        {this.state.tag.sumary}
                    </Tag>

                    <ServiceItems/>
                </div>
            </section>
        );
    }
}

export default Services;

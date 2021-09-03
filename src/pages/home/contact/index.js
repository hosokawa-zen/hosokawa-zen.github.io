import React, { Component } from 'react';
import {firebaseDB, firebaseProfile} from '../../../firebase';
import { ContactItem, Tag } from '../../../components/misc';
import ContactForm from './ContactForm';

class Contact extends Component {

    state = {
        email: '',
        mobile: '',
        address: ''
    }

    componentDidMount() {
        firebaseDB.collection(firebaseProfile).get()
            .then((snapshot) => {
                if(snapshot.docs.length){
                    const profileDoc = snapshot.docs[0];
                    const profile = profileDoc.data();

                    this.setState({
                        email: profile.email,
                        mobile: profile.mobile,
                        address: profile.address
                    })
                }
            })
    }

    render() {
        return (
            <section id="contact" className="contact">
                <div className="container">
                    <Tag
                        title="Contact">
                    </Tag>

                    <div className="row" data-aos="fade-in">

                        <div className="col-lg-5 d-flex align-items-stretch" data-aos="fade-right" >
                            <div className="info">
                                <ContactItem
                                    title="Location"
                                    content={this.state.address}
                                    icon="GeoAlt"
                                />
                                <ContactItem
                                    title="Email"
                                    content={this.state.email}
                                    icon="Envelope"
                                />
                                <ContactItem
                                    title="Call"
                                    content={this.state.mobile}
                                    icon="Phone"
                                />

                                <iframe
                                    title="my location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.32029342840826!2d114.00125896520255!3d22.537001224150387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f3d5526bc9b7%3A0x436d8ba3cd4b12d!2zMjLCsDMyJzE0LjAiTiAxMTTCsDAwJzA1LjYiRQ!5e0!3m2!1sen!2s!4v1630692113797!5m2!1sen!2s"
                                    frameBorder="0"
                                    style={{
                                        border: 0, width: '100%', height: '290px'
                                    }}
                                    allowFullScreen
                                    loading="lazy"></iframe>

                            </div>

                        </div>

                        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </section>
        );
    }
};

export default Contact;

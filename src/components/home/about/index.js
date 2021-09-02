import { Markup } from 'interweave';
import React, { Component } from 'react';
import {firebaseProfile, firebase, firebaseDB} from '../../../firebase';
import { Tag } from '../../../ui/misc';
import AboutUs from './AboutUs';

class About extends Component {

    state = {
        profile: [],
        basic_details: '',
        professional_details: ''
    }

    componentDidMount() {
        firebaseDB.collection(firebaseProfile).get()
            .then((snapshot) => {
                if(snapshot.docs.length){
                    const profileDoc = snapshot.docs[0];
                    const profile = profileDoc.data();
                    const now = new Date();
                    const nYear = now.getFullYear();
                    const dob = new Date(profile.birthday);
                    const bYear = dob.getFullYear();
                    profile.dob = nYear - bYear;

                    firebase.storage().ref('profile')
                        .child(profile.featuredImage).getDownloadURL()
                        .then(url => {
                            profile.featuredUrl = url;

                            this.setState({
                                profile: profile,
                                basic_details: profile.basic_details,
                                professional_details: profile.professional_details
                            })
                        })
                }
            })
    }

    render() {
        return (
            <section id="about" className="about">
                <div className="container">
                    <Tag
                        title="About"
                    >
                        <Markup content={this.state.basic_details} />
                    </Tag>

                    <div className="row">
                        <div className="col-lg-4" data-aos="fade-right">
                            <img src={this.state.profile.featuredUrl} className="img-fluid" alt="" />
                        </div>

                        <AboutUs
                            {...this.state}
                            positon="IT Engineer"
                        />
                    </div>

                </div>
            </section>
        );
    }
}

export default About;

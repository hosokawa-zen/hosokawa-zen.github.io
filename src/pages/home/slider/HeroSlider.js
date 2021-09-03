import React, {Component} from 'react';
import {firebase, firebaseDB, firebaseProfile} from "../../../firebase";
import AboutUs from "./AboutUs";

class HeroSlider extends Component {

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
            <section
                id="hero"
                className="d-flex flex-column justify-content-center align-items-center"
                style={{
                    backgroundImage: `url(/assets/img/baymax_bg.jpg)`
                }}
            >
                <div className="hero-container container" data-aos="fade-in">
                    <div className="row">
                        <div className="col-lg-4" data-aos="fade-right">
                            <img src={this.state.profile.featuredUrl} className="img-fluid" alt="" />
                        </div>
                        <AboutUs
                            {...this.state}
                            name="Hosokawa Zen"
                            positon="IT Engineer"
                            typeItems={
                                [
                                    'Full Stack Developer',
                                    'Laravel/Vue Developer',
                                    'Nodejs/React Developer',
                                    'TypeScript Developer',
                                    'Hybrid Mobile Developer',
                                    'ReactNative Developer',
                                    'Flutter Developer',
                                    'BlockChain Developer',
                                ]
                            }
                        />
                    </div>
                </div>
            </section>
        );
    }
};

export default HeroSlider;

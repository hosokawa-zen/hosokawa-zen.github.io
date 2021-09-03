import React, { Component } from 'react';
import {firebaseDB, firebaseProfile} from '../../../firebase';

import { ResumeItem } from '../../../components/misc';

class BasicInfo extends Component {

    state = {
        title: '',
        subtitle: '',
        list: ""
    }

    componentDidMount() {
        firebaseDB.collection(firebaseProfile).get()
            .then((snapshot) => {
                if(snapshot.docs.length){
                    const profileDoc = snapshot.docs[0];
                    const profile = profileDoc.data();
                    const info = `<ul>
                        <li>${profile.address}</li>
                        <li><a href="tel:${profile.mobile}">${profile.mobile}</a></li>
                        <li><a href="mailto:${profile.email}">${profile.email}</a></li></ul>`
                    this.setState({
                        title: profile.name,
                        subtitle: profile.sumary,
                        list: info
                    })
                }
            })
    }

    showInfo = () => (
        <ResumeItem
            title={this.state.title}
            subtitle={this.state.subtitle}
            details={this.state.list}
        />
    )

    render() {
        return (
            <div>
                <h3 className="resume-title">{this.props.title}</h3>

                {this.showInfo()}

            </div>
        );
    }

};

export default BasicInfo;

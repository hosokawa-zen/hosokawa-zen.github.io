import React, { Component } from 'react';
import {firebaseDB, firebaseEducation} from '../../../firebase';
import { firebaseLooper, ResumeItem, reverseArray } from '../../../components/misc';

class Education extends Component {

    state = {
        education: []
    }

    componentDidMount() {
        firebaseDB.collection(firebaseEducation).get().then(snapshot => {
            const education = firebaseLooper(snapshot);
            this.setState({
                education: reverseArray(education)
            })
        })
    }

    showEducation = () => (
        this.state.education.map( (edu, i) => (
            <ResumeItem
                key={i}
                title={edu.title}
                experience={edu.passing_year}
                subtitle={edu.intitute}
                details={edu.sumary}
            />
        ) )
    )

    render() {
        return (
            <div>
                <h3 className="resume-title">{ this.props.title }</h3>

                { this.showEducation() }
            </div>
        );
    }
}

export default Education;

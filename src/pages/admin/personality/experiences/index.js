import React, { Component } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import {firebaseExperience, firebaseDB} from '../../../../firebase';
import { firebaseLooper, reverseArray } from '../../../../components/misc';

class Experience extends Component {

    state = {
        isLoading: true,
        experience: []
    }

    componentDidMount() {
        firebaseDB.collection(firebaseExperience).get()
            .then(snapshot => {

            const experience = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                experience: reverseArray(experience)
            })
        })
    }

    removeEducation(id) {
        firebaseDB.collection(firebaseExperience).doc(id).delete().then(() => {
            window.location.reload();
        });
    }

    render() {
        return (
            <div>
                <div className="per-tab pt-4 pb-4">
                    <div className="add-button text-end pb-4">
                        <Link to="/admin/experience/save">
                            <Button variant="outline-secondary">Add Experience</Button>
                        </Link>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Institute</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.experience ?
                                this.state.experience.map((exp, i) => (
                                    <tr key={exp.id} >
                                        <td>{exp.title}</td>
                                        <td>{exp.intitute}</td>
                                        <td>{exp.time_period}</td>
                                        <td>
                                            <Link to={`/admin/experience/save/${exp.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                            {(this.props.user.role === 'admin') ?
                                            <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(exp.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
                                            :null}
                                        </td>
                                    </tr>
                                ))
                                : null
                            }

                        </tbody>
                    </Table>
                    <div className="text-center">
                        {this.state.isLoading ?
                            <Spinner animation="border" variant="info" />
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Experience;

import React, { Component } from 'react';
import { Table, Button, Modal, Spinner } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';

import { validate, firebaseLooper, reverseArray } from '../../../../components/misc';
import FormField from '../../../../components/formFields';
import {firebaseDB, firebaseTraining} from '../../../../firebase';
import { Link } from 'react-router-dom';

class TrainingModal extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_title',
                    type: 'text',
                    placeholder: 'Training title'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            intitute: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_intitute',
                    type: 'text',
                    placeholder: 'Training intitute'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            passing_year: {
                element: 'input',
                value: '',
                config: {
                    name: 'edu_passing_year',
                    type: 'text',
                    placeholder: 'Training year'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
            sumary: {
                element: 'textarea',
                value: '',
                config: {
                    name: 'edu_sumary',
                    type: 'textarea',
                    placeholder: 'Training sumary'
                },
                validation: {
                    required: false,
                    email: false
                },
                valid: false,
                validationMessage: ''
            },
        }
    }


    updateForm(element) {
        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]
        newFormdata[element.id] = newElement;

        this.setState({
            formData: newFormdata
        })

        if (validData[0] === false) {
            this.setState({
                formError: true
            })
        } else {
            this.setState({
                formError: false
            })
        }
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            if ((this.state.formData[key].value === '') && (this.state.formData[key].validation.required === true)) {
                const newFormdata = { ...this.state.formData }
                const newElement = { ...this.state.formData[key] }
                let validData = validate(newElement)
                newElement.valid = validData[0];
                newElement.validationMessage = validData[1]
                newFormdata[key] = newElement;

                this.setState({
                    formData: newFormdata
                })

                formIsValid = false;
            } else {
                dataToSubmit[key] = this.state.formData[key].value;
                formIsValid = true;
            }
        }


        if (formIsValid) {
            firebaseDB.collection(firebaseTraining).add(dataToSubmit).then((r) => {
                this.successForm('Training added successfuly !')
            }).catch((e) => {
                console.log(e)
                this.setState({ formError: true })
            })


        } else {
            console.log("not valied")
            this.setState({
                formError: true
            })
        }
    }

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>{this.props.data.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-container">
                            <form>
                                <FormField
                                    id={'title'}
                                    formData={this.state.formData.title}
                                    change={(event) => this.updateForm(event)}
                                />
                                {this.state.formError ?
                                    this.state.formData.title.validationMessage
                                    : null
                                }
                                <FormField
                                    id={'intitute'}
                                    formData={this.state.formData.intitute}
                                    change={(event) => this.updateForm(event)}
                                />
                                {this.state.formError ?
                                    this.state.formData.intitute.validationMessage
                                    : null
                                }
                                <FormField
                                    id={'passing_year'}
                                    formData={this.state.formData.passing_year}
                                    change={(event) => this.updateForm(event)}
                                />
                                {this.state.formError ?
                                    this.state.formData.passing_year.validationMessage
                                    : null
                                }
                                <FormField
                                    id={'sumary'}
                                    formData={this.state.formData.sumary}
                                    change={(event) => this.updateForm(event)}
                                />
                                {this.state.formError ?
                                    this.state.formData.sumary.validationMessage
                                    : null
                                }
                            </form>
                            <div>
                                {this.state.formSuccess ?
                                    this.state.formSuccess
                                    : null
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

class Training extends Component {
    state = {
        isLoading: true,
        mShow: false,
        training: [],
        data: {
            title: '',
            id: null,
            formType: ''
        }
    }

    componentDidMount() {
        firebaseDB.collection(firebaseTraining).get()
            .then(snapshot => {

            const training = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                training: reverseArray(training)
            })
        })
    }


    addNewEdu = () => {
        this.setState({
            mShow: true,
            data: {
                title: "Add Training"
            }
        })
    }

    editEducation = (id) => {
        this.setState({
            mShow: true,
            data: {
                title: "Edit Training",
                id: id,
                formType: 'edit'
            }
        })
    }

    removeEducation(id) {
        firebaseDB.collection(firebaseTraining).doc(id).delete().then(() => {
            window.location.reload();
        });
    }

    render() {
        return (
            <div className="per-tab pt-4 pb-4">

                <div className="add-button text-end pb-4">
                    <Button
                        variant="outline-secondary"
                        onClick={() => this.addNewEdu()} >Add Training</Button>
                    <TrainingModal
                        show={this.state.mShow}
                        data={this.state.data}
                        onHide={() => this.setState({ mShow: false })}
                    />
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
                        {this.state.training ?
                            this.state.training.map((edu, i) => (
                                <tr key={edu.id} >
                                    <td>{edu.title}</td>
                                    <td>{edu.intitute}</td>
                                    <td>{edu.passing_year}</td>
                                    <td>
                                        <Link to={`/admin/training/edit/${edu.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                        {(this.props.user.role === 'admin') ?
                                        <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeEducation(edu.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
                                        : null }
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
        );
    }
}

export default Training;

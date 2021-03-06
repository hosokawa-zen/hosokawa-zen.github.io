import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../../components/misc';
import FormField from '../../../../components/formFields';
import {firebaseDB, firebaseSkills} from '../../../../firebase';
import { Link } from 'react-router-dom';

class AddEditSkill extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formType: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title',
                    type: 'text',
                    placeholder: 'Title',
                    label: 'Title'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            percentage: {
                element: 'input',
                value: '',
                config: {
                    name: 'percentage',
                    type: 'number',
                    placeholder: 'Percentage',
                    label: 'Percentage',
                    appendtext: '%'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true,
                append: true
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
            formError: false,
            formData: newFormdata
        })
    }
    updateEditor(element) {
        const newFormdata = { ...this.state.formData }
        const newElement = { ...newFormdata[element.id] }

        newElement.value = element.event;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormdata
        })
    }

    updateFields(experience, type, id) {
        const newFormdata = {
            ...this.state.formData
        }

        for (let key in newFormdata) {
            if (experience) {
                newFormdata[key].value = experience[key];
                newFormdata[key].valid = true;
            }
        }

        this.setState({
            id,
            formType: type,
            formData: newFormdata
        })
    }

    componentDidMount() {
        const expId = this.props.match.params.id;


        if (!expId) {
            this.updateFields(false, 'Add Skill', expId)
        } else {
            firebaseDB.collection(firebaseSkills)
                .doc(expId)
                .get()
                .then((snapshot) => {
                    const exp = snapshot.data();

                    this.updateFields(exp, 'Edit Skill', expId)
                })
        }
    }

    submitForm(event) {
        event.preventDefault();
        if (this.props.user.role !== 'admin') {
            window.alert("Sorry you are not able to update")
        } else {
            let dataToSubmit = {};
            let formIsValid = true;

            for (let key in this.state.formData) {
                dataToSubmit[key] = this.state.formData[key].value;
                formIsValid = this.state.formData[key].valid && formIsValid;
            }


            if (formIsValid) {
                if (this.state.formType === 'Edit Skill') {
                    firebaseDB.collection(firebaseSkills).doc(this.state.id)
                        .update(dataToSubmit).then(() => {
                            this.successForm('Updated correctly');
                        }).catch((e) => {
                            this.setState({ formError: true })
                        })
                } else {
                    firebaseDB.collection(firebaseSkills).add(dataToSubmit).then(() => {
                        this.props.history.push('/admin/personality');
                    }).catch((e) => {
                        this.setState({ formError: true })
                    })
                }
            } else {
                this.setState({
                    formError: true
                })
            }
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
            this.props.history.push('/admin/personality');
        }, 2000)
    }

    render() {
        return (
            <section className="inner">
                <div className="container-fluid">
                    <Card border="primary" style={{ maxWidth: '850px' }}>
                        <Card.Header><h3>{this.state.formType}</h3></Card.Header>
                        <Card.Body>
                            <div className="form-container">
                                <form onSubmit={(event) => this.submitForm(event)}>
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
                                        id={'percentage'}
                                        formData={this.state.formData.percentage}
                                        change={(event) => this.updateForm(event)}
                                    />
                                    {this.state.formError ?
                                        this.state.formData.percentage.validationMessage
                                        : null
                                    }
                                    <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                                    <Link to="/admin/personality" className="ms-3"><Button variant="info" >Back</Button></Link>
                                </form>
                                <div>
                                    {this.state.formSuccess ?
                                        this.state.formSuccess
                                        : null
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        );
    }
}

export default AddEditSkill;

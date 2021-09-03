import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { validate } from '../../../components/misc';
import FormField from '../../../components/formFields';
import {firebaseDB, firebasePortfolioCategories} from '../../../firebase';
import { Link } from 'react-router-dom';

class AddEditPortfolioCategory extends Component {

    state = {
        formError: false,
        formSuccess: '',
        id: '',
        formType: '',
        defaultImg: '',
        defaultThumb: '',
        formData: {
            key: {
                element: 'input',
                value: '',
                config: {
                    name: 'key',
                    type: 'text',
                    placeholder: 'Enter category key',
                    label: 'Key'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title',
                    type: 'text',
                    placeholder: 'Enter category title',
                    label: 'Title'
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            }
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
    updateImage(element) {
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
            this.updateFields(false, 'Add Category', expId)
        } else {
            firebaseDB.collection(firebasePortfolioCategories)
                .doc(expId)
                .get()
                .then((snapshot) => {
                    const exp = snapshot.data();

                    this.updateFields(exp, 'Edit Category', expId)
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
                if (this.state.formType === 'Edit Category') {
                    firebaseDB.collection(firebasePortfolioCategories).doc(this.state.id)
                        .update(dataToSubmit).then(() => {
                            this.successForm('Updated correctly');
                        }).catch((e) => {
                            this.setState({ formError: true })
                        })
                } else {
                    firebaseDB.collection(firebasePortfolioCategories).add(dataToSubmit).then(() => {
                        this.props.history.push('/admin/portfolios');
                    }).catch((e) => {
                        console.log(e)
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
            this.props.history.push('/admin/portfolios');
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
                                    <div className="mb-4">
                                        <FormField
                                            id={'key'}
                                            formData={this.state.formData.key}
                                            change={(event) => this.updateForm(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.key.validationMessage
                                            : null
                                        }
                                        <FormField
                                            id={'title'}
                                            formData={this.state.formData.title}
                                            change={(event) => this.updateForm(event)}
                                        />
                                        {this.state.formError ?
                                            this.state.formData.title.validationMessage
                                            : null
                                        }
                                    </div>
                                    {this.state.formError ?
                                        <div className="error_label">
                                            Something is wrong
                                        </div>
                                        : ''
                                    }
                                    <Button variant="primary" onClick={(event) => this.submitForm(event)} >Save Change</Button>
                                    <Link to="/admin/portfolios" className="ms-3"><Button variant="info" >Back</Button></Link>
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

export default AddEditPortfolioCategory;

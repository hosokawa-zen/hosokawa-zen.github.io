import React, { Component } from 'react';
import { Spinner, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {firebasePortfolios, firebaseDB, firebasePortfolioCategories} from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../../components/misc';
import * as Icons from 'react-bootstrap-icons'

class Portfolio extends Component {
    state = {
        isLoading: true,
        categories: [],
        portfolios: [],
    }

    componentDidMount() {
        firebaseDB.collection(firebasePortfolioCategories).get()
            .then(snapshot => {
                const categories = firebaseLooper(snapshot);
                this.setState({
                    categories: reverseArray(categories)
                });
            })
        firebaseDB.collection(firebasePortfolios).get()
            .then(snapshot => {

            const portfolio = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                portfolios: reverseArray(portfolio)
            })
        })
    }

    removeCategory(id) {
        firebaseDB.collection(firebasePortfolioCategories).doc(id).delete().then(() => {
            window.location.reload();
        });
    }

    removePortfolio(id) {
        firebaseDB.collection(firebasePortfolios).doc(id).delete().then(() => {
            window.location.reload();
        });
    }

    render() {
        return (
            <section className="portfolio">
                <div className="container-fluid">
                    <Card border="primary">
                        <Card.Header>
                            <div className="float-start">
                                <h3>Categories</h3>
                            </div>
                            <div className="add-button float-end">
                                <Link to="/admin/portfolio/category/save">
                                    <Button variant="outline-secondary">Add Category</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Title</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.categories ?
                                    this.state.categories.map((cat, i) => (
                                        <tr key={cat.id} >
                                            <td>{cat.key}</td>
                                            <td>{cat.title}</td>
                                            <td>
                                                <Link to={`/admin/portfolio/category/save/${cat.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                                {(this.props.user.role === 'admin') ?
                                                    <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removeCategory(cat.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
                                                    : null}
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
                        </Card.Body>
                    </Card>

                    <Card border="primary" className="mt-5">
                        <Card.Header>
                            <div className="float-start">
                                <h3>Portfolios</h3>
                            </div>
                            <div className="add-button float-end">
                                <Link to="/admin/portfolio/save">
                                    <Button variant="outline-secondary">Add Portfolio</Button>
                                </Link>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Client</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.portfolios ?
                                        this.state.portfolios.map((port, i) => (
                                            <tr key={port.id} >
                                                <td>{port.title}</td>
                                                <td>{port.client}</td>
                                                <td>{this.state.categories.find(cat => cat.key === port.category)?.title??''}</td>
                                                <td>
                                                    <Link to={`/admin/portfolio/save/${port.id}`} ><Button variant="warning" size="sm" ><Icons.Pencil /></Button></Link>
                                                    {(this.props.user.role === 'admin') ?
                                                        <Button onClick={() => { if (window.confirm('Are you sure! Do you want to delete this?')) { this.removePortfolio(port.id) } }} variant="danger" size="sm"><Icons.Trash /></Button>
                                                        : null}
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
                        </Card.Body>
                    </Card>
                </div>
            </section>
        );
    }
}

export default Portfolio;

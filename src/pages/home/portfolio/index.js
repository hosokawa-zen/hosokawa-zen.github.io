import React, { Component } from 'react';
import {firebasePortfolios, firebase, firebaseDB, firebasePortfolioCategories} from '../../../firebase';
import {firebaseLooper, reverseArray, Tag} from '../../../components/misc';
import * as Icons from 'react-bootstrap-icons'
import { Promise } from 'core-js';
import { SRLWrapper } from "simple-react-lightbox";

import Button from './Button';


class Portfolio extends Component {

    state = {
        filter: 'all',
        categories: [],
        portfolios: [],
        filterPortfolios: []
    }

    componentDidMount() {
        firebaseDB.collection(firebasePortfolioCategories).get()
            .then(snapshot => {
                let categories = firebaseLooper(snapshot);
                categories = reverseArray(categories).map(cat => ({key: cat.key, value: cat.title}));
                categories = [{key: 'all', value: 'All'}, ...categories];
                this.setState({categories});
            })

        firebaseDB.collection(firebasePortfolios).get().then(snapshot => {
            const portfolio = firebaseLooper(snapshot);
            let promises = [];
            for (let key in portfolio) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('portfolios')
                            .child(portfolio[key].thumb).getDownloadURL()
                            .then(url => {
                                portfolio[key].trumbUrl = url;
                                resolve();
                            })
                    })
                )
                portfolio[key].imageUrls = [];
                portfolio[key].images.forEach((img, index) => {
                    promises.push(
                        new Promise((resolve, reject) => {
                            firebase.storage().ref('portfolios')
                                .child(img).getDownloadURL()
                                .then(url => {
                                    portfolio[key].imageUrls[index] = url;
                                    resolve();
                                })
                        })
                    )
                })
            }

            Promise.all(promises).then(() => {
                this.setState({
                    portfolios: portfolio,
                    filterPortfolios: portfolio
                })
            })
        })
    }

    filterPortfolio = (filter) => {
        const list = this.state.portfolios.filter((result) => {
            return result.category === filter
        });

        this.setState({
            filterPortfolios: filter === 'all' ? this.state.portfolios : list,
            filter: filter
        })
    }

    render() {
        return (
            <section id="portfolio" className="portfolio">
                <div className="container">
                    <Tag title="Portfolio" />

                    <div className="row" data-aos="fade-up">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <ul id="portfolio-flters">
                                {
                                    this.state.categories.map(cat => (
                                        <li key={cat.key} className={`option ${this.state.filter === cat.key ? 'filter-active' : ''}`}
                                            onClick={() => this.filterPortfolio(cat.key)} >{cat.value}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="portfolio-container">
                        <SRLWrapper>
                            {this.state.filterPortfolios ?
                                this.state.filterPortfolios.map((prt, i) => (
                                    <div className="col-lg-4 col-md-6 portfolio-item" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                                        <h5>{prt.title}</h5>
                                        <div className="portfolio-wrap text-center cursor-pointer" onClick={() => {
                                            this.props.history.push({
                                                pathname: `project/${prt.id}`,
                                                productdetail: {
                                                    ...prt
                                                }
                                            });
                                        }}>
                                            <img src={prt.trumbUrl} className="img-fluid" alt=""/>
                                            <div className="portfolio-links">

                                                <Button imageToOpen={i} />
                                                <div onClick={(event) => {
                                                    event.stopPropagation();
                                                    this.props.history.push({
                                                        pathname: `project/${prt.id}`,
                                                        productdetail: {
                                                            ...prt
                                                        }
                                                    });
                                                }}>
                                                    <Icons.Link />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : null}
                        </SRLWrapper>
                    </div>
                </div>
            </section>
        );
    }
}

export default Portfolio;

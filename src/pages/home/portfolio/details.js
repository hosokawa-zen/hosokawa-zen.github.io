import { Markup } from 'interweave';
import React, { Component } from 'react';
import * as Icons from 'react-bootstrap-icons'
import {SRLWrapper, useLightbox} from "simple-react-lightbox";

class ProjectDetails extends Component {

    state = {
        projectDetail: {
            imageUrls: []
        }
    }

    componentDidMount() {
        if(this.props.location.productdetail) {
            this.setState({
                projectDetail: this.props.location.productdetail
            })
        } else {
            this.props.history.goBack()
        }
    }


    render() {
        const urls = this.state.projectDetail.url?.split(',')??[];
        return (
            <div>
                <section id="breadcrumbs" className="breadcrumbs">
                    <div className="container">

                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-primary" onClick={() => {this.props.history.goBack();}}><Icons.ArrowLeft /></button>
                            <h2>Project Details</h2>
                        </div>

                    </div>
                </section>
                <section id="portfolio-details" className="portfolio-details">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-8">
                                <SRLWrapper>
                                    {
                                        this.state.projectDetail.imageUrls.map((img, index) => (
                                            <ProjectImage key={index} img={img}/>
                                        ))
                                    }
                                </SRLWrapper>
                            </div>


                            <div className="col-lg-4">
                                <div className="portfolio-info">
                                    <h3>Project information</h3>
                                    <ul>
                                        <li><strong>Category</strong>: {this.state.projectDetail.category}</li>
                                        <li><strong>Client</strong>: {this.state.projectDetail.client}</li>
                                        <li><strong>Project date</strong>: {this.state.projectDetail.completeDate}</li>
                                        <li><strong>Project URL</strong>:
                                            {
                                                urls.map(url => <><a href={url}>{url}</a><br/></>)
                                            }
                                        </li>
                                    </ul>
                                </div>
                                <div className="portfolio-description">
                                    <h2>{this.state.projectDetail.title}</h2>
                                    <Markup content={this.state.projectDetail.sumary} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProjectDetails;

export const ProjectImage = (props) => {
    const { openLightbox } = useLightbox();

    return (
        <div className="portfolio-details-slider mb-4">
            <img className="SRL_CTA-OpenLightbox" src={props.img} alt=""  onClick={(event) => {
                event.stopPropagation();
                openLightbox(props.index)
            }}/>
        </div>
    );
};

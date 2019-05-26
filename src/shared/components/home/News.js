import React, { Component } from 'react';
import axios from 'axios';
import { BorderedCard, ImageZoom } from '../shared'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        const website = 'https://www.thedp.com/';
        const className = 'col-lg-6 col-md-5 col-sm-12 frontpage-carousel';
        axios.post('/api/news', {
            website,
            className,
        })
            .then((res) => {
                this.setState({ data: res.data });
            })
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return null;
        }

        const {
            picture,
            link,
            title,
            content,
            time
        } = this.state.data;
        return (
            <BorderedCard>
                <h1 className="title is-4">Latest News</h1>
                <h2 className="subtitle is-6"> More From <a href="https://www.thedp.com/">The Daily Pennsylvanian</a></h2>
                <article className="media">
                    <div className="media-left" style={{overflow:"hidden"}}>
                    <a href={link}>
                        <ImageZoom src={picture} alt="First" width="500px" /></a>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p className="is-size-6">
                                <strong><a href={link}>{title}</a></strong>
                                <br />
                                <small>{content}</small>
                                <br />
                                <br />
                                <small> {time} </small>
                            </p>
                        </div>
                    </div>
                </article>
            </BorderedCard>
        );
    }
}

export default News;
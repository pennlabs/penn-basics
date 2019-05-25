import React, { Component } from 'react';
import axios from 'axios';
import { BorderedCard } from '../shared'

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
        // const className = 'col-lg-6 col-md-5 col-sm-12 frontpage-carousel';
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
                <h2 className="subtitle is-6">The Daily Pennsylvanian</h2>
                <img src={picture} />
            </BorderedCard>
        );
    }
}

export default News;
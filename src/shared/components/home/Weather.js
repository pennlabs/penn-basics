import React, { Component } from 'react';
import axios from 'axios';
import { BorderedCard } from '../shared'
import dateFormat from 'dateformat'

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: null,
            greetings: ["Hi There!", "How Are You Doing?", "Yo, What's Up?"],
            emojis: ["😀", "😛", "😗"],
            greeting: '',
        }
    }

    componentDidMount() {
        axios.get('/api/quotes')
            .then((res) => {
                this.setState({ quotes: res.data })
            }).catch((err) => {
                // TODO better error handling

                console.log(err) // eslint-disable-line
            })

        const { greetings, emojis } = this.state;


        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.setState({ greeting: `${greeting} ${emoji}` });
    }

    render() {
        // TODO reduxify this
        const { quotes, greeting } = this.state;
        if (!quotes) {
            return null
        }

        const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)];
        return (
            <BorderedCard>
                <h1 className="title is-4">{greeting}</h1>
                <h2 className="subtitle is-6">Weather Notification</h2>
                <a className="weatherwidget-io" href="https://forecast7.com/en/39d95n75d17/philadelphia/" data-label_1="Philadelphia" data-label_2={dateFormat(new Date(), "dddd, mmmm dS")} data-days="3" data-accent="" data-theme="pure" data-highcolor="" data-lowcolor="" >PHILADELPHIA WEATHER</a>
                <div className="content is-medium" style={{ marginTop: "3%" }}>
                    <p className="has-text-centered">
                        {`"${quote}"`}
                    </p>
                    <p className="has-text-right">
                        {`--- ${author}`}
                    </p>
                </div>
            </BorderedCard>
        )
    }
}

export default Weather;
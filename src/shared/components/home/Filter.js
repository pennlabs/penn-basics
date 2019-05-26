import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterButton from './FilterBtn';

class Filter extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (<FilterButton
            text="Customize This Page"
            
            options={['Weather', 'Events', 'News']}
             />)
    }
}

export default Filter;
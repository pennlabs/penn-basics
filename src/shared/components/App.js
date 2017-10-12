import React, {Component} from 'react';

class App extends Component {
    render() {
        return(
            <div className="container is-fluid">
                <div className="notification">
                    This container is <strong>fluid</strong>: it will have a 24px gap on either side, on any viewport size.
                </div>
            </div>
        )
    }
}

export default App;
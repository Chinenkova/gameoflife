import React from 'react';
import './Cell.css';
class Cell extends React.Component {
    constructor(props) {
        super(props);
    }   

    render() {
        return (
            <td className={`Cell ${this.props.alive ? 'alive' : ''}`} onClick={this.props.changeState} />
        );
    }
    }
export default Cell;
import React from 'react';
import './Cell.css';
class Cell extends React.Component {
    constructor(props) {
        super(props);
    }   

    render() {
        const {changeState, index, alive} = this.props
        return (
            <td className={`Cell ${this.props.alive ? 'alive' : ''}`} onClick={() => changeState(index, this.props.alive)} />
        );
    }
}
export default Cell;
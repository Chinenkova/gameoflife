import React from 'react';
import './Cell.css';
class Cell extends React.Component {
    constructor(props) {
        super(props);
    }   

    render() {
        const {changeState, index, x, y, alive} = this.props
        return (
            <td className={`Cell ${this.props.alive ? 'alive' : ''}`} onClick={() => changeState(index, alive)} />
        );
    }
}
export default Cell;
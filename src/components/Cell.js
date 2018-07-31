import React from 'react';
import './Cell.css';
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alive: false,
        }
        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        this.setState(prevState => ({
            alive: !prevState.alive
        }));
        }
    

    render() {
        return (
        <div>
            <div className={`Cell ${this.state.alive ? 'alive' : ''}`} onClick={this.changeState} />            
        </div>
        );
    }
    }
export default Cell;
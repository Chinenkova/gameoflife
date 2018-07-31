import React from 'react';
import './Row.css';
import Cell from './Cell';
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.RenderCells = this.RenderCells.bind(this);
    }


    RenderCells() {
        return this.props.cells.map((cell, index) => (
            <Cell x={cell.x} y={cell.y} key={index}/>
        ));
    }

    render() {
        return (
        <div>
            <div className="Row">
                {this.RenderCells()}
            </div>
        </div>
        );
    }
    }
export default Row;
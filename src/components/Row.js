import React from 'react';
import './Row.css';
import Cell from './Cell';
class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div>
            <div className="Row">
                {this.props.rowCells.map((cell, index) => {
                    return <Cell x={cell.x} y={cell.y} key={index}/>
                })}
            </div>
        </div>
        );
    }
    }
export default Row;
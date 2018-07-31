import React from 'react';
import './Game.css';
//import Row from './Row';
import Cell from './Cell';
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: 8,
            rows: 8,
            cells: [],
        }
        this.CreateCells = this.CreateCells.bind(this);
        this.changeState = this.changeState.bind(this);
        //this.RenderRows = this.RenderRows.bind(this);
    }

    componentWillMount() {
        this.CreateCells();
    }

    CreateCells() {
        for (let y = 1; y <= this.state.rows; y++) {
            for (let x = 1; x <= this.state.columns; x++) {
                let alive = false;
                this.setState(prevState => ({cells: [...prevState.cells, {x, y, alive}]}));
            }
        }
    }

    changeState() {
        this.setState(prevState => ({
            alive: !prevState.alive
        }));
    }

    renderBoard = () => {
        let board = []    
        // Outer loop to create parent
        for (let row = 1; row <= this.state.rows; row++) {
            let children = []
            //Inner loop to create children
            for (let c = 1; c <= this.state.columns; c++) {
                children.push(<Cell x={c} y={row} changeState={this.changeState}/>)
            }
            //Create the parent and add the children
            board.push(<tr>{children}</tr>)
        }
            return board;
        }

    // RenderRows() {
    //     for(let row=1; row<=this.state.rows; row++) {
    //         let rowCells = this.state.cells.filter(cell => cell.y === row)
    //         return <Row rowCells={rowCells} id={row}/>;
    //     }
    // }


    render() {
        return (
        <div>
            <table className="Board">
                {this.renderBoard()}
            </table>
        </div>
        );
    }
    }
export default Game;
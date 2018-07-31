import React from 'react';
import './Game.css';
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
        this.setRows = this.setRows.bind(this);
        this.setColumns = this.setColumns.bind(this);
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

    changeState(index) {
        let cells = {...this.state.cells[index].alive}
        someProperty.flag = true;
        this.setState({someProperty})
        this.setState(prevState => ({
            cell.alive: !prevState.cells.alive
        }));
    }

    renderBoard = () => {
        // let board = [];    
        // for (let row = 1; row <= this.state.rows; row++) {
        //     let children = [];
        //     for (let c = 1; c <= this.state.columns; c++) {
        //         children.push(<Cell x={c} y={row} alive={false} changeState={this.changeState}/>)
        //     }
        //     board.push(<tr>{children}</tr>)
        // }
        //     return board;

        const array = [];
        for (let row = 1; row <= this.state.rows; row++) {
            let rowCells = this.state.cells.filter(cell => cell.y===row);
            array.push(<tr>
            {rowCells.map(cell => {
                return (<Cell x={cell.x} y={cell.y} alive={cell.alive} changeState={this.changeState(cell)}/>)
            })}
            </tr>)
        }
        return array;
    }

    setRows(event) {
        this.setState({rows: event.target.value});
    }

    setColumns(event) {
        this.setState({columns: event.target.value});
    }

    render() {
        return (
        <div>
            <table className="Board">
                {this.renderBoard()}
            </table>
            <form>
                <label for="rows">Rows:</label>
                <input type="text" id="rows" onChange={this.setRows}/>
                <label for="columns">Columns</label>
                <input type="text" id="columns" onChange={this.setColumns}/>
            </form>
        </div>
        );
    }
    }
export default Game;
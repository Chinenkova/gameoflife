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
        this.setRows = this.setRows.bind(this);
        this.setColumns = this.setColumns.bind(this);
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

    setRows(event) {
        this.setState({rows: event.target.value});
    }

    setColumns(event) {
        this.setState({columns: event.target.value});
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
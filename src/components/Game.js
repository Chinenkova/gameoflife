import React from 'react';
import './Game.css';
import Cell from './Cell';
import update from 'immutability-helper';

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.CreateCells(); 
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.rows !== prevState.rows || this.state.columns !== prevState.columns) {
            this.CreateCells(); 
        }
    }

    CreateCells() {
        let idx=0;
        for (let y = 1; y <= this.state.rows; y++) {
            for (let x = 1; x <= this.state.columns; x++) {
                this.setState(prevState => ({cells: [...prevState.cells, {x: x, y: y, alive: false, index: idx++}]}));
            }
        }
    }

    changeState(index, value) {
        let ind=index;
        let cells = update(this.state.cells, {[ind]: {alive: {$set: !value}}});
        this.setState({cells: cells}, () => {
            console.log(this.state.cells); // further value-
        });
    }

    renderCells() {
        this.state.cells.map(cell => {
            return <Cell CreateCells={this.CreateCells} changeState={this.changeState}/> 
        }
    }
    
    renderRow() {
        for (let row = 1; row <= this.state.rows; row++) {
            return <tr>{this.renderCells()}</tr>
        }
    }


    renderBoard = () => {
        let board = [];        
        let idx = 0;    
        for (let row = 1; row <= this.state.rows; row++) {
            let children = [];
            for (let c = 1; c <= this.state.columns; c++) {
                children.push(<Cell cells={this.state.cells} x={c} y={row} index={idx++} alive={false} CreateCells={this.CreateCells} changeState={this.changeState}/>)
            }
            board.push(<tr>{children}</tr>)
        }
            return board;
    }

    handleSubmit (e) {
        e.preventDefault();
        this.setState({rows: parseInt(this.inputRows.value)}, function () {
            console.log(this.state.rows);
        });
        this.setState({columns: parseInt(this.inputColumns.value)}, function () {
            console.log(this.state.columns);
        });
        this.setState({ cells: [] });   
    }

    render() {
        return (
        <div>
            <table className="Board">
                {this.renderBoard()}
            </table>
            <form onSubmit={this.handleSubmit}>
                <label for="rows">Rows:</label>
                <input type="number" id="rows" ref={el => this.inputRows = el}/>
                <label for="columns">Columns</label>
                <input type="number" id="columns" ref={el => this.inputColumns = el}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
        );
    }
    }
export default Game;
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
        //this.renderCells = this.renderCells.bind(this);

        //let cells = this.state.cells;
    }

    componentWillMount() {
        this.CreateCells();         
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.rows !== prevState.rows || this.state.columns !== prevState.columns) {
            this.CreateCells(); 
        }
    }
    componentDidMount() {
        this.CreateCells(); 
    }

    CreateCells() {
        const newCells = []
        let idx=0;
        for (let y = 1; y <= this.state.rows; y++) {
            for (let x = 1; x <= this.state.columns; x++) {
                let alive = false
                newCells.push({x: x, y: y, alive, index: idx++})
            }
        } 
        this.setState({cells: newCells});
    }

    changeState(index, value) {
        let ind=index;
        let cells = update(this.state.cells, {[ind]: {alive: {$set: !value}}});
        this.setState({cells: cells}, () => {
            console.log(this.state.cells); // further value-
        });
    }

    // renderCells = ()  => {
        // let arr =[];
        // let rows = this.state.rows;
        // let c = this.state.cells;
        // for (let row = 1; row <= rows; row++) {
        //     c.map(cell => {
        //         if(cell.y === row){
        //             arr[row][cell.x].push(<Cell y={cell.y} x={cell.x} index={cell.index} alive={cell.alive} CreateCells={this.CreateCells} changeState={this.changeState}/>);
        //         };
        //         return arr;
        //     }
        //     )
        // }
        // console.log(arr);
        // return arr;
    //     let rowsArr = [];
    //     for (var i = 0; i < this.state.rows; i++) {
	// 		for (var j = 0; j < this.state.columns; j++) {
    //             let index = i + ' ' + j;
	// 			rowsArr.push(
	// 				<Cell
    //                     y={i}
	// 					x={j}
	// 					index={index}
	// 				/>
	// 			);
	// 		}
    //     }
    //     return rowsArr;
    // }

    // renderBoard = () => {
    //     let board = [];        
    //     let idx = 0;    
    //     for (let row = 1; row <= this.state.rows; row++) {
    //         let children = [];
    //         for (let c = 1; c <= this.state.columns; c++) {
    //             children.push(<Cell cells={this.state.cells} x={c} y={row} index={idx++} alive={false} CreateCells={this.CreateCells} changeState={this.changeState}/>)
    //         }
    //         board.push(<tr>{children}</tr>)
    //     }
    //         return board;
    // }

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
        const style = {
            display: 'grid',
            gridTemplateRows: `repeat(${this.state.rows}, 20px)`,
            gridTemplateColumns: `repeat(${this.state.columns}, 20px)`,
        }

        let rowsArr =[];
        this.state.cells.map(cell => {
            rowsArr.push(<Cell cells={this.state.cells} x={cell.x} y={cell.y} index={cell.index} alive={cell.alive} changeState={this.changeState}/>);

        })

        return (
        <div>
            <div className="Board" style={style}>
                {rowsArr}
            </div>
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
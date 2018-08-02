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
            initialCells: [],
        }
        this.CreateCells = this.CreateCells.bind(this);
        this.changeState = this.changeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkNeighbours = this.checkNeighbours.bind(this);
        
        //this.renderCells = this.renderCells.bind(this);

        //let cells = this.state.cells;
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
        this.setState({cells: newCells, initialCells: newCells});
    }

    startGame = () => {
        setTimeout(() => {
            this.checkNeighbours();
        }, 500);
    }

    stopGame = () => {
        clearTimeout(this.startGame());
        this.setState({cells: this.state.initialCells});
    }

    
    checkNeighbours = () => {
        // let neighbours = [];        
        this.state.cells.map(cell => {
            // if(cell.x === 1 && cell.y === 1) {
            //     neighbours = [
            //         {x: cell.x+1, y: cell.y},
            //         {x: cell.x+1, y: cell.y+1},
            //         {x: cell.x, y: cell.y+1}
            //     ]
            // } else if(cell.x === this.state.columns.length && cell.y === 1) {
            //     neighbours = [
            //         {x: cell.x-1, y: cell.y},
            //         {x: cell.x-1, y: cell.y+1},
            //         {x: cell.x, y: cell.y+1}
            //     ]
            // } else if(cell.x === this.state.columns.length && cell.y === this.state.rows.length) {
            //     neighbours = [
            //         {x: cell.x, y: cell.y-1},
            //         {x: cell.x-1, y: cell.y-1},
            //         {x: cell.x-1, y: cell.y}
            //     ]
            // } else if(cell.x === 1 && cell.y === this.state.rows.length) {
            //     neighbours = [
            //         {x: cell.x, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y+1},
            //         {x: cell.x+1, y: cell.y}
            //     ]
            // } else if(cell.x===1) {
            //     neighbours = [
            //         {x: cell.x, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y},
            //         {x: cell.x+1, y: cell.y+1},
            //         {x: cell.x, y: cell.y+1}
            //     ]
            // } else if(cell.x===this.state.columns.length) {
            //     neighbours = [
            //         {x: cell.x, y: cell.y-1},
            //         {x: cell.x-1, y: cell.y-1},
            //         {x: cell.x-1, y: cell.y},
            //         {x: cell.x-1, y: cell.y+1},
            //         {x: cell.x, y: cell.y+1}
            //     ]
            // } else if(cell.y===1) {
            //     neighbours = [
            //         {x: cell.x-1, y: cell.y},
            //         {x: cell.x-1, y: cell.y+1},
            //         {x: cell.x, y: cell.y+1},
            //         {x: cell.x+1, y: cell.y+1},
            //         {x: cell.x+1, y: cell.y}
            //     ]
            // } else if(cell.y===this.state.rows.length) {
            //     neighbours = [
            //         {x: cell.x-1, y: cell.y},
            //         {x: cell.x-1, y: cell.y-1},
            //         {x: cell.x, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y}
            //     ]
            // } else {
            //     neighbours = [
            //         {x: cell.x, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y-1},
            //         {x: cell.x+1, y: cell.y},
            //         {x: cell.x+1, y: cell.y+1},
            //         {x: cell.x, y: cell.y+1},
            //         {x: cell.x-1, y: cell.y-1},
            //         {x: cell.x-1, y: cell.y},
            //         {x: cell.x+1, y: cell.y-1}
            //     ]
            // }

            let neighbours = [
                {x: cell.x, y: cell.y-1},
                {x: cell.x+1, y: cell.y-1},
                {x: cell.x+1, y: cell.y},
                {x: cell.x+1, y: cell.y+1},
                {x: cell.x, y: cell.y+1},
                {x: cell.x-1, y: cell.y+1},
                {x: cell.x-1, y: cell.y},
                {x: cell.x-1, y: cell.y-1}
            ];
            //find these neighbours in cells
            let targets = [];
            neighbours.map(n => {
                let target = this.state.cells.filter(el => {
                    return el.y===n.y && el.x===n.x
                });
                targets.push(target[0]);
            })
            let target = targets.filter(e => {return e});
            //check if they are alive
            let count=0;
            target.map(el => {
                if (el.alive) count++;
            })
            
            //change state of a cell
            if(cell.alive) {
                if (count === 3 || count === 2) {
                    let cells = update(this.state.cells, {[cell.index]: {alive: {$set: true}}});
                    this.setState({cells: cells}, () => {
                    });                    
                } else {
                    let cells = update(this.state.cells, {[cell.index]: {alive: {$set: false}}});
                    this.setState({cells: cells}, () => {
                    });
                }
            } else if (!cell.alive) {
                if(count===3) {
                    let cells = update(this.state.cells, {[cell.index]: {alive: {$set: true}}});
                    this.setState({cells: cells}, () => {
                    });
                }
            }    
        })
    }

    changeState(index, value) {
        let ind=index;
        let cells = update(this.state.cells, {[ind]: {alive: {$set: !value}}});
        this.setState({cells: cells}, () => {
            console.log('1');
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
            <button onClick={() => this.startGame()}>
                Start
            </button>
            <button onClick={() =>this.Pause()}>Pause</button>
            <button onClick={() =>this.Resume()}>Resume</button>
            <button onClick={() =>this.stopGame(this.checkNeighbours())}>Reset</button>
        </div>
        );
    }
    }
    
export default Game;
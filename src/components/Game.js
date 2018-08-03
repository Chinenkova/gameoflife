import React from 'react';
import './Game.css';
import Cell from './Cell';
import update from 'immutability-helper';



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: 16,
            rows: 16,
            cells: [],
            initialCells: []            
        }
        this.CreateCells = this.CreateCells.bind(this);
        this.changeState = this.changeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkNeighbours = this.checkNeighbours.bind(this);
        this.run = this.run.bind(this);
        this.pause = this.pause.bind(this);
        this.clear = this.clear.bind(this);

        this.interval = null; 
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.rows !== prevState.rows || this.state.columns !== prevState.columns) {
            this.CreateCells(); 
        }        
    }
    componentDidMount() {
        this.CreateCells();               
    }

    componentWillUnmount() {
        let intervalId = clearInterval(() => this.checkNeighbours());
        this.setState({ game: intervalId, cells: this.state.initialCells });
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
    
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
      }

    saveGame(cells) {
        this.setState({});   
        localStorage.setItem('cells', JSON.stringify(this.state.cells));
    }

    loadGame() {
        this.hydrateStateWithLocalStorage();
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

    run() {
        if (this.interval) {
          clearInterval(this.checkNeighbours)
        }    
        this.interval = setInterval(this.checkNeighbours, 500);
    }

    pause() {
        clearInterval(this.interval)
    }

    clear() {
        clearInterval(this.interval);
        this.setState({ cells: this.state.initialCells });        
    }
    
    checkNeighbours = () => {
        let currentGeneration = this.state.cells;      
        this.state.cells.map(cell => {          

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
            let targets = [];
            neighbours.map(n => {
                let target = currentGeneration.filter(el => {
                    return el.y===n.y && el.x===n.x
                });
                targets.push(target[0]);
                return targets;
            })

            let targetNeighbours = targets.filter(e => {return e});

            let count=0;
            targetNeighbours.map(el => {
                if (el.alive) {
                    count++;                
                }
                return count;
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
            return cell;    
        })
    }

    changeState(index, value) {
        let ind=index;
        let cells = update(this.state.cells, {[ind]: {alive: {$set: !value}}});
        this.setState({cells: cells}, () => {
            console.log('1');
        });
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
            <div className="wrap">
                <div className="Board" style={style}>
                    {rowsArr}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label for="rows">Rows:</label>
                    <input type="number" id="rows" ref={el => this.inputRows = el}/>
                    <label for="columns">Columns:</label>
                    <input type="number" id="columns" ref={el => this.inputColumns = el}/>
                    <input type="submit" value="Submit" className="submit"/>
                </form>
                <div className="buttons_group">
                    <button onClick={ this.run }>Start</button>
                    <button onClick={ this.pause }>Pause</button>
                    <button className="reset" onClick={ this.clear }>Reset</button>
                    <button onClick={this.saveGame.bind(this)}>Save</button>
                    <button onClick={ this.loadGame.bind(this) }>Load</button>
                </div>
            </div>
        );
    }
    }
    
    export default Game;

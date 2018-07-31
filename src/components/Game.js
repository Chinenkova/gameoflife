import React from 'react';
import './Game.css';
import Row from './Row';
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: 8,
            rows: 8,
            cells: [],
        }
        this.CreateCells = this.CreateCells.bind(this);
        this.RenderRows = this.RenderRows.bind(this);
    }

    componentWillMount() {
        this.CreateCells();
    }

    CreateCells() {
        for (let y = 1; y <= this.state.rows; y++) {
            for (let x = 1; x <= this.state.columns; x++) {
                this.setState(prevState => ({cells: [...prevState.cells, {x, y}]}));
            }
        }
    }

    RenderRows() {        
        for(let row=1; row<=this.state.rows; row++) {
            let rowCells = this.state.cells.filter(cell => cell.y === row)
            return (                
                <Row rowCells={rowCells} id={row}/>
            )
        }
    }


    render() {
        return (
        <div>
            <div className="Board">
                {this.RenderRows()}
            </div>
        </div>
        );
    }
    }
export default Game;
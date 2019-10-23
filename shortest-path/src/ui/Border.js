import React, { PureComponent } from 'react'
import { states, rows, columns } from './constants';
import GraphBuilder from "./GraphBuilder";
import Dijkstra from '../algorithms/Dijkstra';

export default class Border extends PureComponent  {

    constructor(props) {
        super(props);
        this.rows = rows;
        this.columns = columns;
        this.state = {

        }

        this.initBoard();
    }

    createArea(row, column) {
        return {
            row,
            column,
            state: states.UNDISCOVERED
        }
    }

    initBoard() {
        const board = [];

        for(let row = 0; row < this.rows; row++) {
            board[row] = [];
            for(let column = 0; column < this.columns; column++) 
                board[row][column] = this.createArea(row, column);
        }
        this.state.board = board;
    }

    createColumn(row) {
        const { board } = this.state;
        const columns = [];

        board[row].forEach(square => {
            columns.push(
                <td
                    key={`${row}_${square.column}`}
                    style={{
                        backgroundColor: 'rgb(230, 230, 230)',
                        border: '1px solid black'
                    }}
                    onClick={() => console.log(this.state.board[row][square.column])}
                >
                </td>
                )
        });

        return columns;
    }

    createRows() {
        const { board } = this.state;

        const grid = [];
        board.forEach( (row, i) => {
            grid[i] = 
                    <tr key={i}>
                        {this.createColumn(i)}
                    </tr>
        });
        return grid;
    }

    buildGraph() {
        const { board } = this.state;
        this.g = new GraphBuilder(board, rows, columns).build();
        const x = new Dijkstra(this.g);
        x.invoke(rows * columns);
        console.log(x);
    }

    render() {
        return <React.Fragment>
        <button onClick={() => this.buildGraph()}>Click click</button>
        <table
            style={{
               width: '100%',
                height: '500px'
            }}>
            <tbody>
                {this.createRows()}
            </tbody>
        </table>

        </React.Fragment>
        
        
    }
}

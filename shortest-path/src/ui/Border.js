import React, { PureComponent, Component } from 'react'
import { states, rows, columns, colors } from './constants';
import GraphBuilder from "./GraphBuilder";
import Dijkstra from '../algorithms/Dijkstra';
import { mapIndexToSquare } from '../algorithms/operations';
import AStar from '../algorithms/AStar';

export default class Border extends Component  {

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

    componentDidMount() {
        this.setStartAndEnd(403, 800);
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
                        backgroundColor: colors[square.state],
                        border: '1px solid black'
                    }}
                    onClick={() => console.log(this.state.board[row][square.column])}
                >
                </td>
                )
        });

        return columns;
    }

    async setVisited(index) {
        const { board } = this.state;
        const square = mapIndexToSquare(index, board, columns, rows);
        square.state = states.DISCOVERED;
        return new Promise(resolve =>
            setTimeout(() => {
                this.setState({ board }, () => {
                    resolve();
                })
            }, 5)
        );
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
        let x = new AStar(this.g, rows * columns, 403, 800, board, columns, rows);
        x.setBoard(this);

        x.invoke();
        x = null;
        this.g = null;
    }

    setStartAndEnd(s, e) {
        const { board } = this.state;
        const start = mapIndexToSquare(s, board, columns, rows);
        const end = mapIndexToSquare(e, board, columns, rows);


        start.state = states.START;
        end.state = states.END;
        this.setState({ board })
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

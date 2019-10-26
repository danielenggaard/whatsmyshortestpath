import React, { Component } from 'react'
import { states, rows, columns, colors, fields } from '../constants';
import GraphBuilder from "./GraphBuilder";
import { mapIndexToSquare } from '../algorithms/operations';
import AppBar from './AppBar';
import { instantiate } from '../algorithms/Factory';

export default class Border extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            delay: 5,    // Unit is in ms.
            algorithm: "AStar"
        }

        this.initBoard();
        this.onDelayChange = this.onDelayChange.bind(this);
        this.startAlgorithm = this.startAlgorithm.bind(this);
    }

    setAlgorithm = e => this.setState({ algorithm: e.target.value });

    createArea(row, column) {
        return {
            row,
            column,
            state: states.UNDISCOVERED
        }
    }

    componentDidMount() {
        this.setStartAndEnd(fields.start, fields.end);
    }

    initBoard() {
        const board = [];

        for(let row = 0; row < rows; row++) {
            board[row] = [];
            for(let column = 0; column < columns; column++) 
                board[row][column] = this.createArea(row, column);
        }
        this.state.board = board;
    }

    onDelayChange = delay => this.setState({ delay });

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

    async setVisited(index, state) {
        const { board, delay } = this.state;
        const square = mapIndexToSquare(index, board, columns, rows);
        square.state = state;
        return new Promise(resolve =>
            setTimeout(() => {
                this.setState({ board }, () => {
                    resolve();
                });
            }, delay)
        );
    }

    createRows() {
        const { board } = this.state;
        const grid = [];
        board.forEach( (row, i) => { grid[i] = 
            <tr key={i}>
                {this.createColumn(i)}
            </tr>
        });
        return grid;
    }

    startAlgorithm() {
        const { board, algorithm } = this.state;
        this.g = new GraphBuilder(board, rows, columns).build();
        let algo = instantiate(algorithm, this.g, rows * columns, fields.start, fields.end, board);
        algo.setBoard(this);
        algo.invoke();
        algo = null;
        this.g = null;
    }

    setStartAndEnd(s, e) {
        const { board } = this.state;

        const start = mapIndexToSquare(s, board, rows, columns);
        const end = mapIndexToSquare(e, board, rows, columns);

        start.state = states.START;
        end.state = states.END;
        this.setState({ board })
    }

    render() {
        const { delay, algorithm } = this.state;

        return <React.Fragment>
            <AppBar
                setAlgorithm={this.setAlgorithm}
                algorithm={algorithm}
                startAlgorithm={this.startAlgorithm}
                onDelayChange={this.onDelayChange}
                delay={delay}
            />
        
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

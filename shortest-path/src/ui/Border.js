import React, { Component } from 'react'
import { states, rows, columns, colors, styles, shortestPaths, heuristics } from '../constants';
import GraphBuilder from "./GraphBuilder";
import { mapIndexToSquare, mapSquareToIndex } from '../algorithms/operations';
import AppBar from './AppBar';
import { instantiate, algorithms, heuristic } from '../algorithms/Factory';
import './States.css';

export default class Border extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            board: [],
            delay: 1,    // Unit is in ms.
            algorithm: shortestPaths.ASTAR,
            squareClick: "start",
            start: 1,
            end: 10,
            heuristicName: heuristics.EUCLIDEAN,
            relaxedEdges: 0
        }
        this.algoIsOn = false;
        this.bindMethods();
    }

    setHeuristic = e => this.setState({ heuristicName: e.target.value })

    bindMethods() {
        this.onDelayChange = this.onDelayChange.bind(this);
        this.startAlgorithm = this.startAlgorithm.bind(this);
        this.setDestination = this.setDestination.bind(this);
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.initBoard = this.initBoard.bind(this);
        this.setHeuristic = this.setHeuristic.bind(this);
        this.incrementRelaxEdges = this.incrementRelaxEdges.bind(this);
        this.resetRelaxEdges = this.resetRelaxEdges.bind(this);
    }

    setAlgorithmsParams() {
        const { start, end, board, heuristicName } = this.state;
        algorithms[shortestPaths.DIJKSTRA].args = [this.g, rows * columns, start, end, board];
        algorithms[shortestPaths.ASTAR].args = [this.g, rows * columns, start, end, board, heuristic[heuristicName]];
    }

    setDestination = e => this.setState({ squareClick: e.target.value });

    setAlgorithm = e => this.setState({ algorithm: e.target.value });

    handleSquareClick = (e, square) => {
        switch(this.state.squareClick) {
            case "start":
                this.setStart(mapSquareToIndex(square))
            break;
            case "end":
                this.setEnd(mapSquareToIndex(square))
            break;
        }
    }

    createArea(row, column) {
        return {
            row,
            column,
            state: states.UNDISCOVERED
        }
    }

    componentDidMount() {
        this.initBoard();
        this.setStart(5);
        this.setEnd(100);
    }

    initBoard() {
        let { start, end, board } = this.state;
        this.resetRelaxEdges();

        for(let row = 0; row < rows; row++) {
            board[row] = [];
            for(let column = 0; column < columns; column++) 
                board[row][column] = this.createArea(row, column);
        }

        if (!start) start = 0;
        if(!end) end = 1;
        this.setStart(start);
        this.setEnd(end);
        this.setState({ board });
    }

    onAlgoIsOn = e => this.algoIsOn = e.target.value;

    onDelayChange = delay => this.setState({ delay });

    createColumn(row) {
        const { board } = this.state;
        const columns = [];

        board[row].forEach(square => {

            columns.push(
                <td
                    key={`${row}_${square.column}`}
                    className={styles[square.state]}
                    style={{
                        backgroundColor: colors[square.state],
                    }}
                    onClick={e => this.handleSquareClick(e, square)}
                >
                </td>
                )
        });

        return columns;
    }

    async setVisited(index, state) {
        if (!this.algoIsOn) return;
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

    createAlgorithm = () => {
        this.setAlgorithmsParams();
        this.algo = instantiate(this.state.algorithm);
        this.algo.setBoard(this);
    }

    incrementRelaxEdges = () => this.setState({ relaxedEdges: this.state.relaxedEdges + 1 });

    resetRelaxEdges = () => this.setState({ relaxedEdges: 0 });

    startAlgorithm() {
        const { board, start, end } = this.state;
        if (!start || !end || start === end) return;
        this.initBoard();
        this.algoIsOn = true;
        this.g = new GraphBuilder(board, rows, columns).build();
        this.createAlgorithm();
        this.algo.invoke();
        this.algo = null;
        this.g = null;
    }

    setStart(s) {
        const { board, start } = this.state;
        const newStart = mapIndexToSquare(s, board);
        if(typeof start === "number") mapIndexToSquare(start, board).state = states.UNDISCOVERED;
        newStart.state = states.START;
        this.setState({ board, start: s });
    }

    setEnd(e) {
        const { board, end } = this.state;
        const newEnd = mapIndexToSquare(e, board);
        if (typeof end === "number") mapIndexToSquare(end, board).state = states.UNDISCOVERED;
        newEnd.state = states.END;
        this.setState({ board, end: e });
    }

    render() {
        const { delay, algorithm, heuristicName, relaxedEdges } = this.state;
        return <React.Fragment>
            <AppBar
                setAlgorithm={this.setAlgorithm}
                algorithm={algorithm}
                startAlgorithm={this.startAlgorithm}
                onDelayChange={this.onDelayChange}
                delay={delay}
                setDestination={this.setDestination}
                destination={this.state.squareClick}
                clearBoard={this.initBoard}
                onAlgoIsOn={this.onAlgoIsOn}
                setHeuristic={this.setHeuristic}
                heuristicName={heuristicName}
                relaxedEdges={relaxedEdges}
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

import React, { Component } from 'react'
import { states, rows, columns, colors, styles, shortestPaths, heuristics, options } from '../constants';
import GraphBuilder from "./GraphBuilder";
import { mapIndexToSquare, mapSquareToIndex } from '../algorithms/operations';
import AppBar from './AppBar';
import { instantiate, algorithms, heuristic } from '../algorithms/Factory';

export default class Border extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            board: [],
            delay: 1,    // Unit is in ms.
            algorithm: shortestPaths.ASTAR,
            option: options.SET_START,
            start: 1,
            end: 2,
            heuristicName: heuristics.MANHATTAN,
            relaxedEdges: 0
        }
        this.algoIsOn = false;
        this.bindMethods();
    }

    setHeuristic = e => this.setState({ heuristicName: e.target.value })

    bindMethods() {
        this.onDelayChange = this.onDelayChange.bind(this);
        this.startAlgorithm = this.startAlgorithm.bind(this);
        this.setOption = this.setOption.bind(this);
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

    setOption = e => this.setState({ option: e.target.value }); 

    setAlgorithm = e => this.setState({ algorithm: e.target.value });

    setAlgoIsOn = isOn => {
        const { board } = this.state;
        this.algoIsOn = isOn;
        this.setState({ board });
    }

    handleSquareClick = (e, square) => {
        switch(this.state.option) {
            case options.SET_START:
                this.setStart(mapSquareToIndex(square))
                break;
            case options.SET_END:
                this.setEnd(mapSquareToIndex(square))
                break;
            case options.SET_WALL:
                this.onSetWall(square);
                break;
            case options.SET_UNDISCOVERED:
                this.onSetUndiscovered(square);
                break;

        }
    }

    handleSquareHover = (e, square) => {
        if (e.buttons !== 1) return;
        switch(this.state.option) {
            case options.SET_WALL:
                this.onSetWall(square);
                break;
            case options.SET_UNDISCOVERED:
                this.onSetUndiscovered(square);
                break;
        }
    }

    onSetUndiscovered = square => {
        const { option, board } = this.state;
        if (this.algoIsOn || option !== options.SET_UNDISCOVERED || 
            square.state === states.START || square.state === states.END) return;
        square.state = states.UNDISCOVERED;
        this.setState({ board });
    }

    onSetWall = square => {
        const { option, board } = this.state;
        if (this.algoIsOn || option !== options.SET_WALL ||
            square.state === states.START || square.state === states.END) return;
        square.state = states.WALL;
        this.setState({ board });
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

    onAlgoIsOn = isOn => this.algoIsOn = isOn;

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
                    onMouseOver={e => this.handleSquareHover(e, square)}
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

    clearSquare(square) {
        if (square.state === states.DISCOVERED ||square.state === states.PATH)
            square.state = states.UNDISCOVERED;
    }
    
    clearBoard() {
        const { board } = this.state;
        board.forEach(row => {
            row.forEach(column => {
                this.clearSquare(column);
            })
        });
        this.setState({ board });
    }
    
    incrementRelaxEdges = () => this.setState({ relaxedEdges: this.state.relaxedEdges + 1 });

    resetRelaxEdges = () => this.setState({ relaxedEdges: 0 });

    startAlgorithm() {
        const { board, start, end } = this.state;
        if (!start || !end || start === end) return;
        this.clearBoard();
        this.algoIsOn = true;
        this.g = this.graphBuilder = new GraphBuilder(board, rows, columns).build();
        this.createAlgorithm();
        this.algo.invoke();
        this.algo = null;
        this.g = null;
    }

    validatePositionSet(position) {
        const square = mapIndexToSquare(position, this.state.board)
        if (square.state === states.START || square.state === states.END) return false;
        return true;
    }

    setStart(s) {
        const { board, start } = this.state;
        if (!this.validatePositionSet(s)) return;
        const newStart = mapIndexToSquare(s, board);
        if(typeof start === "number") mapIndexToSquare(start, board).state = states.UNDISCOVERED;
        newStart.state = states.START;
        this.setState({ board, start: s });
    }

    setEnd(e) {
        const { board, end } = this.state;
        if(!this.validatePositionSet(e)) return;
        const newEnd = mapIndexToSquare(e, board);
        if (typeof end === "number") mapIndexToSquare(end, board).state = states.UNDISCOVERED;
        newEnd.state = states.END;
        this.setState({ board, end: e });
    }

    render() {
        const { delay, algorithm, heuristicName, relaxedEdges, option } = this.state;
        return <React.Fragment>
            <AppBar
                setAlgorithm={this.setAlgorithm}
                algorithm={algorithm}
                startAlgorithm={this.startAlgorithm}
                onDelayChange={this.onDelayChange}
                delay={delay}
                setOption={this.setOption}
                option={option}
                clearBoard={this.initBoard}
                onAlgoIsOn={this.onAlgoIsOn}
                setHeuristic={this.setHeuristic}
                heuristicName={heuristicName}
                relaxedEdges={relaxedEdges}
                algoIsOn={this.algoIsOn}
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

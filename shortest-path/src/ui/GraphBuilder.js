import DirectedEdge from '../datastructures/DirectedEdge';
import { eucledian, mapSquareToIndex } from "../algorithms/operations";
import Digraph from '../datastructures/Digraph';
import { states } from '../constants';


export default class GraphBuilder {

    constructor(board, rows, columns) {
        this.board = board;
        this.rows = rows;
        this.columns = columns;
    }

    build() {
        this.g = new Digraph(this.rows * this.columns);
        const { board } = this;

        board.forEach((row ,i) =>
            board[i].forEach(square => this.buildSquarqNeighbours(square))
        );
        return this.g;
    }

    validSquare(row, column) {
        if (this.squareOutOfRange(row, column) || !this.squareCanBeReached(row, column)) return false;
        return true;
    }

    squareCanBeReached = (row, column) => this.board[row][column].state !== states.WALL;
    

    squareOutOfRange = (row, column) => row < 0 || row >= this.rows || column < 0 || column >= this.columns

    addEdge(from, to) {

        const weight = eucledian(from, to);
        const edge = new DirectedEdge(mapSquareToIndex(from, this.columns), 
                                      mapSquareToIndex(to, this.columns), 
                                      weight);
        this.g.addEdge(edge);
    }

    buildSquarqNeighbours(square) {
        const { board } = this;

        if (this.validSquare(square.row + 1, square.column))
            this.addEdge(square, board[square.row + 1][square.column]);

        if (this.validSquare(square.row - 1, square.column)) 
            this.addEdge(square, board[square.row - 1][square.column]);
        
        if (this.validSquare(square.row, square.column + 1))
            this.addEdge(square, board[square.row][square.column + 1]);
        
        if (this.validSquare(square.row, square.column - 1))
            this.addEdge(square, board[square.row][square.column - 1]);

    }

}


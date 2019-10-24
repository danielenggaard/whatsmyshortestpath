import IndexMinPQ from "./IndexMinPQ";
export const mapIndexToSquare = (index, board, columns, rows) => board[index % rows][ Math.floor(index / columns)];


export default class AStarIndexMinPQ extends IndexMinPQ {

    constructor(n, heuristic, end, board, columns, rows) {
        super(n);
        this.heuristic = heuristic;
        this.end = end;
        this.board = board;
        this.columns = columns;
        this.rows = rows;
    }

    greater = (a, b) => {
        const flooredA = Math.floor(a);
        const flooredB = Math.floor(b)
        const { end, board, columns, rows } = this;

        return ( this.heuristic(this.pq[flooredA], end, board, columns, rows) + this.keys[this.pq[flooredA]] ) > 
                ( this.heuristic(this.pq[flooredB], end, board, columns, rows) + this.keys[this.pq[flooredB]] );
    }

}
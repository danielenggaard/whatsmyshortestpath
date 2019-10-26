import IndexMinPQ from "./IndexMinPQ";

export default class AStarIndexMinPQ extends IndexMinPQ {

    constructor(n, heuristic, end, board) {
        super(n);
        this.heuristic = heuristic;
        this.end = end;
        this.board = board;
    }

    greater = (a, b) => {
        const { end, board, heuristic, pq, keys } = this;
        return ( heuristic(pq[Math.floor(a)], end, board) + keys[pq[Math.floor(a)]] ) > 
                 ( heuristic(pq[Math.floor(b)], end, board) + keys[pq[Math.floor(b)]] );
    }

}
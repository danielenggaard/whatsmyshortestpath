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
        const pqA = pq[Math.floor(a)];
        const pqB = pq[Math.floor(b)];
        return ( keys[pqA] + heuristic(pqA, end, board) ) > 
                ( keys[pqB] + heuristic(pqB, end, board) );
    }

}
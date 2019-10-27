import Dijkstra from "./Dijkstra";
import AStarIndexMinPQ from "../datastructures/AStarIndexMinPQ"

export default class AStar extends Dijkstra {
    
    constructor(graph, n, start, end, board, heuristic) {
        super(graph, n, start, end, board);
        this.pq = new AStarIndexMinPQ(n, heuristic, end, board);
    }
}
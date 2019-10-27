import Dijkstra from "./Dijkstra";
import AStarIndexMinPQ from "../datastructures/AStarIndexMinPQ"
import { manhattenHeuristic, eucledianHeuristic } from "./operations.js";

export default class AStar extends Dijkstra {
    
    constructor(graph, n, start, end, board) {
        super(graph, n, start, end);
        this.pq = new AStarIndexMinPQ(n, eucledianHeuristic, end, board);
    }
}
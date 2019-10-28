import AStar from './AStar';
import Dijkstra from './Dijkstra';
import { shortestPaths, heuristics } from '../constants';
import  { eucledianHeuristic, manhattenHeuristic } from "./operations"

// this.g, rows * columns, fields.start, fields.end, board
export const algorithms = {
    [shortestPaths.ASTAR]: { class: AStar, args: [] },
    [shortestPaths.DIJKSTRA]: { class: Dijkstra, args: [] }
}

export const heuristic = {
    [heuristics.EUCLIDEAN]: eucledianHeuristic,
    [heuristics.MANHATTAN]: manhattenHeuristic
}

export const instantiate = className => 
    new algorithms[className].class(...algorithms[className].args);


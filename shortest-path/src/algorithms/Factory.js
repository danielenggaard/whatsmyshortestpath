import AStar from './AStar';
import Dijkstra from './Dijkstra';
import { rows, columns } from '../constants';

// this.g, rows * columns, fields.start, fields.end, board
export const algorithms = {
    'AStar': { class: AStar, args: [] },
    'Dijkstra': { class: Dijkstra, args: [] }
}

export const instantiate = (className, ...args) => new algorithms[className].class(...args);


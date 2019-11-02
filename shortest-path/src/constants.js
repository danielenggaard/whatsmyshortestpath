const states = {
    UNDISCOVERED: 1,
    DISCOVERED: 2,
    START: 3,
    END: 4,
    PATH: 5,
    WALL: 6
}

const colors = {
    [states.UNDISCOVERED] : 'rgb(230, 230, 230)',
    [states.DISCOVERED] : 'rgb(100, 100, 100)',
    [states.START] : 'rgb(0, 255, 0)',
    [states.END] : 'rgb(255, 0, 0)',
    [states.PATH] : 'rgb(0, 0, 255)',
    [states.WALL] : 'rgb(0, 0, 0)'
}

const styles = {
    [states.UNDISCOVERED] : 'undiscovered',
    [states.DISCOVERED] : 'discovered',
    [states.START] : 'start',
    [states.END] : 'end',
    [states.PATH] : 'path',
    [states.WALL] : 'wall'
}

const shortestPaths = {
    DIJKSTRA: 1,
    ASTAR: 2,
    DFS: 3  // Will implement later
}

// Has to be strings in order to make the radigroup to work properly
const options = {
    SET_START : '1',
    SET_END : '2',
    SET_WALL : '3'
}

const heuristics = {
    EUCLIDEAN: 1,
    MANHATTAN: 2
}


const rows = 30;
const columns = 30;

export { states, rows, columns, colors, styles, shortestPaths, heuristics, options }


export const eucledian = (from, to) => 
    Math.sqrt( Math.pow((from.row - to.row), 2) + Math.pow((from.column - to.column), 2));

export const manhatten = (from, to) =>
    Math.abs(from.row - to.row) + Math.abs(from.column + to.column);

export const manhattenHeuristic = (fromIndex, toIndex, board, columns, rows) =>
    manhatten(
        mapIndexToSquare(fromIndex, board, columns, rows), 
        mapIndexToSquare(toIndex, board, columns, rows)
    );

export const mapSquaresToIndex = (square, columns) => square.column * columns + square.row;

export const mapIndexToSquare = (index, board, columns, rows) => board[index % rows][ Math.floor(index / columns)];

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));




import { columns, rows } from "../constants";

export const eucledian = (from, to) => 
    Math.sqrt( Math.pow((to.row - from.row), 2) + Math.pow((to.column - from.column), 2) );

export const manhatten = (from, to) =>
    Math.abs(to.row - from.row) + Math.abs(to.column - from.column);

export const manhattenHeuristic = (fromIndex, toIndex, board) => 
    manhatten(
        mapIndexToSquare(fromIndex, board), 
        mapIndexToSquare(toIndex, board)
    );

export const eucledianHeuristic = (fromIndex, toIndex, board) => 
    eucledian(
        mapIndexToSquare(fromIndex, board), 
        mapIndexToSquare(toIndex, board)
    );

export const mapSquareToIndex = square => square.column * columns + square.row;

export const mapIndexToSquare = (index, board) => board[index % rows][Math.floor(index / columns)];



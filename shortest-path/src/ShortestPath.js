import "./algorithms/Dijkstra";
import Dijkstra from "./algorithms/Dijkstra";

const ALGORITHMS {
    'dijkstra' : { () => new Dijkstra() }
};

function shortestPath() {
    return new Dijkstra();
}


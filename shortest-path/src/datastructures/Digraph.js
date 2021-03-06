export default class Digraph {

    constructor(v) {
        this.v = v; // Number of vertices
        this.e = 0; // Number of edges
        this.adj = new Array(v);    // All the adjacent vertices to a given vertex
        for(let i = 0; i < v; i++) this.adj[i] = [];
    }

    v = () => this.v;
    e = () => this.e;

    addEdge(to) {
        this.adj[to.from].push(to);
        this.e ++;
    }

    edges() {
        const edges = [];
        for(let i = 0; i < this.v; i++)
            this.adj[i].forEach(e => edges.add(e));
        
        return edges;
    }
}
export class Digraph {

    constructor(v) {
        this.v = v;
        this.e = 0;
        this.adj = new Array(v);
        Object.seal(this.adj);
        for(i = 0; i < v; i++) this.adj[i] = [];
    }

    v = () => this.v;
    e = () => this.e;

    addEdge(v, w) {
        this.adj[v].add(w);
        this.e ++;
    }

    adj(v) {
        return this.adj[v];
    }
}
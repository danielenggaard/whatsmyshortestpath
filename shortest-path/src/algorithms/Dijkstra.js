import IndexMinPQ from '../datastructures/IndexMinPQ';

export default class Dijkstra {

    constructor(graph, n, start, end) {
        this.graph = graph;
        this.pq = new IndexMinPQ(n);
        this.distTo = new Array(n);
        this.edgeTo = new Array(n);
        this.start = start;
        this.end = end;
    }

    setBoard = board => this.board = board;

    async invoke() {


        this.setUp();
        while(!this.pq.isEmpty()) {
            const min = this.pq.delMin();
            if(min === this.end) break;
            
            await this.relax(min);
        }
    }

    setUp() {
        for(let v = 0; v < this.graph.v; v++)
            this.distTo[v] = Number.POSITIVE_INFINITY;
        this.distTo[this.start] = 0.0;
        this.pq.insert(this.start, 0.0);
    }

    async relax(v) {        
        const adj = this.graph.adj[v];
            for (let i = 0; i < adj.length; i++) 
                await this.updatedistance(adj[i]);

        return new Promise(resolve => resolve());
    }

    async updatedistance(e, weight) {
        const pq = this.pq;
        const distTo = this.distTo;
        const to = e.to;

        if(distTo[to] > distTo[e.from] + e.weight) {
        distTo[to] = this.distTo[e.from] + e.weight;
        this.edgeTo[to] = e;

        await this.board.setVisited(to);
        return new Promise(resolve => {
            if (pq.contains(to)) pq.change(to, distTo[to]);
            else                 pq.insert(to, distTo[to]);
            resolve();
        });
        
        }
    }

    pathTo(v) {
        if (!this.hasPathTo(v)) return null;
        const path = [];
        let edge = this.edgeTo[v];
        while(edge != null) {
            path.push(edge);
            edge = this.edgeTo[edge.from];
        }
        return path;
    }

    hasPathTo = v => this.distTo[v] < Number.POSITIVE_INFINITY;
}

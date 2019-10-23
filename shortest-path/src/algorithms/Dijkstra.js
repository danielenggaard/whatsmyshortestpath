import { fields, set } from './fields';
import IndexMinPQ from '../datastructures/IndexMinPQ';

class Dijkstra {

    invoke(n) {
        set('pq', new IndexMinPQ(n));
        const [ end, pq ] = fields;

        this.setUp();

        while(!pq.isEmpty()) {
            const min = pq.delMin();
            if(min === end) break;
            this.relax(min)
        }
    }

    setUp() {
        for(v = 0; v < fields.graph.v(); v++)
            fields.distTo[v] = Number.POSITIVE_INFINITY;
        fields.distTo[fields.start] = 0.0;
        fields.pq.insert(s, 0.0);
    }

    relax(v) {
        const [ graph, distTo, edgeTo, pq ] = fields;

        graph.adj(v).foreach(neighbour => {
            let w = neighbour.to();

            if(distTo[w] > distTo[v] + neighbour.weight()) {
                distTo[w] = distTo[v] + neighbour.weight();
                edgeTo[w] = neighbour;
                if (pq.contains(neighbour)) pq.change(neighbour, distTo[neighbour]);
                else pq.insert(w, distTo[neighbour]);
            }
        });

    }
}

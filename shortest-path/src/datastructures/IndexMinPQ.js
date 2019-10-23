export class IndexMinPQ {

    constructor(n) {
        this.n = 0;
        this.keys = new Array(n + 1);
        Object.seal(this.keys);
        this.q = new Array(n + 1);
        Object.seal(this.q);
        this.qp = new Array(n + 1);
        Object.seal(this.qp);
        for(i = 0; i <= n; i++) qp[i] = -1;
    }

    isEmpty = () => this.n === 0;

    contains = k => this.qp[k] != -1;

    insert(k, key) {
        this.n ++;
        this.qp[k] = this.n;
        this.pq[this.n]  = k;
        this.keys[k] = key;
        this.swim(this.n);
    }

    min = () => this.keys[this.pq[1]];

    delMin() {
        const indexOfMin = this.pq[1];
        this.exch(1, this.n --);
        this.sink(1);
        this.keys[this.qp[this.n + 1]] = null;
        this.qp[this.pq[this.n + 1]] = -1;
        return indexOfMin;
    }

    minIndex = () => this.pq[1];

    change(k, v) {
        this.keys[k] = v;
        this.swim(qp[k]);
        this.sink(qp[k]);
    }

    delete(k) {
        this.exch(k, this.n --);
        this.swim(qp[k]);
        this.sink(qp[k]);
        this.keys[this.qp[this.n + 1]] = null;
        this.qp[this.pq[this.n + 1]] = -1;
    }

    swim(k) {
        while (k > 1 && this.less(k / 2, k)) {
            this.exch(k / 2, k);
            k = k / 2;
        }
    }

    sink(k) {
        while(2* k <= this.n) {
            let j = 2*k;
            if (j < this.n && this.less(j, j + 1)) j++;
            if (!this.less(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }

    less = (i, j) => this.pq[i] < this.pq[j];

    exch(i, j) {
        const t = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = t;
    }

}
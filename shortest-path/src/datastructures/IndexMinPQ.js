export default class IndexMinPQ {

    constructor(n) {
        this.maxN = n;
        this.n = 0; // Number of elements in the data structure

        this.keys = new Array(n + 1);
        this.pq = new Array(n + 1);
        this.qp = new Array(n + 1);
        for(let i = 0; i < this.qp.length; i++) this.qp[i] = -1;
    }

    isEmpty = () => this.n === 0;

    contains = index => this.qp[index] !== -1;


    insert(i, key) {
        if (i < 0 || i >= this.maxN) throw Error("Illegal insert for i in priority queue.");
        if (this.contains(i)) throw Error(`Index ${i} is already in the priority queue.`);
        this.n ++;
        this.qp[i] = this.n;
        this.pq[this.n]  = i;
        this.keys[i] = key;
        this.swim(this.n);
    }

    delMin() {
        if (this.n === 0) throw Error("Priority queue underflox.");
        const indexOfMin = this.pq[1];
        this.exch(1, this.n--);
        this.sink(1);
        if (indexOfMin !== this.pq[this.n + 1]) throw Error("Index of min is not equal to pq[n + 1]");
        this.qp[indexOfMin] = -1;
        this.keys[indexOfMin] = null;
        this.pq[this.n + 1] = -1;
        return indexOfMin;
    }

    change(k, v) {
        this.keys[k] = v;
        this.swim(this.qp[k]);
        this.sink(this.qp[k]);
    }

    swim(k) {
        k = Math.floor(k);
        while (k > 1 && this.greater(k / 2, k)) {
            this.exch(k, k / 2);
            k = Math.floor(k / 2);
        }
    }

    sink(k) {
        k = Math.floor(k);
        while(2 * k <= this.n) {
            let j = 2 * k;
            if (j < this.n && this.greater(j, j + 1)) j++;
            if (!this.greater(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }

    greater = (a, b) => this.keys[this.pq[Math.floor(a)]] > this.keys[this.pq[Math.floor(b)]];

    exch(i, j) {
        i = Math.floor(i);
        j = Math.floor(j);
        const swap = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = swap;
        this.qp[this.pq[i]] = i;
        this.qp[this.pq[j]] = j;
    }

}

const fields = {
    graph: undefined,
    distTo: undefined,
    edgeTo: undefined,
    pq: undefined,
    start: undefined,
    end: undefined
}

const set = (k, v) => fields[k] = v;

export { fields, set };
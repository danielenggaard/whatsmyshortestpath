const states = {
    UNDISCOVERED: 1,
    DISCOVERED: 2,
    START: 3,
    END: 4,
    PATH: 5
}

const colors = {
    [states.UNDISCOVERED] : 'rgb(230, 230, 230)',
    [states.DISCOVERED] : 'rgb(100, 100, 100)',
    [states.START] : 'rgb(255, 0, 0)',
    [states.END] : 'rgb(0, 255, 0)',
    [states.PATH] : 'rgb(0, 0, 255)'
}

const fields = {
    start: 10,
    end: 800
}



const rows = 30;
const columns = 30;

export { states, rows, columns, colors, fields }

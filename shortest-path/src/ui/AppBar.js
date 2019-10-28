import React from 'react'
import { shortestPaths, heuristics }from '../constants';
import { MenuItem, Select, FormControl, InputLabel, Box, 
        Button, Typography, Slider, Radio, RadioGroup, FormLabel, 
        FormControlLabel } from "@material-ui/core";

export default function AppBar(props) {

    function renderHeuristics() {
        if (props.algorithm === shortestPaths.ASTAR) {
            return <Box mx={4}>
                        <FormControl>
                            <InputLabel>Heuristic</InputLabel>
                            <Select
                                value={props.heuristicName}
                                onChange={props.setHeuristic}
                            >
                                <MenuItem value={heuristics.EUCLIDEAN}>Euclidean Distance</MenuItem>
                                <MenuItem value={heuristics.MANHATTAN}>Manhattan Distance</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
        }
    }

    return <React.Fragment>
        
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            my={4}
        >
            {renderHeuristics()}
            <Box mx={4}>
                <FormControl>
                    <InputLabel>Algorithm</InputLabel>
                    <Select
                        value={props.algorithm}
                        onChange={props.setAlgorithm}
                    >
                        <MenuItem value={shortestPaths.DIJKSTRA}>Dijkstra</MenuItem>
                        <MenuItem value={shortestPaths.ASTAR}>A*</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box mx={2}>
                <Typography>Relaxed edges: {props.relaxedEdges}</Typography>
            </Box>
            
            <Box
                display="flex"
                flexDirection="column"
                width="30%"
                mx={2}
            >
                <Typography variant="subtitle2"> Delay </Typography>
                <Slider
                    defaultValue={30}
                    aria-label="Speed in ms."
                    aria-labelledby="discrete-slider"
                    aria-valuetext="ms"
                    valueLabelDisplay="auto"
                    step={10}
                    min={1}
                    max={200}
                    defaultValue={props.delay}
                    onChange={(e, v) => props.onDelayChange(v)}
            />
            </Box>
            <Typography>
                {`${props.delay} ms.`}
            </Typography>
            <Box mx={2}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Set Position</FormLabel>
                        <RadioGroup row aria-label="position" name="position" value={props.destination} onChange={props.setDestination}>
                        <FormControlLabel value="start" control={<Radio />} label="Start" />
                        <FormControlLabel value="end" control={<Radio />} label="End" />
                        </RadioGroup>
                </FormControl>
            </Box>
            <Box mx={2}>
                <Button color="default" variant="outlined" onClick={props.clearBoard}>Clear</Button>
            </Box>
            <Box mx={2}>
                <Button color="primary" variant="contained" onClick={props.startAlgorithm}>Start</Button>
            </Box>
            <Box mx={2}>
                <Button color="secondary" variant="contained" value={false} onClick={props.onAlgoIsOn}>Stop</Button>
            </Box>
        </Box>
    </React.Fragment>
}

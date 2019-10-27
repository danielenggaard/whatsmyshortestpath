import React from 'react'
import { MenuItem, Select, FormControl, InputLabel, Box, 
        Button, Typography, Slider, Radio, RadioGroup, FormLabel, 
        FormControlLabel } from "@material-ui/core";

export default function AppBar(props) {


    return <React.Fragment>
        
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            my={4}
        >
            <Box mx={4}>
                <FormControl>
                    <InputLabel>Algorithm</InputLabel>
                    <Select
                        value={props.algorithm}
                        onChange={props.setAlgorithm}
                    >
                        <MenuItem value={"Dijkstra"}>Dijkstra</MenuItem>
                        <MenuItem value={"AStar"}>A*</MenuItem>
                    </Select>
                </FormControl>
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
                <Button color="secondary" variant="contained" onClick={props.clearBoard}>Clear</Button>
            </Box>
            <Box mx={2}>
                <Button color="primary" variant="contained" onClick={props.startAlgorithm}>Run</Button>
            </Box>
        </Box>
    </React.Fragment>
}

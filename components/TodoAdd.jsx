import { Button, Grid, TextField, Paper } from "@mui/material";
import React from "react";

export default function TodoAdd (props) {


    const { onCreate } = props;

    const [inputValue, setInputValue] = React.useState("");
    return (
        <Grid container>
                <Grid  md={11} item style={{ paddingRight: 16 }}>
                    <Paper>
                        <TextField
                                placeholder="Add Todo here"
                                value={inputValue}
                                onChange={v => setInputValue(v.target.value)}
                                onKeyUp={(event) => {
                                    if (event.key === "Enter") {
                                        onCreate(inputValue);
                                    }
                                }}
                                fullWidth                 
                            />
                    </Paper>
                </Grid>
                <Grid container md={1} item justifyContent="flex-end">
                    <Paper>
                        <Button
                                color="info"
                                variant="contained"
                                onClick={() => onCreate(inputValue)}
                                sx={{
                                    height: 55,
                                }}
                            >
                                Add
                            </Button>
                    </Paper>
                </Grid>
        </Grid>
    )

}
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import React from "react";

export default function TodoAdd (props) {


    const { onCreate } = props;

    const [inputValue, setInputValue] = React.useState("");
    return (
        <Grid  container justifyContent={"space-between"}>
                <Grid item flexGrow={10} style={{ paddingRight: 16 }}>
                    <Paper>
                        <TextField
                                placeholder="Add Todo here"
                                value={inputValue}
                                onChange={v => setInputValue(v.target.value)}
                                onKeyUp={(event) => {
                                    if (event.key === "Enter") {
                                        onCreate(inputValue);
                                        setInputValue("");
                                    }
                                }}
                                fullWidth                 
                            />
                    </Paper>
                </Grid>
                <Grid item  >
                    <Paper>
                        <Button
                                color="info"
                                variant="contained"
                                onClick={() => {onCreate(inputValue); setInputValue("");}}
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
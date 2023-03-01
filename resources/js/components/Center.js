import React from 'react';
import { Grid } from "@mui/material";

const Center = ({...props}) => {
    return (
        <Grid container justifyContent="center" style={{
            height: "100%",
            width: "100%"
        }}>
            <Grid container direction="column" justifyContent="center">
                <Grid container justifyContent="center">
                    {props.children}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Center;
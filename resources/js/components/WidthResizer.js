import React from 'react';
import { Grid } from '@mui/material';

const WidthResizer = ({large, xl, ...props}) => {
    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
        >
            <Grid item
                xl={xl ? 12 : large ? 9 : 7}
                lg={xl ? 12 : large ? 11 : 9}
                md={xl ? 12 : large ? 12 : 10}
                sm={xl ? 12 : large ? 12 : 11}
                xs={12}
            >
                {props.children}
            </Grid>
        </Grid>
    )
}

export default WidthResizer;
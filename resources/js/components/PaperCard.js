import { Box, Paper, Grid, Typography } from '@mui/material';
import React from 'react';

const PaperCard = ({title = null, subTitle = null, ...props}) => {

    return (
        <Box {...props}>
            <Paper sx={{
                p: 2.5,
                height: "100%",
                mb: 2
            }}>
                <Grid container columnSpacing={2} rowSpacing={3}>
                    <Grid item xs={6}>
                        {title && <Typography variant="h5">{title}</Typography>}
                        {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
                    </Grid>
                </Grid>
                {props.children}
            </Paper>
        </Box>
    )
}

export default PaperCard;
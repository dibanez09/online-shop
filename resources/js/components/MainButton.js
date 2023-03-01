import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const MainButton = ({disabled, loading = false, ...props}) => {
    return (
        <Button
            style={{textTransform: 'none'}}
            color="primary"
            disabled={disabled ? true : loading ? true:undefined}
            disableElevation 
            variant="contained" 
            {...props}
        >
            {loading ?
                <CircularProgress color='inherit' size={17} sx={{
                    mr: 1
                }}/>
            : null}

            {props.children}
        </Button>
    )
}

export default MainButton;
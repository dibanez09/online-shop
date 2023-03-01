import React from 'react';
import { CircularProgress } from "@mui/material";

import Center from "./Center";

const Loading = ({...props}) => {
    return (
        <Center>
            <CircularProgress color='primary' {...props} />
        </Center>
    )
}

export default Loading;
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
const MainDialog = ({
    open,
    onClose,
    title,
    children,
    closeButton,
    closeButtonText = 'close',
    doneButton,
    doneButtonText = 'done',
    onDoneButtonClick,
    disableBackdropClick,
    disableEscapeKeyDown,
    disableCloseIcon,
    arr,
    ...props
}) => {
    const handleClose = (event, reason) => {
        if (disableBackdropClick && reason === "backdropClick") {
          return false;
        }
    
        if (disableEscapeKeyDown && reason === "escapeKeyDown") {
          return false;
        }
    
        if (typeof onClose === "function") {
          onClose();
        }
      };
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} {...props}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} >{title}</Box>
                        <Box>
                            <IconButton disabled={disableCloseIcon} onClick={()=>onClose()}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {children ? children : null}
                </DialogContent>
                <DialogActions>
                {closeButton ? <Button onClick={()=>onClose()}>{closeButtonText}</Button> : null}
                {doneButton ? <Button onClick={()=>onDoneButtonClick(arr)}>{doneButtonText}</Button> : null}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default MainDialog;
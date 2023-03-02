import React from 'react';
import FormContext from './FormContext';
import { Typography, Box, Grid } from '@mui/material';
import MainButton from './MainButton';

const FormHandler = ({formik, plain = false, submitText = 'Submit', submittingText = 'Submitting', validatingText = 'Validating', ...props}) => {

    return (
        <FormContext.Provider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                {props.children}
            </form>

            {!plain ?
                <Grid container justifyContent="flex-end">
                    <MainButton 
                    
                        loading={formik.isSubmitting || formik.isValidating}
                        onClick={formik.handleSubmit}
                        sx={{
                            mt: 4,
                        }}
                        {...{
                            fullWidth: false
                        }}
                    >
                        {formik.isValidating ? 
                            validatingText
                        : formik.isSubmitting ? 
                            submittingText
                        : submitText}
                    </MainButton>
                </Grid>
            : null}
        </FormContext.Provider>
    )
}

export default FormHandler;
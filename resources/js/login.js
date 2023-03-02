import '../css/login.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Box, Typography, Tab } from '@mui/material';
import WidthResizer from './components/WidthResizer';
import PaperCard from './components/PaperCard';
import Client from './components/Client';
import FormHandler from './components/FormHandler';
import MainField from './components/MainField';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import MainDialog from './components/MainDialog';

function Body({message}) {
    const client = Client();
    const [open, setOpen] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: false,
        onSubmit: (val, { setSubmitting }) => {
            setInvalid(false);
            client.post(`/login/submit`, val)
                .then((res) =>{
                    res.data == 'success' ? window.location.href = '/' : setInvalid(true);
                }).catch((err) => {
                    console.log(err);
                }).then(() => {
                    setSubmitting(false);
                });
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email()
                .required('Field is required'),
            password: Yup.string()
                .required('Field is required'),
        })
    });

    const formikReg = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repassword: ''
        },
        validateOnChange: false,
        onSubmit: (val, { setSubmitting }) => {
            client.post(`/register`, val)
                .then((res) =>{
                    setOpen(true);
                }).catch((err) => {
                    console.log(err);
                }).then(() => {
                    setSubmitting(false);
                });
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Field is required'),
            email: Yup.string().email()
                .required('Field is required').test('Email Validation', 'Email already registered', (val) => {
                    return new Promise((resolve, reject) => {
                        client.get('/register/validate/email', {
                            params: {
                                val: val
                            }
                        }).then((res) => {
                            resolve(res.data);
                        });
                    });
                }),
            password: Yup.string()
                .required('Field is required'),
            repassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        })
    });

    const onSuccess = () =>{
        setOpen(false);
        location.reload();
    }
    return (
       <React.Fragment>
            <MainDialog title='Success' open={open} onClose={()=>onSuccess()}>
                account created successfully!
            </MainDialog>
            <Box sx={{paddingTop: 10}}>
                <WidthResizer>
                    <PaperCard>
                        <Grid container rowSpacing={3} columnSpacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography variant='h5'>Welcome to Lazhapee</Typography>
                                    <Typography variant='body1'>The best online shopping place</Typography>
                                </Box>
                            </Grid>   
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Login" value="1" />
                                            <Tab label="Register" value="2" />
                                        </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <FormHandler submitText='login' formik={formik}>
                                                {invalid && <Typography color='error' variant='body1'>Invalid email or password</Typography>}
                                                <MainField label='email' name='email' fullWidth/>
                                                <MainField type='password' label='password' name='password' fullWidth/>
                                            </FormHandler>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <FormHandler submitText='register' formik={formikReg}>
                                                <MainField label='name' name='name' fullWidth/>
                                                <MainField label='email' name='email' fullWidth/>
                                                <MainField type='password' label='password' name='password' fullWidth/>
                                                <MainField type='password' label='re-type password' name='repassword' fullWidth/>
                                            </FormHandler>
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </Grid>     
                        </Grid>
                    </PaperCard>
                </WidthResizer>
            </Box>
       </React.Fragment>
    );
}

export default Body;

if (document.getElementById('body')) {
    ReactDOM.render(<Body />, document.getElementById('body'));
}
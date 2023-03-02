import '../css/index.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Box, Typography } from '@mui/material';
import Navbar from './components/navigationbar/Navbar';
import WidthResizer from './components/WidthResizer';
import PaperCard from './components/PaperCard';
import Center from './components/Center';
import MainButton from './components/MainButton';
import pic from '../images/oversized-shirt-black.jpg';
import MainDialog from './components/MainDialog';
import Client from './components/Client';

function Body({message}) {
    const client = Client();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
    useEffect(()=>{
        message == '' ? setOpen(false) : setOpen(true);
    },[]);

    const Pay = ()=>{
        setLoading(true);
        client.post('/payment', {amount: 10})
            .then((res) =>{
                window.location.href = res.data;
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            }).then(() => {
        });
    }

    return (
       <React.Fragment>
            <MainDialog title='Status' open={open} onClose={()=>setOpen(false)}>
                {message}
            </MainDialog>
            <Navbar />
            <Box sx={{paddingTop: 10}}>
                <WidthResizer>
                    <PaperCard>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box
                                    component="img"
                                    sx={{
                                    maxHeight: { xs: 700, sm: 500, md: 700 },
                                    maxWidth: { xs: 300, sm: 200, md: 300 },
                                    }}
                                    alt="The house from the offer."
                                    src={pic}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='h5'>Oversized shirt</Typography>
                                <Box display='flex'>
                                    <Typography style={{color:"#9C9898"}} variant='body1'>Price:</Typography><Typography variant='body1'>$10</Typography>
                                </Box>
                                <Typography sx={{paddingTop: 2, paddingBottom: 2}} variant='body1'>Taking inspiration from the beauty of simplicity offering neutral colors and earthly tones. Designed to look modern, clean, and stylish. Wear it comfortably with a light and softer feel. Made with Premium Cotton.</Typography>
                                <MainButton sx={{width: '100%'}} loading={loading} onClick={()=>Pay()}>Pay with PayPal</MainButton>
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
    var message = document.getElementById('body').getAttribute('message');
    ReactDOM.render(<Body message={message}/>, document.getElementById('body'));
}
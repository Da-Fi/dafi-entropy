import React from 'react';
import clsx from 'clsx';
import {makeStyles,useTheme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {colors} from '../../theme/theme.jsx';
const useStyles=makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        minWidth: '0%',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0,1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        persistentBehavior: 'fit'
    },
    paper: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        background: '#363640',
        backgroundImage: 'linear-gradient(180deg,rgba(54,54,64,1) 0%,rgba(44,59,87,1) 25%,rgba(75,91,87,1) 50%,rgba(33,38,38,1) 100%)',
        border: '3px solid '+colors.dafiPrimaryhex,
        borderRadius: '0.625rem',
        placeContent: 'center',
        padding: theme.spacing(1),
        textAlign: 'center',

    },
}));


export default function Develop() {
    const classes=useStyles();
    const theme=useTheme();


    return (
        <div className={classes.root}>

            <Grid container spacing={2}>
                <Grid item xs={12} style={{background: colors.dafidark}}>
                    <Paper className={classes.paper} style={{alignContent: 'center'}}>
                        <Typography variant="body2" style={{fontFamily: '"RobotoC"',color: colors.dafiGreen,alignContent: 'center'}}>Welcome to Da-Fi DAO, the iterate fast next-gen DAO. This is the first DApp release for Da-Fi, its in a live-beta active dev stage, and it will be instrumental in driving Da-Fi DAO community interest, growth and objectives. Da-Fi is in the process of completing various grant appications through Polkadot & Moonbeam, the Web3 Foundation, the Fantom Foundation, and others. Foundational Da-Fi token (symbol DA-FI) governance details will be announced in greater detail very soon.  90% of total Da-Fi token supply is designated for the Da-Fi DAO community. These 45k DA-FI tokens are currently in a Gnosis MultiSig Safe and located using ENS name da-fi.eth. Da-Fi will be looking for creative devs very soon as well. Check out the preview of EntropyX - an enterprise level de-fi
                            data engine and grid UI that simply outperforms! EntropyX will be included in Da-Fi Entropy v2 and is built specifically for React, renders 3 million dynamic cells of data, is fully responsive, customizeable, virtualizeable, accessible on any device, and much more! ==================> </Typography>

                    </Paper>
                </Grid>




            </Grid>
        </div>






    );
}
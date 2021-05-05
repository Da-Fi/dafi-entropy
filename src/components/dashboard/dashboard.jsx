import React from 'react';
import clsx from 'clsx';
import {makeStyles,useTheme} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {mainListItems} from '../dashboard/dashLists';
import {colors} from '../../theme/theme';
import SUBHEADER_1 from '../dashboard/Subheader_1.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const drawerWidth=192;



const useStyles=makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer+1,
        transition: theme.transitions.create(['width','margin'],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width','margin'],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width',{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width',{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7)+1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)+1,
        },
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
    spacer: {
        width: '2em',
        flex: 1,
        justifyContent: 'flex-end'
    },
    paper: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        background: '#363640',
        backgroundImage: 'linear-gradient(180deg,rgba(54,54,64,1) 0%,rgba(44,59,87,1) 25%,rgba(75,91,87,1) 50%,rgba(33,38,38,1) 100%)',
        border: '2px solid '+colors.dafiPrimaryhex,
        borderRadius: '0.625rem',
        padding: '0.25rem',
    }
}));

export default function Dashboard() {
    const preventDefault=event => event.preventDefault();
    const [anchorEl,setAnchorEl]=React.useState(null);
    const classes=useStyles();
    const theme=useTheme();
    const [open,setOpen]=React.useState(false);
    const [width,setWidth]=React.useState(window.innerWidth);
    const [height,setHeight]=React.useState(window.innerHeight);

    const handleDrawerOpen=() => {
        setOpen(true);
    };

    const handleDrawerClose=() => {
        setOpen(false);
    };

    const handleClick=event => {
        setAnchorEl(event.currentTarget);
    };
    const updateWidthAndHeight=() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);

    };
    React.useEffect(() => {
        window.addEventListener("resize",updateWidthAndHeight);
        return () => window.removeEventListener("resize",updateWidthAndHeight);
    });


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                style={{background: colors.dafidentheader}}
                position="fixed"
                className={clsx(classes.appBar,{
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton,{
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>

                        <IconButton>
                            <img
                                alt=''
                                src={require('../../assets/dafi_crc_log_only.png')}
                                height={'32px'}>
                            </img>
                        </IconButton>

                    </div>
                    <Typography variant="h5" style={{fontFamily: '"RobotoC"'}} noWrap>
                        DA-FI DAO
          </Typography>

                    <div className={classes.spacer} />
                    <div>

                        <SUBHEADER_1 style={{flex: 1,justifyContent: 'flex-end'}} />

                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer,{
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction==='rtl'? <ChevronRightIcon />:<ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {mainListItems}
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="body1" style={{fontFamily: '"RobotoC"',color: colors.dafiPrimaryhex,alignItems: 'center'}}>Use side nav buttons to access Da-Fi Entropy v1 vaults, streams, swaps, and Cover insurance.
                            This the first and 'foundational' release of Da-Fi which will enable the formation of a community driven
                            iterate fast 'Kusama of DAO's' - Da-Fi DAO. 90% of total Da-Fi token supply is designated for the Da-Fi DAO community and currently in a Gnosis MultiSig Safe. Check out the preview of EntropyX - an enterprise level de-fi
                            data engine that simply outperforms comparable de-fi DApps! EntropyX will be included in Da-Fi Entropy v2 and is built specifically for React, renders 3 million dynamic cells of data, is fully responsive, customizeable, virtualizeable, accessible on any device, and much more! ==================> </Typography>
                            <div style={{alignItems: 'center',verticalAlign: 'middle'}}>

                                <IconButton href="/incubator" onClick={handleClick} style={{paddingTop: '32px',border: '1px solid '+colors.dafiheat,color: 'primary',borderRadius: '0.25rem',padding: '0.25rem',fontFamily: '"RobotoC"'}}>
                                    <Link to="/incubator">
                                        EntropyX
                            </Link>
                                </IconButton>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>

            </main>
        </div>
    );
}











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
const drawerWidth=160;




const useStyles=makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        minWidth: '0%',
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
        marginRight: 16,
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
        [theme.breakpoints.up("sm")]: {
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
        width: '5em',
        flex: 1,
        justifyContent: 'flex-end'
    },
    logo: {
        display: 'flex',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },
    },
    ex: {
        display: 'flex',
        [theme.breakpoints.down("sm")]: {
            borderRadius: '4.5rem',
        },
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
    paperx: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        placeContent: 'center',
        padding: theme.spacing(1),
        textAlign: 'center',


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

                        <IconButton className={classes.logo}>
                            <img
                                alt=''
                                src={require('../../assets/dafidao_crcl.png')}
                                height={'32px'}>
                            </img>
                        </IconButton>

                    </div>
                    <Typography className={classes.logo} variant={'h5'} style={{fontFamily: '"RobotoC"',fontWeight: '700'}} noWrap>
                        DA-FI DAO
          </Typography>

                    <div className={classes.spacer} style={{paddingLeft: '16px'}} >
                        <IconButton href="/incubator" onClick={handleClick} style={{
                            border: '2px solid '+colors.dafiPrimaryhex,backgroundColor: "#4d4855",backgroundImage: 'linear-gradient(147deg, #4d4855 0%, #000000 74%)',
                            borderRadius: '0.875rem',padding: '0.5rem',fontFamily: '"RobotoC"',fontSize: 'small',flex: 1,justifyContent: 'flex-end',

                        }}>
                            <Link to="/incubator" color='contrastText' >
                                EntropyX
                            </Link>
                        </IconButton>
                    </div>
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
                    <Grid item xs={12} style={{background: colors.dafidark}}>
                        <Paper className={classes.paper} style={{alignContent: 'center'}}>
                            <Typography variant="body2" style={{fontFamily: '"RobotoC"',color: colors.dafiGreen,alignContent: 'center'}}>Welcome to Da-Fi DAO, the successful modifier of the Cardano blockchain and next-gen DAO. This is the live beta of our v1 DApp. The v2 DApp, EntropyX,  
                             can be previewed by clicking the EntropyX button. The revamped data engine shown renders 3 million dynamic cells of virtualizeable data in seconds and is accessible on any device! v2 will also include Polygon contracts rather then the current Ethereum contracts. Learn more at https://da-fi.com </Typography>

                        </Paper>




                    </Grid>

                </Grid>

            </main>
        </div>
    );
}











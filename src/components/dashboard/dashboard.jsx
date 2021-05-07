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
                                src={require('../../assets/dafi_crc_log_only.png')}
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
                            <Typography variant="body2" style={{fontFamily: '"RobotoC"',color: colors.dafiGreen,alignContent: 'center'}}>Welcome to Da-Fi DAO, the iterate fast next-gen DAO. This is the first DApp release for Da-Fi, its in a live-beta active dev stage, and it will be instrumental in driving Da-Fi DAO community interest, growth and objectives. Da-Fi is in the process of completing various grant applications through Polkadot & Moonbeam, the Web3 Foundation, the Fantom Foundation, and others. Foundational Da-Fi token (symbol DA-FI) governance details will be announced in greater detail very soon.  90% of the 50,000 total Da-Fi token supply is designated for the Da-Fi DAO community and are currently in a Gnosis MultiSig Safe linked to ENS domain name 'da-fi.eth'. Da-Fi will be looking for creative devs very soon as well. Check out the preview of EntropyX - an enterprise level de-fi
                            data engine and grid UI that simply outperforms! EntropyX will be included in Da-Fi Entropy v2 and is built specifically for React, renders 3 million dynamic cells of data, is fully responsive, customizeable, virtualizeable, accessible on any device, and much more! ==================> </Typography>

                        </Paper>




                    </Grid>

                </Grid>

            </main>
        </div>
    );
}











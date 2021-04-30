import React from 'react';
import clsx from 'clsx';
import {makeStyles,useTheme} from '@material-ui/core/styles';
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

const drawerWidth=192;


const useStyles=makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '["setWidth"]'
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
}));

export default function Dashboard() {
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

            </main>
        </div>
    );
}











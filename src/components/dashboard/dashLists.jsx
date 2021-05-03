import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Typography} from '@material-ui/core';
import {colors} from '../../theme/theme.jsx';
import {
    Link
} from "react-router-dom";

import SvgIcon from '@material-ui/core/SvgIcon';


export const mainListItems=(
    <div>


        <ListItem button>
            <Link to="/dashboard">
                <ListItemIcon>
                    <SvgIcon viewBox="0 0 24 24"><path d="M2 5v14h6V5H2m7 0v5h6V5H9m7 0v9h6V5h-6m-7 6v8h6v-8H9m7 4v4h6v-4h-6z" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Dashboard</Typography>} />
        </ListItem>
        <ListItem button >
            <Link to="/entropy">
                <ListItemIcon>
                    <SvgIcon viewBox="0 0 24 24"><path d="M20 2c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-1v1h-4v-1H9v1H5v-1H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16m-3 10c0-1-.3-2-.8-2.8l1.5-1.5-1.4-1.4-1.5 1.5C14 7.3 13 7 12 7c-1 0-2 .3-2.8.8L7.8 6.3 6.3 7.8l1.5 1.5C7.3 10 7 11 7 12c0 1 .3 2 .8 2.8l-1.5 1.5 1.5 1.4 1.5-1.5c.7.5 1.7.8 2.7.8 1 0 2-.3 2.8-.8l1.5 1.5 1.4-1.4-1.5-1.5c.5-.8.8-1.8.8-2.8m-5-3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3m0 5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Entropy Arbs</Typography>} />
        </ListItem>
        <ListItem button >
            <Link to="/streamgen">
                <ListItemIcon>
                    <SvgIcon viewBox="0 0 24 24"><path d="M6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Streamgen</Typography>} />
        </ListItem>
        <ListItem button>
            <Link to="/zeroswap">
                <ListItemIcon>
                    <SvgIcon viewBox="0 0 24 24"><path d="M8 10v3h6v5H8v3l-6-5.5L8 10m14-1.5L16 3v3h-6v5h6v3l6-5.5z" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>ZeroSwap</Typography>} />
        </ListItem>
        <ListItem button>
            <Link to="/incubator">
                <ListItemIcon>
                    <SvgIcon viewBox="0 0 24 24"><path d="M15 14v-3h3V9l4 3.5-4 3.5v-2h-3m-1-6.3V9H2V7.7L8 4l6 3.7M7 10h2v5H7v-5m-4 0h2v5H3v-5m10 0v2.5l-2 1.8V10h2m-3.9 6l-.6.5 1.7 1.5H2v-2h7.1m7.9-1v3h-3v2l-4-3.5 4-3.5v2h3z" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>LendBlock</Typography>} />
        </ListItem>
        <ListItem button>
            <Link to="/cover">
                <ListItemIcon>
                    <SvgIcon viewBox="0 0 24 24"><path d="M11 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4m0 6.72V20H0v-2c0-2.21 3.13-4 7-4 1.5 0 2.87.27 4 .72M24 20H13V3h11v17m-8-8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0M22 7a2 2 0 01-2-2h-3c0 1.11-.89 2-2 2v9a2 2 0 012 2h3c0-1.1.9-2 2-2V7z" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Cover</Typography>} />
        </ListItem>
        <ListItem button>
            <Link to="/stats">
                <ListItemIcon>

                    <SvgIcon viewBox="0 0 24 24"><path d="M12 5.5A3.5 3.5 0 0115.5 9a3.5 3.5 0 01-3.5 3.5A3.5 3.5 0 018.5 9 3.5 3.5 0 0112 5.5M5 8c.56 0 1.08.15 1.53.42-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 01-3-3 3 3 0 013-3m14 0a3 3 0 013 3 3 3 0 01-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 001.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65 2.56.34 4.45 1.51 4.45 2.9V20z" fill={colors.dafiGreen} /></SvgIcon>
                </ListItemIcon>
            </Link>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Governance</Typography>} />

        </ListItem>
        <ListItem button>

            <ListItemIcon>
                <div onClick={() => window.open("https://github.com/da-fi","_blank")} >
                    <img alt="" src={require('../../assets/github.svg')} height='24px' />
                </div>
            </ListItemIcon>

            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Git Docs</Typography>} />
        </ListItem>


    </div>
);

export const secondaryListItems=(
    <div>
        <ListSubheader style={{fontFamily: '"RobotoC"'}} inset>Da-Fi DAO</ListSubheader>


        <ListItem button style={{color: 'white'}}>
            <ListItemIcon>
                <SvgIcon viewBox="0 0 24 24"><path d="M6.91 5.5l2.3 2.29-1.42 1.42-2.29-2.3-2.29 2.3-1.42-1.42 2.3-2.29-2.3-2.29 1.42-1.42 2.29 2.3 2.29-2.3 1.42 1.42m13 13l-1.42-1.42-2.29 2.3-2.29-2.3-1.42 1.42 2.3 2.29-2.3 2.29 1.42 1.42 2.29-2.3 2.29 2.3 1.42-1.42-2.3-2.29m.49-11.67L17.18 11 15.6 9.73l1.17-1.5a9.08 9.08 0 00-6.66 5.62A4.5 4.5 0 117.5 13a4 4 0 01.78.08 11.27 11.27 0 018.15-6.82L15 5.18l1.27-1.58M10 17.5A2.5 2.5 0 107.5 20a2.5 2.5 0 002.5-2.5z" /></SvgIcon>
            </ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant={'body1'} style={{fontFamily: '"RobotoC"',color: colors.dafiGreen}}>Community</Typography>} /> />
        </ListItem>
        <ListItem button>

            <ListItemIcon>
                <div onClick={() => window.open("https://github.com/da-fi","_blank")} >
                    <img alt="" src={require('../../assets/github.svg')} height='24px' />
                </div>
            </ListItemIcon>

            <ListItemText primary="Git Docs" style={{fontFamily: '"RobotoC"'}} />
        </ListItem>
    </div>
);


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbarstyle: {
        backgroundColor: '#020C4A',
        
        //backgroundColor: '#020A3E'
    },
    btnstyle: {
       // textTransform: 'none'
       backgroundColor: 'white',
       color: '#020C4A',
       '&:hover': {
        backgroundColor: 'white',
       color: '#020C4A'
       },
       marginRight: theme.spacing(3),
       maxHeight: 35
    },
    btnstyleprint: {
    backgroundColor: 'white',
       color: '#020C4A',
       '&:hover': {
        backgroundColor: 'white',
       color: '#020C4A'
       },
       maxHeight: 35
       //marginRight: theme.spacing(2)
    }
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appbarstyle}>
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        Climate Coils
                    </Typography>
                    <Button color="inherit" className={classes.btnstyle} onClick={props.opendialogclientinfo}>Client Info</Button>
                    <Button color="inherit" onClick={props.createPdf} className={classes.btnstyleprint}>PRINT</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

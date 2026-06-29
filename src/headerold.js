import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headerdiv: {
    //backgroundColor: '#C42200',
    backgroundColor: 'black',
    minHeight: 50,
    marginBottom: theme.spacing(-1)
  }

}));




function App(props) {
  const classes = useStyles();



  return (
    //   <div className={classes.headerdiv}>



    // </div>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>

  );
}


export default App;

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //     width: '25ch',
  //   },
  // },
  fieldgrids: {
    marginBottom: theme.spacing(2)
  },
  fieldgridsEnd: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(0)
  },
  compform: {
    marginTop: theme.spacing(9.5),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(10),
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  },
  headerdiv: {
      //backgroundColor: '#C42200',
      backgroundColor: '#020C4A',
      height: 'auto',
      minHeight: 30,
      marginTop: theme.spacing(-4.9)
  }

}));


  

function App(props) {
  const classes = useStyles();

  // getting values of 4 fields...


  return (
    <div className={classes.headerdiv}>



  </div>
    
  );
}


export default App;

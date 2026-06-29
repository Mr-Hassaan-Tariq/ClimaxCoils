import React, {useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  fieldgrids: {
    marginBottom: theme.spacing(2)
  },
  fieldgridsEnd: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(0)
  },
  compform: {
    marginTop: theme.spacing(5.8),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(10),
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  },
  defaultapp: {
    //border: '1px solid',
  },
  comptitle: {
    marginRight: theme.spacing(12),
    marginTop: theme.spacing(1.3),
    color: '#C42200'
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 200,
  },
}));


  

function App(props) {
  const classes = useStyles();

  // getting values of 4 fields...

  const [coillength,setCoillength] = useState(0); 
  const [coilheight,setCoilheight] = useState(0); 
  const [coildepth,setCoildepth] = useState(0); 
  const [finsperinch,setfinsperinch] = useState(0); 
  const [finsize, setfinsize] = useState(0.875);

  const updateCoillength = (lenParam) => {
    setCoillength(lenParam);
    props.updateCoillength(lenParam);
  };

  const updateCoilheight = (heightParam) => {
    setCoilheight(heightParam);
    props.updateCoilheight(heightParam);
  };

  const updateCoildepth = (depParam) => {
    setCoildepth(depParam);
    props.updateCoildepth(depParam);
  };

  const updateFinsperinch = (finParam) => {
    setfinsperinch(finParam);
    props.updatefinsperinch(finParam);
  }

  const handlefinchange = (event) => {
    setfinsize(event.target.value);
    props.updatefinsize(event.target.value);
  }

  return (
    <div className={classes.defaultapp}>

      <Grid container className={classes.compform}>
        {/* <h2 className={classes.comptitle}>Climate Coils</h2> */}
  
          <Grid container spacing={2}>

            <Grid item xs={6} lg={1} className={classes.fieldgrids} /> 

            <Grid item xs={6} lg={2} className={classes.fieldgrids} > 
              <TextField
                fullwidth
                required
                type="number"
                id="coillength"
                label="Coil Length"
                value={coillength}
                variant="outlined"
                placeholder="00"
                color="secondary"
                InputProps={{
                  endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                }}
                onChange={(event) => updateCoillength(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} lg={2} className={classes.fieldgrids} > 
              <TextField
                fullwidth
                required
                type="number"
                id="coilheight"
                label="Coil Height"
                value={coilheight}
                variant="outlined"
                placeholder="00"
                color="secondary"
                InputProps={{
                  endAdornment: <InputAdornment position="end">inch</InputAdornment>,
                }}
                onChange={(event) => updateCoilheight(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} lg={2} className={classes.fieldgrids} > 
              <TextField
                fullwidth
                required
                type="number"
                id="coildepth"
                label="Coil Rows"
                value={coildepth}
                variant="outlined"
                placeholder="00"
                color="secondary"
                InputProps={{
                  endAdornment: <InputAdornment position="end">R</InputAdornment>,
                }}
                onChange={(event) => updateCoildepth(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} lg={2} className={classes.fieldgridsEnd} > 
              <TextField
                fullwidth
                required
                type="number"
                id="finsperinch"
                label="Fins per Inch"
                value={finsperinch}
                variant="outlined"
                placeholder="00"
                className={classes.entryBtns}
                color="secondary"
                InputProps={{
                  endAdornment: <InputAdornment position="end">f/i</InputAdornment>,
                }}
                onChange={(event) => updateFinsperinch(event.target.value)}
              />
            </Grid>

            <Grid item xs={6} lg={2} className={classes.fieldgrids} > 
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} className={classes.childvaluedivCopper} > 
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Fin Size</InputLabel>
                    <Select
                      fullwidth
                      autoWidth={false}
                      color="secondary"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={finsize}
                      onChange={handlefinchange}  
                      label="Fin Size"
                    >
                      <MenuItem value={0.75}>0.75</MenuItem>
                      <MenuItem value={0.875}>0.875</MenuItem>
                      <MenuItem value={1.08}>1.08</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} lg={1} className={classes.fieldgrids} /> 

          </Grid>

      </Grid>

    </div>   
  );
}


export default App;

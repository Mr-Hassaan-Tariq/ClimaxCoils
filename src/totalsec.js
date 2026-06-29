import React, { useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  defaultapp: {
    //border: '1px solid',
    marginBottom: theme.spacing(2),
  },
  compform: {
    //backgroundColor: 'blue',
    //minHeight: 120
    maxHeight: 10,
    maxWidth: 1355
  },
  leftsecdiv: {
    //backgroundColor: 'green'
  },
  rightsecdiv: {
    //backgroundColor: 'purple'
  },
  costmaterialdiv: {
    //backgroundColor: 'orange',
    //maxHeight: 10
  },
  costtotaldiv: {
    //backgroundColor: 'red'
  },
  totalcosttxt: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
  },
  totalcosttxtMaterial: {
    marginTop: theme.spacing(1.6),
    marginLeft: theme.spacing(7)
  },
  totalcostValue: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(-1),
    color: 'green'
  },
  totalcostValueMaterial: {
    marginTop: theme.spacing(.9),
    marginLeft: theme.spacing(-1),
    color: 'green'
  },
  totalcostUnit: {
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(-1),
    color: 'green'
  },
  fieldfirst: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(-3),
    marginTop: theme.spacing(2)
  },
  fieldsecond: {
    marginLeft: theme.spacing(-7),
    marginTop: theme.spacing(2)
  }
}));




function App(props) {
  const classes = useStyles();

  const [overhead, setoverhead] = useState(0);
  const [profit, setprofit] = useState(0);

  const [totalcost, settotalcost] = useState(0);


  const getoverhead = (val) => {
    setoverhead(val);
    props.updateOverHead(val)
  }
  const getprofit = (val) => {
    setprofit(val);
    props.updateProfit(val)
  }


  const gettotalcost = () => {
    let tempmc = props.materialcost;
    if (tempmc == "") tempmc = 0.00;
    let varmaterialcost = parseFloat(tempmc);

    //overhead
    let temp = (overhead / 100) * varmaterialcost;
    if (temp == "") temp = 0.00;
    let varpercentageoverhead = parseFloat(temp);

    let overheadcost = varmaterialcost + varpercentageoverhead
    //profit
    let tempf = (profit / 100) * (overheadcost);
    if (tempf == "") tempf = 0.00;
    let varpercentageprofit = parseFloat(tempf);

    let varfinaltotalcost = Math.round(overheadcost + varpercentageprofit);
    //if (varfinaltotalcost = 'NaN') varfinaltotalcost=0;
    //console.log(varfinaltotalcost);
    //settotalcost(Number(varfinaltotalcost).toLocaleString()); 
    settotalcost(varfinaltotalcost);
    props.updateTotalCost(varfinaltotalcost)
  }

  useEffect(() => {
    gettotalcost();
  }, [overhead, profit, props.materialcost]);



  return (
    <div className={classes.defaultapp}>

      <Grid container className={classes.compform}>
        <Grid container spacing={2}>


          {/* input fields */}
          <Grid item xs={6} lg={6} className={classes.leftsecdiv}>
            <Grid container spacing={2}>


              <Grid item xs={6} lg={6} className={classes.fieldfirst} >
                <TextField
                  //fullwidth
                  type="number"
                  required
                  id="coillength"
                  label="Overhead"
                  value={overhead}
                  variant="outlined"
                  placeholder="00"
                  color="secondary"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  onChange={(event) => getoverhead(event.target.value)}
                />
              </Grid>
              <Grid item xs={6} lg={6} className={classes.fieldsecond} >
                <TextField
                  //fullwidth
                  type="number"
                  required
                  id="coilheight"
                  label="Profit"
                  value={profit}
                  variant="outlined"
                  placeholder="00"
                  color="secondary"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  onChange={(event) => getprofit(event.target.value)}
                />
              </Grid>

            </Grid>
          </Grid>



          {/* Cost */}
          <Grid item xs={6} lg={6} className={classes.rightsecdiv}>
            <Grid container spacing={2}>

              {/* <Grid item xs={6} lg={2} className={classes.costmaterialdiv}> 
                  </Grid> */}


              <Grid item xs={6} lg={6} className={classes.costmaterialdiv}>
                <Grid container spacing={2}>

                  <Grid item xs={6} lg={2}>

                  </Grid>

                  <Grid item xs={6} lg={7}>
                    <h3 className={classes.totalcosttxtMaterial}>Material Cost:</h3>
                  </Grid>

                  <Grid item xs={6} lg={3}>
                    <h2 className={classes.totalcostValueMaterial}>{Number(props.materialcost).toLocaleString()}</h2>
                    <h4 className={classes.totalcostUnit}>(PKR)</h4>
                  </Grid>

                </Grid>
              </Grid>



              <Grid item xs={6} lg={6} className={classes.costtotaldiv} >
                <Grid container spacing={2}>

                  <Grid item xs={6} lg={6}>
                    <h3 className={classes.totalcosttxtMaterial}>Total Cost:</h3>
                  </Grid>

                  <Grid item xs={6} lg={6}>
                    <h2 className={classes.totalcostValueMaterial}>{Number(totalcost).toLocaleString()}</h2>
                    <h4 className={classes.totalcostUnit}>(PKR)</h4>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}


export default App;

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Alert from '@material-ui/lab/Alert';
var isEmpty = require('is-empty');
// import generatePDF from "./generatePDF";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        //backgroundColor: 'black',
        display: 'flex',
        //height: 440,
        height: 350,
        border: '1.7px solid',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: 200
    },
    nicheDiv: {
        //backgroundColor: 'black',
    },
    nicheleftdiv: {
        //backgroundColor: 'yellow',
    },
    nicherightdiv: {
        //backgroundColor: 'orange',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    childtitlediv: {
        //backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        textAlign: 'end',
        minHeight: 50
    },
    childtitledivCost: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        textAlign: 'end',
        minHeight: 50,
        marginTop: theme.spacing(-17)
    },
    childvaluedivCost: {
        marginTop: theme.spacing(-17)
    },
    childvaluedivCopper: {
        //backgroundColor: 'blue',
        //flexWrap: 'nowrap',
        //minHeight: 200
    },
    txtclass: {
        color: 'black',
        flexWrap: 'nowrap',
        wordWrap: 'normal',
        width: '100%'
    },
    txtValue: {
        color: '#C42200',
        flexWrap: 'nowrap',
        wordWrap: 'normal'
    },
    priceTxt: {
        color: 'green',
        marginTop: theme.spacing(1.6),
        flexWrap: 'nowrap',
        wordWrap: 'normal'
    },
    priceTxtValue: {
        color: 'green',
        flexWrap: 'nowrap',
        wordWrap: 'normal',
        marginTop: theme.spacing(-2)
    },
    compform: {
        // display: 'flex',
        // justifyContent: 'flex-end',
        //backgroundColor: 'black',
        minWidth: 1100,
        //minHeight: 380
        minHeight: 300
    },
    schBtn: {
        color: 'white',
        backgroundColor: '#C42200',
        //minWidth: 100,
        marginTop: theme.spacing(1.5),
    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 200
    },
    cbstyling: {
        marginTop: theme.spacing(-1.3),
        marginLeft: theme.spacing(-1.4)
    }
}));

function VerticalTabs(props, ref) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [checkedchannel, setcheckedchannel] = React.useState(false);

    // aluminium inputs
    const [althickness, setalthickness] = useState(0);
    const [alprice, setalprice] = useState(0);
    // copper inputs
    const [guage, setguage] = useState(0.030);
    const [copperprice, setcopperprice] = useState(0);
    // gi sheets inputs
    const [gisheetthickness, setgisheetthickness] = useState(0);
    const [gisheetprice, setgisheetprice] = useState(0);
    // solders inputs
    const [soldersprice, setsoldersprice] = useState(0);
    // capillary tubes
    const [captubesquantity, setcaptubesquantity] = useState(0);
    const [captubesprice, setcaptubesprice] = useState(0);
    // distributer
    const [distrbquantity, setdistrbquantity] = useState(0);
    const [distrbsprice, setdistrbsprice] = useState(0);
    // header pipes
    const [headerpipesquantity, setheaderpipesquantity] = useState(0);
    const [headerpipesprice, setheaderpipesprice] = useState(0);


    // outputs (costs & weight)
    const [aluminiumweight, setaluminiumweight] = useState(0);
    const [altotalCost, setaltotalCost] = useState(0);
    const [copperweight, setcopperweight] = useState(0);
    const [coppertotalCost, setcoppertotalCost] = useState(0);
    const [gisheetweight, setgisheetweight] = useState(0);
    const [gisheettotalCost, setgisheettotalCost] = useState(0);
    const [soldersweight, setsoldersweight] = useState(0);
    const [solderstotalCost, setsolderstotalCost] = useState(0);
    const [captubestotalCost, setcaptubestotalCost] = useState(0);
    const [distrbtotalCost, setdistrbtotalCost] = useState(0);
    const [headerpipestotalCost, setheaderpipestotalCost] = useState(0);
    const [clientInformation, setClientInformation] = useState({})
    const [materialCost, setMaterialCost] = useState(0);

    // aluminium inputs
    const getalthickness = (vparam) => {
        setalthickness(vparam);
    }
    const getalprice = (vparam) => {
        setalprice(vparam);
        props.updateItemDetails("alprice", vparam)
    }
    // copper inputs
    const handleguagechange = (event) => {
        setguage(event.target.value);
    }
    const getcopperprice = (vparam) => {
        setcopperprice(vparam);
        props.updateItemDetails("copperprice", vparam)
    }
    // gi sheet inputs
    const getgisheetthickness = (vparam) => {
        setgisheetthickness(vparam);
    }
    const getgisheetprice = (vparam) => {
        setgisheetprice(vparam);
        props.updateItemDetails("gisheetprice", vparam)
    }
    // solders inputs
    const getsoldersprice = (vparam) => {
        setsoldersprice(vparam);
        props.updateItemDetails("soldersprice", vparam)
    }
    // capillary tubes
    const getcaptubesquantity = (vparam) => {
        setcaptubesquantity(vparam);
        props.updateItemDetails("captubesquantity", vparam)
    }
    const getcaptubesprice = (vparam) => {
        setcaptubesprice(vparam);
        props.updateItemDetails("captubesprice", vparam)
    }
    // distributer
    const getdistrbquantity = (vparam) => {
        setdistrbquantity(vparam);
        props.updateItemDetails("distrbquantity", vparam)
    }
    const getdistrbsprice = (vparam) => {
        setdistrbsprice(vparam);
        props.updateItemDetails("distrbsprice", vparam)
    }
    // header pipes
    const getheaderpipesquantity = (vparam) => {
        setheaderpipesquantity(vparam);
        props.updateItemDetails("headerpipesquantity", vparam)
    }
    const getheaderpipesprice = (vparam) => {
        setheaderpipesprice(vparam);
        props.updateItemDetails("headerpipesprice", vparam)
    }

    const generatePDF = () => {
        let itemPricingDetails = [
            { Name: "Aluminium", Quantity: `${aluminiumweight}`, Price: `${alprice}`, Cost: `${altotalCost}` },
            { Name: "Copper", Quantity: `${copperweight}`, Price: `${copperprice}`, Cost: `${coppertotalCost}` },
            { Name: "GI Sheet", Quantity: `${gisheetweight}`, Price: `${gisheetprice}`, Cost: `${gisheettotalCost}` },
            { Name: "Solders", Quantity: `${soldersweight}`, Price: `${soldersprice}`, Cost: `${solderstotalCost}` },
            { Name: "Capillary Tubes", Quantity: `${captubesquantity}`, Price: `${captubesprice}`, Cost: `${captubestotalCost}` },
            { Name: "Distributors", Quantity: `${distrbquantity}`, Price: `${distrbsprice}`, Cost: `${distrbtotalCost}` },
            { Name: "Headers Pipes", Quantity: `${headerpipesquantity}`, Price: `${headerpipesprice}`, Cost: `${headerpipestotalCost}` },
        ]

        let clientInformationDetails = [
            { Name: `${isEmpty(clientInformation.ClientName) ? "" : clientInformation.ClientName}`, PhoneNumber: `${isEmpty(clientInformation.PhoneNo) ? "" : clientInformation.PhoneNo}`, Address: `${isEmpty(clientInformation.Address) ? "" : clientInformation.Address}` }
        ]

        let coilDimensionDetails = [
            { CoilLenght: `${props.coilLength}`, CoilHeight: `${props.coilHeight}`, CoilDepth: `${props.coilDepth}`, FinsPerInch: `${props.finsPerInch}` }
        ]
        // initialize jsPDF
        let doc = new jsPDF();

        // define the columns we want and their titles
        let itemDetailsColumns = ["Item Name", "Quantity", "Price", "Cost"];
        let clientInformationColumns = ["Client Name", "Phone Number", "Address"];
        let coilDetailsColumns = ["Coil Lenght", "Coil Height", "Coil Rows", "Fins Per Inch"];

        let itemPricingDetailsTableRows = [];
        let clientInformationTableRows = [];
        let coilDimensionTableRows = []

        // for each ticket pass all its data into an array
        itemPricingDetails.forEach(ticket => {
            const individualItemDetail = [
                ticket.Name,
                ticket.Quantity,
                ticket.Price,
                ticket.Cost
            ];
            itemPricingDetailsTableRows.push(individualItemDetail);
        });

        clientInformationDetails.forEach(each => {
            const individualItemDetail = [
                each.Name,
                each.PhoneNumber,
                each.Address
            ];
            clientInformationTableRows.push(individualItemDetail);
        });

        coilDimensionDetails.forEach(each => {
            const individualItemDetail = [
                each.CoilLenght,
                each.CoilHeight,
                each.CoilDepth,
                each.FinsPerInch
            ];
            coilDimensionTableRows.push(individualItemDetail);
        });

        doc.autoTable(clientInformationColumns, clientInformationTableRows, { startY: 20 })
        doc.autoTable(itemDetailsColumns, itemPricingDetailsTableRows, { startY: 40 });
        doc.autoTable(coilDetailsColumns, coilDimensionTableRows, { startY: 100 })


        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        // doc.text(`Coil Length: ${10}`, 15, 15);
        // doc.text(`Coil Height: ${10}`, 100, 15);
        // doc.text(`Fins Per Inch: ${10}`, 15, 30);
        // doc.text(`Fin Size: ${10}`, 100, 30);
        // doc.text(`Total Cost: ${1564}`, 160, 120);
        // doc.text(`Profit: ${5}%`, 15, 120);
        // doc.text(`Overheads: ${5}%`, 50, 120);
        // doc.text(`Material Cost: ${1564}`, 100, 120);
        // doc.text(`Coil Length: ${10}`, 14, 15);
        // we define the name of our PDF file.
        // doc.save(`report_${isEmpty(clientInformation.ClientName) ? "" : clientInformation.ClientName}.pdf`)

        isEmpty(clientInformation.ClientName) ?
            alert("Client Name is empty") :
            doc.save(`report_${clientInformation.ClientName}.pdf`)

    };

    const createPdf = () => {
        generatePDF({
            clientInformation: clientInformation,
            itemDetails: {
                aluminiumweight: aluminiumweight,
                altotalCost: altotalCost,
                alprice: alprice,
                copperweight: copperweight,
                coppertotalCost: coppertotalCost,
                copperprice: copperprice,
                gisheetweight: gisheetweight,
                gisheettotalCost: gisheettotalCost,
                gisheetprice: gisheetprice,
                soldersweight: soldersweight,
                soldersprice: soldersprice,
                solderstotalCost: solderstotalCost,
                captubesprice: captubesprice,
                captubesquantity: captubesquantity,
                captubestotalCost: captubestotalCost,
                distrbtotalCost: distrbtotalCost,
                distrbquantity: distrbquantity,
                distrbsprice: distrbsprice,
                headerpipesquantity: headerpipesquantity,
                headerpipesprice: headerpipesprice,
                headerpipestotalCost: headerpipestotalCost,
            },
            coilDetails: {
                coilLength: props.coillength,
                coilHeight: props.coilheight,
                coilDepth: props.coildepth,
                finsPerInch: props.finsperinch,
                finsize: props.finsize
            }
        })
    }

    useImperativeHandle(ref, () => ({
        createPdfReport() {
            generatePDF()
        }
    }), [])

    // NOT ROUNDING OFF
    Number.prototype.toFixedNoRounding = function (n) {
        if (this === NaN) return
        const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
        const a = this.toString().match(reg)[0];
        const dot = a.indexOf(".");
        if (dot === -1) { // integer, insert decimal dot and pad up zeros
            return a + "." + "0".repeat(n);
        }
        const b = n - (a.length - dot) + 1;
        return b > 0 ? (a + "0".repeat(b)) : a;
    }



    // END --NOT ROUNDING OFF

    // aluminimun outputs (COST)
    const getaltotalCost = () => {
        let varcoildepth = props.coildepth * props.finsize;
        let tempvaluefins = (props.coillength * props.finsperinch);
        let fvalue = (props.coilheight * varcoildepth / 144 * althickness * 0.75 / 3 * tempvaluefins);
        fvalue = fvalue + (fvalue * 0.2);
        fvalue = fvalue.toFixedNoRounding(2);
        //fvalue = parseFloat(fvalue);
        setaluminiumweight(fvalue);
        props.updateAluminiumWeight(fvalue);
        fvalue = parseFloat(fvalue);
        fvalue = fvalue * alprice;
        setaltotalCost(Math.round(fvalue));
        props.updateItemDetails("altotalCost", Math.round(fvalue))
    }
    // copper outputs
    const getcoppertotalCost = () => {
        let vartemp = props.coillength;
        if (vartemp == "") vartemp = 0.00;
        let varcoillength = parseFloat(vartemp);

        if (guage == "0.058") {
            if (varcoillength <= 40) {
                varcoillength = varcoillength + 2.5;
            } else if (varcoillength > 40 && varcoillength <= 60) {
                varcoillength = varcoillength + 3;
            } else if (varcoillength > 61 && varcoillength <= 100) {
                varcoillength = varcoillength + 4;
            }
        }
        else {
            if (varcoillength <= 50) {
                varcoillength = varcoillength + 2;
            } else if (varcoillength > 50 && varcoillength <= 60) {
                varcoillength = varcoillength + 2.5;
            } else if (varcoillength > 61 && varcoillength <= 100) {
                varcoillength = varcoillength + 3.5;
            }
        }

        let tempCoilHeight = props.coilheight
        if (guage == "0.058")
            tempCoilHeight = tempCoilHeight / 1.25
        let fvalue = (varcoillength * tempCoilHeight * props.coildepth / 12 * guage);
        fvalue = fvalue + (fvalue * 0.05);
        fvalue = fvalue.toFixedNoRounding(2);
        setcopperweight(fvalue);
        props.updateCopperweight(fvalue)
        fvalue = parseFloat(fvalue);
        fvalue = fvalue * copperprice;
        //console.log(fvalue);
        setcoppertotalCost(Math.round(fvalue));
        props.updateItemDetails("coppertotalCost", Math.round(fvalue))
    }
    // gi sheet outputs
    const getgisheettotalcost = () => {
        let vartempd = props.coildepth;
        if (vartempd == "") vartempd = 0.00;
        let varcoildepth = parseFloat(vartempd);
        varcoildepth = varcoildepth * props.finsize + 4;

        let vartemp = props.coilheight;
        if (vartemp == "") vartemp = 0.00;
        let varcoilheight = parseFloat(vartemp);
        varcoilheight = varcoilheight + 2;

        let vartempl = props.coillength;
        if (vartempl == "") vartempl = 0.00;
        let varcoillength = parseFloat(vartempl);
        varcoillength = varcoillength + 2;

        let finalsheetcalc = 0;

        if (checkedchannel == true) {
            let fvaluefirst = (varcoildepth * varcoilheight / 144 * gisheetthickness) * 2;
            let fvaluetwosheet = (varcoildepth * varcoillength / 144 * gisheetthickness) * 2;
            finalsheetcalc = fvaluefirst + fvaluetwosheet;
        } else {
            finalsheetcalc = (varcoildepth * varcoilheight / 144 * gisheetthickness) * 2;
        }

        let fvalue = finalsheetcalc;
        fvalue = fvalue.toFixedNoRounding(2);
        setgisheetweight(fvalue);
        props.updateGisheetweight(fvalue)

        fvalue = parseFloat(fvalue);
        fvalue = fvalue * gisheetprice;
        setgisheettotalCost(Math.round(fvalue));
        props.updateItemDetails("gisheettotalCost", Math.round(fvalue));
    }

    // solders outputs
    const getsolderscost = () => {
        let vartemp = 0
        if (guage == "0.058")
            vartemp = ((props.coilheight) / 1.25) * props.coildepth / 6;
        else
            vartemp = props.coilheight * props.coildepth / 16;
        setsoldersweight(vartemp);
        props.updateSoldersweight(vartemp)
        vartemp = vartemp * soldersprice;
        setsolderstotalCost(Math.round(vartemp));
        props.updateItemDetails("solderstotalCost", Math.round(vartemp))
    }

    // capillary tubes
    const getcapillarytotalcost = () => {
        let vartemp = captubesquantity * captubesprice;
        setcaptubestotalCost(Math.round(vartemp));
        props.updateItemDetails("captubestotalCost", Math.round(vartemp))
    }

    // distributer
    const getdistrbtotalcost = () => {
        let vartemp = distrbquantity * distrbsprice;
        setdistrbtotalCost(Math.round(vartemp));
        props.updateItemDetails("distrbtotalCost", Math.round(vartemp))
    }

    // header pipes
    const getheaderpipestotalcost = () => {
        let vartemp = headerpipesquantity * headerpipesprice;
        setheaderpipestotalCost(Math.round(vartemp));
        props.updateItemDetails("headerpipestotalCost", Math.round(vartemp))
    }


    // material cost output
    const getmaterialtotalcost = () => {
        let varaltotalcost = (altotalCost + coppertotalCost + gisheettotalCost + solderstotalCost + captubestotalCost + distrbtotalCost + headerpipestotalCost);
        setMaterialCost(varaltotalcost);
        props.updatematerialtotalcost(varaltotalcost);
    }

    // SENSORS ....

    // aluminium output
    useEffect(() => {
        getaltotalCost();
    }, [props.coillength, props.coilheight, props.coildepth, props.finsperinch, althickness, alprice, props.finsize]);

    // copper output
    useEffect(() => {
        getcoppertotalCost();
    }, [props.coillength, props.coilheight, props.coildepth, guage, copperprice, props.finsize]);

    // gi sheet output
    useEffect(() => {
        getgisheettotalcost();
    }, [props.coilheight, props.coildepth, checkedchannel, gisheetthickness, gisheetprice, props.finsize]);

    // solders output
    useEffect(() => {
        getsolderscost();
    }, [props.coilheight, props.coildepth, soldersprice, guage]);

    // capillary
    useEffect(() => {
        getcapillarytotalcost();
    }, [captubesprice, captubesquantity]);

    // distributer
    useEffect(() => {
        getdistrbtotalcost();
    }, [distrbsprice, distrbquantity]);

    // header pipes
    useEffect(() => {
        getheaderpipestotalcost();
    }, [headerpipesprice, headerpipesquantity]);

    useEffect(() => {
        setClientInformation(props.clientInformation)
    }, [props.clientInformation])


    // material cost output
    useEffect(() => {
        getmaterialtotalcost();
    }, [altotalCost, coppertotalCost, gisheettotalCost, solderstotalCost, captubestotalCost, distrbtotalCost, headerpipestotalCost]);


    // otheerss..
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangecb = (event) => {
        setcheckedchannel(event.target.checked);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Aluminum" {...a11yProps(0)} />
                <Tab label="Copper" {...a11yProps(1)} />
                <Tab label="GI Sheet" {...a11yProps(2)} />
                <Tab label="Solders" {...a11yProps(3)} />
                <Tab label="Capilary Tube" {...a11yProps(4)} />
                <Tab label="Distributer" {...a11yProps(5)} />
                <Tab label="Header Pipe" {...a11yProps(6)} />
            </Tabs>
            {/* Aluminium */}
            <TabPanel value={value} index={0}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Coil Length :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <text className={classes.txtValue}>{props.coillength}</text>
                                    <text className={classes.txtValue}> inches</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Coil Height :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <text className={classes.txtValue}>{props.coilheight}</text>
                                    <text className={classes.txtValue}> inches</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Coil Rows :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <text className={classes.txtValue}>{props.coildepth}</text>
                                    <text className={classes.txtValue}> R</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Fins per Inch :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <text className={classes.txtValue}>{props.finsperinch} </text>
                                    <text className={classes.txtValue}> f/i</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Thickness* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="aluminiumthickness"
                                            value={althickness}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                            }}
                                            onChange={(event) => getalthickness(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Aluminum Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="aluminiumprice"
                                            value={alprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getalprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>Aluminum Weight : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(aluminiumweight).toLocaleString()} </h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>Aluminum Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(altotalCost).toLocaleString()} </h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>

            {/* Copper */}
            <TabPanel value={value} index={1}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Coil Length :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCopper} >
                                    <text className={classes.txtValue}>{props.coillength}</text>
                                    <text className={classes.txtValue}> inches</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Number of Pipes :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCopper} >
                                    <text className={classes.txtValue}>{
                                        guage == "0.058" ? ((props.coilheight) / 1.25 * props.coildepth)
                                            :
                                            props.coildepth * props.coilheight
                                    }</text>
                                    <text className={classes.txtValue}> pipes</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Guage* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCopper} >

                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={guage}
                                            onChange={handleguagechange}
                                        >
                                            <MenuItem value={0.030}>29g (3/8)</MenuItem>
                                            <MenuItem value={0.034}>27g (3/8)</MenuItem>
                                            <MenuItem value={0.044}>24g (3/8)</MenuItem>
                                            <MenuItem value={0.058}>24g (1/2)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Copper Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={copperprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getcopperprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>Copper Weight : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(copperweight).toLocaleString()} </h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>Copper Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(coppertotalCost).toLocaleString()} </h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </TabPanel>


            {/* Gi Sheets */}
            <TabPanel value={value} index={2}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Coil Height :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <text className={classes.txtValue}>{props.coilheight}</text>
                                    <text className={classes.txtValue}> inches</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Coil Rows :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <text className={classes.txtValue}>{props.coildepth}</text>
                                    <text className={classes.txtValue}> inches</text>
                                </Grid>
                            </Grid>

                            {/* channel  */}

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Channel :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Checkbox
                                        checked={checkedchannel}
                                        onChange={handleChangecb}
                                        className={classes.cbstyling}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                            </Grid>


                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Thickness* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="aluminiumthickness"
                                            value={gisheetthickness}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                            }}
                                            onChange={(event) => getgisheetthickness(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>GI Sheet Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="aluminiumprice"
                                            value={gisheetprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getgisheetprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>GI Sheet Weight : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(gisheetweight).toLocaleString()} </h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>GI Sheet Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(gisheettotalCost).toLocaleString()}</h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>





            {/* Solders */}
            <TabPanel value={value} index={3}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}>Number of Pipes :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCopper} >
                                    <text className={classes.txtValue}>{
                                        guage == "0.058" ? ((props.coilheight) / 1.25 * props.coildepth)
                                            :
                                            props.coildepth * props.coilheight
                                    }</text>
                                    <text className={classes.txtValue}> pipes</text>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={soldersprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getsoldersprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>Number of Solders : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(soldersweight).toLocaleString()}</h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>Solders Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(solderstotalCost).toLocaleString()} </h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </TabPanel>


            {/* Capilary tube */}
            <TabPanel value={value} index={4}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >


                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Quantity* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={captubesquantity}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"></InputAdornment>,
                                            }}
                                            onChange={(event) => getcaptubesquantity(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>



                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={captubesprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getcaptubesprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>Capilary Tubes : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(captubesquantity).toLocaleString()}</h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>Capilary Tubes Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(captubestotalCost).toLocaleString()} </h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </TabPanel>


            {/* Distributer */}
            <TabPanel value={value} index={5}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >


                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Quantity* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={distrbquantity}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"></InputAdornment>,
                                            }}
                                            onChange={(event) => getdistrbquantity(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>



                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={distrbsprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getdistrbsprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>Distributers : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(distrbquantity).toLocaleString()}</h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>Distributers Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(distrbtotalCost).toLocaleString()}</h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </TabPanel>


            {/* Header pipe */}
            <TabPanel value={value} index={6}>
                <Grid container className={classes.compform}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} className={classes.nicheleftdiv} >


                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Quantity* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={headerpipesquantity}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"></InputAdornment>,
                                            }}
                                            onChange={(event) => getheaderpipesquantity(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>



                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <text className={classes.txtclass}> Price* :  </text>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <Grid >
                                        <TextField
                                            type="number"
                                            fullwidth
                                            required
                                            size="small"
                                            id="copperprice"
                                            value={headerpipesprice}
                                            variant="outlined"
                                            placeholder="00"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">pkr</InputAdornment>,
                                            }}
                                            onChange={(event) => getheaderpipesprice(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid item xs={12} md={6} className={classes.nicherightdiv} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={6} className={classes.childtitlediv} >
                                    <h3>Header Pipes : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluediv} >
                                    <h2 className={classes.priceTxt}>{Number(headerpipesquantity).toLocaleString()}</h2>
                                </Grid>

                                <Grid item xs={12} md={6} className={classes.childtitledivCost} >
                                    <h3>Header Pipes Cost : </h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.childvaluedivCost} >
                                    <h2 className={classes.priceTxt}>{Number(headerpipestotalCost).toLocaleString()} </h2>
                                    <h4 className={classes.priceTxtValue}> (PKR) </h4>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </TabPanel>


        </div>
    );
}

export default forwardRef(VerticalTabs);
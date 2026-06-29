import jsPDF from "jspdf";
import "jspdf-autotable";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
var isEmpty = require('is-empty');


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function ShowAlert() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity="error">Client Information is empty</Alert>
        </div>
    );
}

const generatePDF = (props) => {

    const { clientInformation, itemDetails, coilDetails } = props
    const itemPricingDetails = [
        { Name: "Aluminium", Quantity: `${itemDetails.aluminiumweight}`, Price: `${itemDetails.alprice}`, Cost: `${itemDetails.altotalCost}` },
        { Name: "Copper", Quantity: `${itemDetails.copperweight}`, Price: `${itemDetails.copperprice}`, Cost: `${itemDetails.coppertotalCost}` },
        { Name: "GI Sheet", Quantity: `${itemDetails.gisheetweight}`, Price: `${itemDetails.gisheetprice}`, Cost: `${itemDetails.gisheettotalCost}` },
        { Name: "Solders", Quantity: `${itemDetails.soldersweight}`, Price: `${itemDetails.soldersprice}`, Cost: `${itemDetails.solderstotalCost}` },
        { Name: "Capillary Tubes", Quantity: `${itemDetails.captubesquantity}`, Price: `${itemDetails.captubesprice}`, Cost: `${itemDetails.captubestotalCost}` },
        { Name: "Distributors", Quantity: `${itemDetails.distrbquantity}`, Price: `${itemDetails.distrbsprice}`, Cost: `${itemDetails.distrbtotalCost}` },
        { Name: "Headers Pipes", Quantity: `${itemDetails.headerpipesquantity}`, Price: `${itemDetails.headerpipesprice}`, Cost: `${itemDetails.headerpipestotalCost}` },
    ]

    const clientInformationDetails = [
        { Name: `${isEmpty(clientInformation.ClientName) ? "" : clientInformation.ClientName}`, PhoneNumber: `${isEmpty(clientInformation.PhoneNo) ? "" : clientInformation.PhoneNo}`, Address: `${isEmpty(clientInformation.Address) ? "" : clientInformation.Address}` }
    ]

    const coilDimensionDetails = [
        { CoilLenght: `${coilDetails.coilLength}`, CoilHeight: `${coilDetails.coilHeight}`, CoilDepth: `${coilDetails.coilDepth}`, FinsPerInch: `${coilDetails.finsPerInch}` }
    ]
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const itemDetailsColumns = ["Item Name", "Quantity", "Price", "Cost"];
    const clientInformationColumns = ["Client Name", "Phone Number", "Address"];
    const coilDetailsColumns = ["Coil Lenght", "Coil Height", "Coil Rows", "Fins Per Inch"];

    const itemPricingDetailsTableRows = [];
    const clientInformationTableRows = [];
    const coilDimensionTableRows = []

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
    doc.autoTable(coilDetailsColumns, coilDimensionTableRows, { startY: 100 })

    doc.autoTable(itemDetailsColumns, itemPricingDetailsTableRows, { startY: 40 });

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

    // isEmpty(clientInformation.ClientName) ?
    //     alert("Client Name is empty") :
        doc.save(`report_${clientInformation.ClientName}.pdf`)

};

export default generatePDF;
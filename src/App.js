import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Cabletabs from './cableniche';
import Defaulthtml from './default';
import Totalsec from './totalsec';
import Header from './header';
import Footer from './footer';
import Clientinfo from './clientinfo';
import jsPDF from "jspdf";
import "jspdf-autotable";
var isEmpty = require('is-empty');


function App() {

  const [coillength, setCoillength] = useState(0);
  const [coilheight, setCoilheight] = useState(0);
  const [coildepth, setCoildepth] = useState(0);
  const [finsperinch, setfinsperinch] = useState(0);
  const [finsize, setfinsize] = useState(0.875);
  const [aluminiumWeight, setAluminiumWeight] = useState(0);
  const [copperweight, setCopperweight] = useState(0);
  const [gisheetweight, setGisheetweight] = useState(0);
  const [soldersweight, setSoldersweight] = useState(0);
  const [itemDetails, setItemDetails] = React.useState({
    alprice: 0,
    altotalCost: 0,
    coppertotalCost: 0,
    copperprice: 0,
    gisheettotalCost: 0,
    gisheetprice: 0,
    soldersprice: 0,
    solderstotalCost: 0,
    captubesprice: 0,
    captubesquantity: 0,
    captubestotalCost: 0,
    distrbtotalCost: 0,
    distrbquantity: 0,
    distrbsprice: 0,
    headerpipesquantity: 0,
    headerpipesprice: 0,
    headerpipestotalCost: 0,
  });

  const updateAluminiumWeight = (value) => {
    setAluminiumWeight(value)
  }

  const updateCopperweight = (value) => {
    setCopperweight(value)
  }
  const updateGisheetweight = (value) => {
    setGisheetweight(value)
  }

  const updateSoldersweight = (value) => {
    setSoldersweight(value)
  }
  // material cost
  const [materialcost, setmaterialcost] = useState(0);
  const [totalCost, settotalCost] = useState(0);
  const [overHead, setOverHead] = useState(0)
  const [profit, setProfit] = useState(0)
  // client info dialoge
  const childRef = useRef();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    ClientName: "",
    PhoneNo: "",
    Address: ""
  })

  const updateValues = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const updateItemDetails = (name, value) => {
    setItemDetails({
      ...itemDetails,
      [name]: value
    })
  }

  const updateCoillength = (lenParam) => {
    setCoillength(lenParam);
  }

  const updateCoilheight = (lenParam) => {
    setCoilheight(lenParam);
  }

  const updateCoildepth = (lenParam) => {
    setCoildepth(lenParam);
  }

  const updatefinsperinch = (lenParam) => {
    setfinsperinch(lenParam);
  }

  const updatefinsize = (lenParam) => {
    setfinsize(lenParam);
  }


  //  material cost
  const updatematerialtotalcost = (val) => {
    setmaterialcost(val);
  };

  //  total cost
  const updateTotalCost = (val) => {
    settotalCost(val);
  };

  // client info dialog
  const opendialogclientinfo = () => {
    setOpen(val => !val);
  }

  const createPdf = () => {
    generatePDF()
  }

  const generatePDF = () => {
    let itemPricingDetails = [
      { Name: "Aluminium", Quantity: `${aluminiumWeight}`, Price: `${itemDetails.alprice}`, Cost: `${itemDetails.altotalCost}` },
      { Name: "Copper", Quantity: `${copperweight}`, Price: `${itemDetails.copperprice}`, Cost: `${itemDetails.coppertotalCost}` },
      { Name: "GI Sheet", Quantity: `${gisheetweight}`, Price: `${itemDetails.gisheetprice}`, Cost: `${itemDetails.gisheettotalCost}` },
      { Name: "Solders", Quantity: `${soldersweight}`, Price: `${itemDetails.soldersprice}`, Cost: `${itemDetails.solderstotalCost}` },
      { Name: "Capillary Tubes", Quantity: `${itemDetails.captubesquantity}`, Price: `${itemDetails.captubesprice}`, Cost: `${itemDetails.captubestotalCost}` },
      { Name: "Distributors", Quantity: `${itemDetails.distrbquantity}`, Price: `${itemDetails.distrbsprice}`, Cost: `${itemDetails.distrbtotalCost}` },
      { Name: "Headers Pipes", Quantity: `${itemDetails.headerpipesquantity}`, Price: `${itemDetails.headerpipesprice}`, Cost: `${itemDetails.headerpipestotalCost}` },
    ]

    let clientInformationDetails = [
      { Name: `${isEmpty(data.ClientName) ? "" : data.ClientName}`, PhoneNumber: `${isEmpty(data.PhoneNo) ? "" : data.PhoneNo}`, Address: `${isEmpty(data.Address) ? "" : data.Address}` }
    ]

    let coilDimensionDetails = [
      { CoilLenght: `${coillength}`, CoilHeight: `${coilheight}`, CoilDepth: `${coildepth}`, FinsPerInch: `${finsperinch}` }
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
    doc.autoTable(coilDetailsColumns, coilDimensionTableRows, { startY: 40 })
    doc.autoTable(itemDetailsColumns, itemPricingDetailsTableRows, { startY: 60 });
    doc.autoTable(["Material Cost", "OverHead", "Profit", "Total Cost"], [[materialcost, overHead, profit, totalCost]],{ startY: 130 })


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

    isEmpty(data.ClientName) ?
      alert("Client Name is empty") :
      doc.save(`report_${data.ClientName}.pdf`)

  };


  return (

    <React.Fragment>
      <Header createPdf={createPdf} opendialogclientinfo={opendialogclientinfo} /> <br></br> <br></br> <br></br>
      <Clientinfo opendialogclientinfo={opendialogclientinfo} open={open} updateValues={updateValues} data={data} />
      <Defaulthtml updateCoillength={updateCoillength} updateCoilheight={updateCoilheight} updateCoildepth={updateCoildepth} updatefinsperinch={updatefinsperinch} updatefinsize={updatefinsize} />
      <Cabletabs updateGisheetweight={updateGisheetweight} updateSoldersweight={updateSoldersweight} updateCopperweight={updateCopperweight} updateAluminiumWeight={updateAluminiumWeight} updateItemDetails={updateItemDetails} totalCost={totalCost} ref={childRef} clientInformation={data} coillength={coillength} coilheight={coilheight} coildepth={coildepth} finsperinch={finsperinch} updatematerialtotalcost={updatematerialtotalcost} finsize={finsize} />
      <Totalsec updateOverHead={(value) => { setOverHead(value) }} updateProfit={(value) => { setProfit(value) }} updateTotalCost={updateTotalCost} materialcost={materialcost} />
      {/* <Footer /> */}
    </React.Fragment>

  );
}

export default App;

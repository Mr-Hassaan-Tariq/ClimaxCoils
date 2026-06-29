import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function EditConfiguration(props) {



    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const updateopenstate = () => {
        props.opendialogclientinfo();
    }

    return (
        <div>

            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                //  onClose={() => props.changeDialogState({}, false, "edit")}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" >
                    <Grid container>
                        <Grid item xs={12} sm={12} md={10} lg={10} lg={10}>
                            Client Information
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} lg={2} lg={2} container direction="row" justify="flex-end" >
                            <IconButton onClick={(e) => updateopenstate()} aria-label="delete" size="small">
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent style={{ overflow: "hidden" }}>
                    <DialogContentText>
                        <TextField
                            required={true}
                            id="clientname"
                            label="Client Name"
                            placeholder="Name"
                            margin="normal"
                            variant="outlined"
                            name="ClientName"
                            value={props.data.ClientName}
                            onChange={(event) => props.updateValues(event)}
                            fullWidth
                            autoFocus />

                        <TextField
                            required={true}
                            label="Phone No."
                            placeholder="Phone No."
                            margin="normal"
                            variant="outlined"
                            name="PhoneNo"
                            value={props.data.PhoneNo}
                            onChange={(event) => props.updateValues(event)}
                            fullWidth
                        />

                        <TextField
                            required={false}
                            id="Description"
                            label="Address"
                            placeholder="Address"
                            margin="normal"
                            variant="outlined"
                            name="Address"
                            value={props.data.Address}
                            onChange={(event) => props.updateValues(event)}
                            fullWidth
                        />

                        <div
                            style={{
                                textAlign: 'right',
                                padding: 8,
                                margin: '24px -24px -24px -24px',
                            }}
                        >

                            <Button type="submit" color="primary" onClick={(e) => updateopenstate()}>
                                Save
                            </Button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default EditConfiguration;
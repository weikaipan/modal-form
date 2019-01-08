// Instrument cubes on the page.
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import InstrumentCard from './InstrumentCard';
import MaterialUiForm from './MaterialUiForm';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  }, 
  icon: {
    margin: theme.spacing.unit * 2,
    color: '#01BC9E'
  },
  demo: {
    height: 240,
  },
  paper: {
   height: 140,
   width: 100,
   margin: '10px',
   backgroundColor: '#2837BD',
  },
  button: {
    color: '#7CEECE',
    height: '100%',
    width: '100%',
  },
  addPaper: {
    backgroundColor: '#A4FFF0',
    margin: '10px',
    opacity: '0.5',
    height: 140,
    width: 100
  },
  modalSave: {
    backgroundColor: '#01BC9E',
    color: 'white',
    fontFamily: 'Helvetica',
  },
  modalCancel: {
    color: '#01BC9E',
    fontFamily: 'Helvetica',
  },
  dialogTitle: {
    fontFamily: 'Helvetica',
    fontSize: '3px',
  }
});

const DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500],
    },
  }))(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles(theme => ({
    root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
      backgroundColor: '#F5F3F3',
    },
}))(MuiDialogActions);

// The call back after form is submitted.
// Can be connected to server APIs.
const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 0)
    // Make API calls (send form json)
    // const options = {
    //   uri: 'some url',
    //   method: 'POST',
    //   json: values,
    // };
    
    // request(options, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //      reject();
    //   } else {
    //      resolve();
    //   }
    // });
  })

class Instruments extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        modalIsOpen: false,
        instruments: [0, 0],
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }
  
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { classes } = this.props;
    return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
            <Grid container 
                  className={classes.demo} 
                  justify='flex-start' 
                  alignItems='center'
                  direction='row'
                  spacing={Number('16')}>
                {this.state.instruments.map(value => (
                <Grid key={value} item={3}>
                    <Paper className={classes.paper}>
                        <InstrumentCard className={classes.paper}/>
                    </Paper>
                </Grid>
                ))}
                <Grid item={3}>
                    <Paper className={classes.addPaper}>
                    <Button onClick={this.openModal} className={classes.button}>
                        <Icon className={classes.icon} fontSize="large">
                            add
                        </Icon>
                    </Button>
                    </Paper>
                </Grid>
            </Grid>
            </Grid>

            <Dialog
                onClose={this.closeModal}
                aria-labelledby="customized-dialog-title"
                open={this.state.modalIsOpen}
                fullWidth={true}
                maxWidth = {'sm'}
            >
            <DialogTitle
                id="customized-dialog-title"
                onClose={this.closeModal}
            >Add an Instrument
            </DialogTitle>
            <DialogContent>
                <MaterialUiForm onSubmit={event => {{showResults(event).then( () => {
                    this.closeModal()
                })}}} />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeModal} className={classes.modalCancel} >
                    Cancel
                </Button>
                <Button form="modal-form" type="submit" className={classes.modalSave} >
                    Save
                </Button>
            </DialogActions>
            </Dialog>
        </Grid>
        
    );
  }
}

Instruments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Instruments);

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import InstrumentCard from './InstrumentCard';
import NewInstrumentForm from './NewInstrumentForm';
import Modal from 'react-modal';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

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
  },
  demo: {
    height: 240,
  },
  paper: {
   height: 140,
   width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    color: '#7CEECE',
    height: '100%',
    width: '100%',
  },
  addPaper: {
    backgroundColor: '#7CEECE',
    opacity: '0.5',
    height: 140,
    width: 100
  },
  modalSave: {
    backgroundColor: '#7CEECE',
    color: 'white',
  },
  modalCancel: {
    color: '#7CEECE',
  },
  grow: {
    flexGrow: 1,
  },
  topToolBar: {
    borderBottom: '1px solid',
  },
  bottomToolBar: {
    float: 'right',
    backgroundColor: '#F5F5F5',
  },
  cardCollection: {
    float: 'left',
  }
});

class InteractiveGrid extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        modalIsOpen: false,
        direction: 'row',
        justify: 'flex-start',
        alignItems: 'center',
        spacing: '16',
        instruments: [0, 0],
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }
  
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

//   addInstrument = () => {
//       console.log("Hello");
//     this.setState( { instruments: this.state.instruments.push(0),
//                      modalIsOpen: false
//                    } );
//   }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify, spacing } = this.state;

    return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
            <Grid container 
                  className={classes.demo} 
                  justify={justify} 
                  alignItems={alignItems}
                  direction={direction}
                  spacing={Number(spacing)}>
                {[0, 0].map(value => (
                <Grid key={value} item={3}>
                    <Paper className={classes.paper}>
                        <InstrumentCard />
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

            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Toolbar className={classes.topToolBar}>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Add an Instrument
                    </Typography>
                    <Button onClick={this.closeModal} >
                        <Icon className={classes.icon} fontSize="large">
                        close
                        </Icon>
                    </Button>
                </Toolbar>
                <NewInstrumentForm />
                <Toolbar className={classes.bottomToolBar}>
                    <Button onClick={this.closeModal} className={classes.modalCancel} >Cancel</Button>
                    <Button variant="outlined" type="submit" className={classes.modalSave} >Save</Button>
                </Toolbar>
            </Modal>
        </Grid>
        
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);

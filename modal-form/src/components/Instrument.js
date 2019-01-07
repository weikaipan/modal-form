import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import InstrumentCard from './InstrumentCard';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from 'react-modal';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';


const validate = username => !username || username.trim() === '' ? 'Username is a required field' : null

const asyncValidate = username => new Promise((resolve, reject) =>
    setTimeout(() => {
        // Simulate username check
        if (['joe', 'tanner', 'billy', 'bob'].includes(username)) {
            resolve({ error: 'That username is taken', success: null })
        }
        // Simulate request faulure
        if (username === 'reject') {
            reject('Failure while making call to validate username does not exist')
        }
        // Sumulate username success check
        resolve({
            success: 'Awesome! your username is good to go!'
        })
    }, 2000)
)

const currencies = [
    // {
    //   value: 'USD',
    //   label: '$',
    // },
    // {
    //   value: 'EUR',
    //   label: '€',
    // },
    // {
    //   value: 'BTC',
    //   label: '฿',
    // },
    // {
    //   value: 'JPY',
    //   label: '¥',
    // },
];

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
   width: 100
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
    flexGrow: 1,
  },
  modalCancel: {
    color: '#7CEECE',
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  bottomToolBar: {
    backgroundColor: 'grey',
  },
});

class InteractiveGrid extends React.Component {
  constructor (props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
        modalIsOpen: false,
        direction: 'row',
        justify: 'center',
        alignItems: 'center',
        spacing: '16',
    };
  }
    
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify, spacing } = this.state;

    return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
            <Grid container 
                  className={classes.demo} 
                  justify="center" 
                  alignItems="center" 
                  direction="row"
                  spacing={Number(spacing)}>
                {[0, 1].map(value => (
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
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Add an Instrument
                        </Typography>
                        <Button onClick={this.closeModal} >
                            <Icon className={classes.icon} fontSize="large">
                            close
                            </Icon>
                        </Button>
                    </Toolbar>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="outlined-name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                // onChange={this.handleChange('name')}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Type"
                                className={classes.textField}
                                value={this.state.currency}
                                // onChange={this.handleChange('currency')}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                    className: classes.menu,
                                    },
                                }}
                                placeholder="Type"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            >   
                            {currencies.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                            ))}
                            </TextField>
                            <TextField
                                id="outlined-type"
                                label="Description"
                                className={classes.textField}
                                value={this.state.type}
                                // onChange={this.handleChange('name')}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                helperText="Up to 300 Characters"
                            />
                            <TextField
                                id="outlined-cost"
                                label="$ Cost"
                                className={classes.textField}
                                value={this.state.cost}
                                // onChange={this.handleChange('name')}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </form>
                        <Toolbar className={classes.bottomToolBar}>
                            <Button onClick={this.closeModal} className={classes.modalCancel} >Cancel</Button>
                            <Button variant="outlined" type="submit" className={classes.modalSave} >Save</Button>
                        </Toolbar>
                    </Modal>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);

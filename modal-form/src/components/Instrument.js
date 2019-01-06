import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';

import { withStyles } from '@material-ui/core/styles';
import { Form, Text, Select } from 'react-form';

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

const statusOptions = [
    {
      label: 'Single',
      value: 'single',
    },
    {
      label: 'In a Relationship',
      value: 'relationship',
    },
    {
      label: "It's Complicated",
      value: 'complicated',
    },
]


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    color: 'red',
    opacity: '0.5',
  },
});

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

class InteractiveGrid extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      direction: 'row',
        justify: 'center',
        alignItems: 'center',
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
            <Paper>
                <FormLabel>Instruments</FormLabel>
                <Grid
                    container
                    spacing={16}
                    className={classes.demo}
                    alignItems={alignItems}
                    direction={direction}
                    justify={justify}
                >
                <Grid item>
                    <Button variant="contained" color="primary">
                    </Button>
                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary">
                    </Button>
                </Grid>

                <Grid item>
                    <Button onClick={this.openModal} variant="contained" className={classes.button}>
                    +
                    </Button>
                    <div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            >
                            <h2 ref={subtitle => this.subtitle = subtitle}>Add an Instrument</h2>
                            <button onClick={this.closeModal}>close</button>
                        <Form >
                            {formApi => (
                            <form onSubmit={formApi.submitForm} id="form6">
                                <Text
                                    field="username" id="username"
                                    validate={validate} asyncValidate={asyncValidate} placeholder={"Name"}
                                />
                                <Select field="status" id="select-input-status" options={statusOptions} className="mb-4" />
                                <Text
                                    field="description" id="description"
                                    validate={validate} asyncValidate={asyncValidate} placeholder={"Description"}
                                />
                                <Text
                                    field="cost" id="cost"
                                    validate={validate} asyncValidate={asyncValidate} placeholder={"Cost"}
                                />
                                <Button type="submit" variant="contained" className={classes.button}>
                                Cancel
                                </Button>
                                <Button onClick={this.closeModal} variant="contained" className={classes.button}>
                                Save
                                </Button>
                            </form>
                            )}
                        </Form>
                        </Modal>
                    </div>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);

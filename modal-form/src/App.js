import React, { Component } from 'react';
import './App.css';
import Instruments from './components/Instruments';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  }
});

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
      <Grid
        container
        direction="col"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={10}>
        <Card>
          <CardHeader title="Instruments" style={{ textAlign: 'left', fontFamily: 'Helvetica' }}/>
          <Instruments />
        </Card>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);

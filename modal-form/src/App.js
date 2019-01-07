import React, { Component } from 'react';
import './App.css';
import InteractiveGrid from './components/Instrument';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
      justifyContent: 'center'
  }
});

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Card classes={classes.root}>
          <CardHeader title="Instruments" style={{ textAlign: 'left' }}/>
          <InteractiveGrid />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(App);

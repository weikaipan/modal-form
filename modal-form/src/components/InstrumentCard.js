import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  root: {
    backgroundColor: 'blue',
  }
});

class InstrumentCard extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.root} >
          {/* Could be some links to the instruments modal or img. */}
        </div>
      </Card>
    );
  }
}

InstrumentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstrumentCard);

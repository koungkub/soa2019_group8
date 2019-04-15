import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {withStyles, Button, NoSsr} from '@material-ui/core';

const styles = theme => ({
  paymentBtn:{
    fontSize: '2.9375rem',
    background: 'green'
  }
});

class PaymentButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
        <Button variant="contained" 
              size="large"
              fontSize="large"
              className={classes.paymentBtn}>
                    PAYMENT
              </Button>
    </NoSsr>
          </Fragment>
    );
  }
}
PaymentButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (PaymentButton);
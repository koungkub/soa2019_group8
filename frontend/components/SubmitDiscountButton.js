import React, { Component, Fragment } from 'react';
import Router from 'next/router'
import PropTypes from 'prop-types';
import {withStyles, Button, NoSsr} from '@material-ui/core';


const styles = theme => ({
  paymentBtn:{
    fontSize: '2.9375rem',
    width: 300
  }
});

class SubmitDiscountButton extends Component {
    
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
        <Button variant="contained" color="default"
              size="large"
              fontSize="large"
              className={classes.paymentBtn}
              onClick={activeback}>
                    Submit
              </Button>
    </NoSsr>
          </Fragment>
    );
  }
}
SubmitDiscountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (SubmitDiscountButton);
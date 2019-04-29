import React, { Component, Fragment } from 'react';
import Router from 'next/router'
import PropTypes from 'prop-types';
import {withStyles, Button, NoSsr} from '@material-ui/core';


const styles = theme => ({
  greenBtn:{
    fontSize: '2.9375rem',
    width: 300,
    background: 'green',
  }
});
function checkDiscountCode(e) {
    e.preventDefault();
    Router.back();
  }

class SubmitDiscountButton extends Component {
    
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
        <Button variant="contained" color="default"
              size="large"
              fontSize="large"
              className={classes.greenBtn}
              onClick={checkDiscountCode}
              >
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
import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {withStyles, Button, NoSsr, colors} from '@material-ui/core';

const styles = theme => ({
  CantScanBtn:{
    fontSize: '2.9375rem',
    background: colors.red[900],
    width: '100%'
  }
});

class CantScanButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
        <Link href="/scanlegacy">
        <Button variant="contained" 
              size="large"
              fontSize="large"
              color="secondary"
              className={classes.CantScanBtn}>
                    Can't scan, Click
              </Button>
              </Link>
    </NoSsr>
          </Fragment>
    );
  }
}
CantScanButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (CantScanButton);
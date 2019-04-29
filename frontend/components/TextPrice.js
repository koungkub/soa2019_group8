import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {withStyles, NoSsr} from '@material-ui/core';

const styles = theme => ({
    root:{
        fontSize: '5rem',
        textAlign: 'center'
    }
});

class TextPrice extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NoSsr>
      <p className={classes.root}>0 Bath</p>
    </NoSsr>
          </Fragment>
    );
  }
}
TextPrice.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (TextPrice);
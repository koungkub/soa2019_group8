import React, { Component, Fragment } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import {Button, Grid, withStyles, NoSsr} from '@material-ui/core';
//components
import Layout from '../components/Layout';
import Camera from '../components/Camera';

const styles = theme => ({
  container:{
    maxWidth: '720px',
    margin: 'auto'
  },
  codeBtn:{
    width:"100%",
    fontSize: '2.9375rem'
  }
})
class Scan extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Layout/>
        <NoSsr>
          <Grid container className={classes.container} >
            <Grid item xs={12}>
            <Camera></Camera>
            </Grid>
            <div className="m-4"></div>
          <Grid item xs={12}>
            <Link href="/scan">
            </Link>
            </Grid>
             </Grid>
          </NoSsr>
        </Fragment>
    );
  }
}
Scan.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles) (Scan);